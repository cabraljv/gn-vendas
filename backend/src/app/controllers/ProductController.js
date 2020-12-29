import * as Yup from 'yup';
import User from '../models/User';
import Product from '../models/Product';
import Category from '../models/Category';
import Sale from '../models/Sale';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      category_id: Yup.number().required(),
      price: Yup.number().required(),
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res
        .status(422)
        .json({ error: `Validation fails: ${err.message}` });
    }
    const user = await User.findByPk(req.userId);
    if (!user.is_admin)
      return res.status(401).json({ error: `User as not a admin` });

    try {
      await Product.create({
        ...req.body,
        img_path: `${process.env.BASE_FILE_URL}/${req.file.filename}`,
      });
      return res.status(201).json({
        response: 'Product successfull created',
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }

  async index(req, res) {
    const price = req.query.price || 'ascending';
    const date = req.query.date || 'ascending';
    const categories = req.query.categories ? `${req.query.categories}` : null;
    const products = await Product.findAll({
      attributes: ['name', 'id', 'price', 'img_path', 'description'],
      order: [
        ['price', price === 'ascending' ? 'ASC' : 'DESC'],
        ['updated_at', date === 'ascending' ? 'ASC' : 'DESC'],
      ],
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
          as: 'category',
        },
      ],
    });
    if (categories) {
      const cat = categories.split(',');
      const new_products = products.filter((item) =>
        cat.includes(`${item.category.id}`)
      );
      return res.status(200).json(new_products);
    }
    return res.status(200).json(products);
  }

  async admin_index(req, res) {
    if (!req.isAdmin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const products = await Product.findAll({
      attributes: ['name', 'id', 'price', 'img_path', 'description'],

      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
          as: 'category',
        },
      ],
    });

    return res.status(200).json(products);
  }

  async show(req, res) {
    // Validando dados
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });
    try {
      await schema.validate(req.params);
    } catch (err) {
      return res
        .status(422)
        .json({ error: `Validation fails: ${err.message}` });
    }

    const product = await Product.findByPk(req.params.id, {
      attributes: [
        'name',
        'description',
        'price',
        'id',
        'img_path',
        'created_at',
      ],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name', 'id'],
        },
        {
          model: Sale,
          as: 'sales',
        },
      ],
    });
    let sale_amount = 0;
    product.sales.forEach((sale) => {
      sale_amount += sale.ProductSold.amount;
    });

    const compresed_product = {
      name: product.name,
      description: product.description,
      price: product.price,
      id: product.id,
      img_path: product.img_path,
      created_at: product.created_at,
      category: product.category,
      sale_amount,
    };

    return res.status(200).json(compresed_product);
  }
}

export default new ProductController();
