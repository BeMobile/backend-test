// import models
const UserModel = require("../models/user.model");
const ProductModel = require("../models/product.model");

exports.create = async (req, res) => {
  try {
    const loggedInUser = req.currentUser;
    const id = loggedInUser.id;

    const result = await ProductModel.create({
      ...req.body,
      idUserOwner: id, // relacionamento entre produto e usuario logado
    });
    return res.status(201).json({
      msg: "Product registered successfully!",
      product: result,
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
    const product = await ProductModel.findAll({
      order: [["title", "ASC"]],
      attributes: ["id", "price", "title"],
    });
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
};

exports.findById = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      where: { id: req.params.id },
      attributes: [
        "id",
        "title",
        "price",
        "author",
        "description",
        "deletedAt",
      ],
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const product = await ProductModel.update(
      { ...req.body },
      { where: { id: req.params.id } }
    );
    console.log(product);
    if (product[0] !== 1) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json({ msg: "Product Update succesfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    await ProductModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ msg: "Deleted succesfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
