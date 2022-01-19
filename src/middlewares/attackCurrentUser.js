const UserModel = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    const loggedInUser = await UserModel.findOne({
      where: { email: req.user.email },
    });

    const user = await UserModel.findOne(
      { where: { id: loggedInUser.id } },
      { passwordHash: 0, __v: 0 }
    );

    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    req.currentUser = user;
    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
};
