const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User is not found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  // TODO: get back here for passwprd --- It's done but I'm leave it for understand
  req.profile.salt = undefined;
  req.profile.encryp_password = undefined;
  req.profile.updatedAt = undefined;
  req.profile.createdAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorize for update this profile",
        });
      }
      user.salt = undefined;
      user.encryp_password = undefined;
      user.updatedAt = undefined;
      user.createdAt = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  User.find({_id: req.profile._id})
    .populate("order", "_id")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order in this account",
        });
      }
      // console.log('backend order res:', json(order));
      return res.json(order);
    });
};

// middleware
exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  // store in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list in DB",
        });
      }
      next();
    }
  );
};
