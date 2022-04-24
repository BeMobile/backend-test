const { Sell } = require('../model/sell.model');

const UserService = require('../service/user.service');
const BookService = require('../service/book.service');
const SellService = require('../service/sell.service');

const log       = require('../logger/index');
const sequelize = require('../db/sequelize');

class SellController{
  async index(_, res){
    const sellResult = await Sell.findAll({
      order: [[ 'id', 'ASC' ]],
      raw: true
    });

    return res.status(200).json({
      status: true,
      total:  sellResult.length,
      result: sellResult
    });
  }

  async create(req, res){
    let { userID, bookID, quantity } = req.body;

    let transaction = await sequelize.transaction();
    
    try{
      await SellService.sellValidation({
        userID, bookID, quantity
      });

      const bookResult = await BookService.verifyIfBookAlreadyExistsByID(bookID);
      if(!bookResult) return res.status(404).json({ status: false, message: 'Book doesn\t exists' });

      const userResult = await UserService.verifyIfUserAlreadyExistsByID(userID);
      if(!userResult) return res.status(404).json({ status: false, message: 'User doesn\t exists' });
      userResult.password = undefined;

      const unit_price  = bookResult.price;
      const total_price = unit_price * quantity;
      
      let sellCreateResult = await Sell.create({
        quantity, unit_price, total_price,
        fk_user: userID, fk_book: bookID
      }, { transaction });

      sellCreateResult.fk_user = undefined;
      sellCreateResult.fk_book = undefined;

      await transaction.commit();

      log.info(`Sell creation, ID: ${ sellCreateResult.id }`);

      return res.status(201).json({ status: true, result: {
        sell:    sellCreateResult,
        product: bookResult,
        user:    userResult
      }});
    }catch(err){
      await transaction.rollback();

      log.error(`Sell creation failed`);

      return res.status(500).json({ status: false, message: err.message });
    }
  }
}

module.exports = new SellController;
