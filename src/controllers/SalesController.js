import Sales from '../models/Sales';

class SalesController {
  async store(req, res) {
    try {
      const newSale = await Sales.create(req.body);
      const {
        client_id, product, amount, price, day,
      } = newSale;
      res.json({
        client_id, product, amount, price, day,
      });
    } catch (e) {
      res.status(400).json({ message: `Failed to create new client. Error: ${e}` });
    }
  }
}

export default new SalesController();
