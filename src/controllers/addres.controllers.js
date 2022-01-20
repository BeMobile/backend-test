const AddressModel = require("../models/address.model");
const ClientModel = require("../models/client.model");
exports.update = async (req, res) => {
  try {
    const resulAddress = await AddressModel.update(
      { ...req.body },
      { returning: true, where: { clientId: req.params.idClient } }
    );

    if (resulAddress[1] !== 1) {
      return res.status(404).json({ msg: "Address not found" });
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

exports.findAll = async (req, res) => {
  try {
    const resultAddress = await AddressModel.findAll({
      order: [["id", "ASC"]],
      attributes: [
        "street",
        "number",
        "complement",
        "zipCode",
        "city",
        "state",
      ],
      include: {
        model: ClientModel,
        attributes: ["id", "name"],
      },
    });
    return res.status(200).json(resultAddress);
  } catch {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
};
