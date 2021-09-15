import Products from '../models/Products';

class ProductsController {
  async store(req, res) {
    try {
      const { name } = req.body;
      const verify = await Products.findAll({ where: { name } });
      if (verify.length > 0) {
        res.status(400).json({
          message: ['This product already exists in database'],
        });
      }
      const newProduct = await Products.create(req.body);
      const {
        id, price, description,
      } = newProduct;
      res.json({
        id, name, price, description,
      });
    } catch (e) {
      res.status(400).json({ message: `Failed to add new product. Error: ${e}` });
    }
  }

  async index(req, res) {
    try {
      const products = await Products.findAll({
        order: [['name', 'ASC']],
      });
      return res.json(products);
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
      const user = await Products.findByPk(id);
      if (!user) {
        return res.status(400).json({
          message: ['Product does not exists'],
        });
      }
      await Products.destroy({ where: { id } });
      return res.json('Product has been deleted succesfully');
    } catch (e) {
      return res.status(400).json({
        message: [`Error: ${e}`],
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const product = await Products.findByPk(id);

      if (!product) {
        return res.status(400).json({
          errors: ['This product does not exists'],
        });
      }
      await Products.update(req.body, { where: { id } });
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
      const product = await Products.findByPk(id);
      if (!product) {
        return res.status(400).json({
          message: ['This product doesnt exists'],
        });
      }
      return res.json(product);
    } catch (e) {
      return res.status(400).json({
        message: [`Error: ${e}`],
      });
    }
  }
}

export default new ProductsController();
