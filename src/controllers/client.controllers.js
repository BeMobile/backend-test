// import modelos
const PhoneModel = require("../models/phone.model");
const ProductModel = require("../models/product.model");
const SaleModel = require("../models/sale.model");
const ClientModel = require("../models/client.model");
const AddressModel = require("../models/address.model");

const isCpfFormatInvalid = require("../utils/cpf.utils");

exports.create = async (req, res) => {
  try {
    const { cpf, phone, street, number, complement, zipCode, city, state } =
      req.body;

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

    const result = await ClientModel.create(req.body);

    //
    const resultphone = await PhoneModel.create({
      phone: phone,
      clientId: result.id,
    });

    const resultAddres = await AddressModel.create({
      street: street,
      number: number,
      complement: complement,
      zipCode: zipCode,
      city: city,
      state: state,
      clientId: result.id,
    });

    return res.status(200).json({
      msg: "Client registered successfully!",
      body: result,
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

exports.finAll = async (req, res) => {
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
    const user = await ClientModel.findOne({
      where: { id: req.params.id },
      attributes: ["id", "name", "birthday", "cpf"],
      order: [[SaleModel, "dateOfSale", "DESC"]],
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
          attributes: ["id", "phone"],
        },
        {
          model: SaleModel,
          attributes: ["id", "qtt", "totalPrice", "dateOfSale"],
          include: [
            {
              model: ProductModel,
              attributes: ["id", "title", "price"],
            },
          ],
        },
      ],
    });

    if (user) {
      return res.status(200).json(user);
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
    const client = await ClientModel.update(
      { ...req.body },
      { returning: true, where: { id: req.params.id } }
    );
    if (client[1] !== 1) {
      return res.status(404).json({ msg: "Client not found" });
    }
    return res.status(200).json(client);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
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
