const { Order, ProductCart } = require("../models/order");
const router = require("../routes/order");
const { isSignedIn, isAuthenticated, isAdmin } = require("./auth");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order found in DB",
        });
      }
      req.order = order;
      next();
    });
};

// create
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    res.json(order);
  });
};

// read
exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name email")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found in DB",
        });
      }
      res.json(orders);
    });
};

// status of order
exports.getOrderStatus = (req, res) => {
  res.json(Order.schema("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, status) => {
      if (err) {
        return res.status(400).json({
          error: "No order status found in DB",
        });
      }
      res.json(status);
    }
  );
};
