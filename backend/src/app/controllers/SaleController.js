import * as Yup from 'yup';
import { addDays } from 'date-fns';
import Gerencianet from 'gn-api-sdk-node';
import Sale from '../models/Sale';
import Product from '../models/Product';
import User from '../models/User';
import gnOptions from '../../config/gerencianet';

class SaleController {
  async store(req, res) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            amount: Yup.number().required(),
          })
        )
        .required(),
    });
    try {
      await schema.validate(req.body);
    } catch (err) {
      return res
        .status(422)
        .json({ error: `Validation fails: ${err.message}` });
    }

    const user = await User.findByPk(req.userId);

    // Criando um array com o id de todos os produtos comprados
    // um produto com amount=2 tem que ser adicionado 2x no array
    const products_ids = req.body.products.map((item) => item.id);

    // Recuperando produtos no banco
    const products_db = await Product.findAll({
      where: { id: products_ids },
    });

    if (products_db.length !== products_ids.length)
      return res.status(422).json({ error: `Invalid products` });

    // Formatando produtos para gerar o boleto
    const billet_products = req.body.products.map((item, index) => ({
      amount: item.amount,
      value: products_db[index].price,
      name: products_db[index].name,
    }));

    const boleto_body = {
      payment: {
        banking_billet: {
          expire_at: addDays(new Date(), 2).toISOString().split('T')[0],
          customer: {
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            phone_number: user.phone,
          },
        },
      },
      items: billet_products,
    };
    const gerencianet = new Gerencianet(gnOptions);
    try {
      // Gerando o boleto
      const response = await gerencianet.oneStep([], boleto_body);

      if (response.code !== 200)
        return res.status(500).json({ error: 'Error in billet generation' });

      const sale = await Sale.create({
        boleto_url: response.data.pdf.charge,
        boleto_id: response.data.charge_id,
        user: req.userId,
      });

      billet_products.forEach(async (item, index) => {
        await sale.addProducts(products_db[index], {
          through: { amount: item.amount, product_price: item.value },
        });
      });
      return res.status(200).json({ sale });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async index(req, res) {
    if (!req.isAdmin) return res.status(402).json({ error: 'Unauhtorized' });

    const sales = await Sale.findAll({
      attributes: ['id', 'vencido'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: Product,
          as: 'products',
        },
      ],
    });
    const formatedSales = sales.map((item) => {
      let aux = 0;
      item.products.forEach((product) => {
        aux += product.ProductSold.product_price * product.ProductSold.amount;
      });
      return {
        name: item.name,
        id: item.id,
        user: item.user ? item.user.name : 'Anonimo',
        vencido: item.vencido ? 'SIM' : 'NÃO',
        price: aux,
      };
    });
    return res.status(200).json(formatedSales);
  }

  async index_user(req, res) {
    const sales = await Sale.findAll({
      attributes: ['id', 'vencido', 'boleto_url'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: Product,
          as: 'products',
        },
      ],
    });
    const formatedSales = sales.map((item) => {
      let aux = 0;
      item.products.forEach((product) => {
        aux += product.ProductSold.product_price * product.ProductSold.amount;
      });
      return {
        name: item.name,
        id: item.id,
        user: item.user ? item.user.name : 'Anonimo',
        vencido: item.vencido ? 'SIM' : 'NÃO',
        boleto_url: item.boleto_url,
        price: aux,
      };
    });
    return res.status(200).json(formatedSales);
  }
}

export default new SaleController();
