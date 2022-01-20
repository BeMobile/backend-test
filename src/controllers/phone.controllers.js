const PhoneModel = require("../models/phone.model");
const ClientModel = require("../models/client.model");
exports.update = async (req, res) => {
  try {
    const resulPhone = await PhoneModel.update(
      { ...req.body },
      { returning: true, where: { clientId: req.params.idClient } }
    );

    if (resulPhone[1] !== 1) {
      return res.status(404).json({ msg: "Phone not found" });
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
    const resulPhone = await PhoneModel.findAll({
      order: [["id", "ASC"]],
      attributes: ["phone"],
      include: {
        model: ClientModel,
        attributes: ["id", "name"],
      },
    });
    return res.status(200).json(resulPhone);
  } catch {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
};
