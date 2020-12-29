import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User';

class CategoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
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
      await Category.create(req.body);
      return res.status(201).json({
        response: 'Category successfull created',
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }

  async index(req, res) {
    const categories = await Category.findAll({ attributes: ['name', 'id'] });
    return res.status(200).json(categories);
  }
}

export default new CategoryController();
