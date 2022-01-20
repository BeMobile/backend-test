const sequelize = require("sequelize");
// import modelos
const PhoneModel = require("../models/phone.model");
const ProductModel = require("../models/product.model");
const SaleModel = require("../models/sale.model");
const ClientModel = require("../models/client.model");
const AddressModel = require("../models/address.model");

const isCpfFormatInvalid = require("../utils/cpf.utils");
const isDateFormatInvalid = require("../utils/date.utils");
const isPhoneFormatInvalid = require("../utils/phone.utils");

exports.create = async (req, res) => {
  try {
    const {
      name,
      cpf,
      birthday,
      phone,
      street,
      number,
      complement,
      zipCode,
      city,
      state,
    } = req.body;

    if (isPhoneFormatInvalid(phone) === true) {
      return res.status(400).json({
        msg: "Invalid phone format! ex: (11) 12345-1234 / (11) 1234-1234",
      });
    }

    if (isDateFormatInvalid(birthday) === true) {
      return res.status(400).json({
        msg: "Invalid byrthday format! ex: dd-mm-yyyy",
      });
    }

    if (isCpfFormatInvalid(cpf) === true) {
      return res.status(400).json({
        msg: "Invalid cpf format! ex: 000.000.000-00",
      });
    }

    const user = await ClientModel.findOne({ where: { cpf: cpf } });
    // verifica se cpf já foi cadastrado
    if (user) {
      return res
        .status(400)
        .json({ msg: "This cpf is already registered on the list client!" });
    }

    const resultClient = await ClientModel.create({
      name: name,
      cpf: cpf,
      birthday: birthday,
    });

    //
    const resultphone = await PhoneModel.create({
      phone: phone,
      clientId: resultClient.id,
    });

    const resultAddres = await AddressModel.create({
      street: street,
      number: number,
      complement: complement,
      zipCode: zipCode,
      city: city,
      state: state,
      clientId: resultClient.id,
    });

    return res.status(201).json({
      msg: "Client registered successfully!",
      client: resultClient,
    });
  } catch (err) {
    console.log(err);
    const msg = err.errors[0].message;
    const path = err.errors[0].path;
    return res.status(400).send({
      msg,
      path,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const clients = await ClientModel.findAll({
      attributes: ["id", "name", "cpf"],
      order: [["id", "ASC"]],
    });
    return res.status(200).json(clients);
  } catch {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
};

exports.findById = async (req, res) => {
  try {
    const { month, year } = req.body;
    let client = await ClientModel.findOne({
      where: {
        id: req.params.id,
      },
      order: [[SaleModel, "dateOfSale", "DESC"]],
      attributes: ["id", "name", "birthday", "cpf"],
      include: [
        {
          model: AddressModel,
          attributes: [
            "id",
            "street",
            "number",
            "complement",
            "zipCode",
            "city",
            "state",
          ],
        },
        {
          model: PhoneModel,
          attributes: ["phone"],
        },
        {
          model: SaleModel,
          attributes: ["id", "totalPrice", "dateOfSale"],
        },
      ],
    });

    let saleResult = await SaleModel.findAll({
      where: {
        clientId: req.params.id,
        [sequelize.Op.and]: [
          sequelize.where(
            sequelize.fn("month", sequelize.col("dateOfSale")),
            month
          ),

          sequelize.where(
            sequelize.fn("year", sequelize.col("dateOfSale")),
            year
          ),
        ],
      },
      attributes: ["id", "productName", "quantity", "totalPrice", "dateOfSale"],
      order: [["dateOfSale", "DESC"]],
    });

    if (client) {
      const result = (client = { client, salesFilter: saleResult });

      return res.status(200).json(result);
    } else {
      return res.status(400).json({ msg: "Client not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
};

exports.update = async (req, res) => {
  try {
    const { cpf } = req.body;

    if (isCpfFormatInvalid(cpf) === true) {
      return res.status(400).json({
        msg: "Invalid cpf format! ex: 000.000.000-00",
      });
    }

    const resultClient = await ClientModel.update(
      { ...req.body },
      { returning: true, where: { id: req.params.id } }
    );

    if (resultClient[1] !== 1) {
      return res.status(404).json({ msg: "Client not found" });
    }
    return res.status(200).json({
      msg: "Update successfully !",
    });
  } catch (err) {
    console.log(err);
    const msg = err.errors[0].message;
    const path = err.errors[0].path;
    return res.status(400).send({
      err,
      msg,
      path,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await ClientModel.destroy({
      where: { id: req.params.id },
    });
    console.log(result);
    if (result !== 1) {
      return res.status(404).json({ msg: "Client not found!" });
    }
    return res.status(201).json({ msg: "Client successfully deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
