import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';
import ValidateCpf from '../services/validate_cpf';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().min(6).required(),
      cpf: Yup.string().length(11).required(),
      phone: Yup.string().required(),
      email: Yup.string().email().required(),
    });
    try {
      await schema.validate(req.body);
    } catch (err) {
      return res
        .status(422)
        .json({ error: `Validation fails: ${err.message}` });
    }
    if (!ValidateCpf(req.body.cpf))
      return res.status(422).json({ error: `Validation fails: Invalid cpf` });
    try {
      const userExists = await User.findOne({
        where: {
          [Op.or]: [{ email: req.body.email }, { cpf: req.body.cpf }],
        },
      });
      if (userExists) {
        return res.status(422).json({ error: 'User already exists.' });
      }

      const { id, name, email, created_at } = await User.create(req.body);

      return res.status(201).json({
        id,
        name,
        email,
        created_at,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }
}

export default new UserController();
