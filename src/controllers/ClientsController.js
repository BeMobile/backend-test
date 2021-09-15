import Clients from '../models/Clients';
import Sales from '../models/Sales';

class ClientsController {
  async store(req, res) {
    try {
      const { cpf } = req.body;
      const verify = await Clients.findAll({ where: { cpf } });
      if (verify.length > 0) {
        res.status(400).json({
          message: ['Client already exists'],
        });
      }
      const newClient = await Clients.create(req.body);
      const {
        id, name, address, phone,
      } = newClient;
      res.json({
        id, name, cpf, address, phone,
      });
    } catch (e) {
      res.status(400).json({ message: `Failed to create new client. Error: ${e}` });
    }
  }

  async index(req, res) {
    try {
      const clients = await Clients.findAll({
        attributes: ['id', 'name', 'cpf', 'address', 'phone'],
        order: [['id', 'DESC'], [Sales, 'id', 'DESC']],
        include: {
          model: Sales,
          attributes: ['product', 'amount', 'price', 'day'],

        },
      });
      return res.json(clients);
    } catch (e) {
      return res.json({
        message: [`error: ${e}`],
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Provide one ID'],
        });
      }
      const user = await Clients.findByPk(id);
      if (!user) {
        return res.status(400).json({
          message: ['Client dont exists'],
        });
      }
      await Clients.destroy({ where: { id } });
      return res.json('Client has been deleted succesfully');
    } catch (e) {
      return res.status(400).json({
        message: [`Error: ${e}`],
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const client = await Clients.findByPk(id);

      if (!client) {
        return res.status(400).json({
          errors: ['This client dont exists'],
        });
      }
      await Clients.update(req.body, { where: { id } });
      return res.json({ message: 'Updated Successfully' });
    } catch (e) {
      return res.status(400).json({
        message: [`Error: ${e}`],
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Provide one ID'],
        });
      }
      const client = await Clients.findByPk(id, {
        attributes: ['id', 'name', 'cpf', 'address', 'phone'],
        order: [['id', 'DESC'], [Sales, 'id', 'DESC']],
        include: {
          model: Sales,
          attributes: ['product', 'amount', 'price', 'day'],
        },
      });
      if (!client) {
        return res.status(400).json({
          message: ['This client doesnt exists'],
        });
      }
      return res.json(client);
    } catch (e) {
      return res.status(400).json({
        message: [`Error: ${e}`],
      });
    }
  }
}

export default new ClientsController();
