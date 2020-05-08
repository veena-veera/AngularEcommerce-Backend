var express = require("express"),
  router = express.Router();

router.post("/saveOrders", function (req, res) {
  var mongoose = require("mongoose");

  // make a connection
  mongoose.connect("mongodb://localhost:27017/sunshine");

  // get reference to database
  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", function () {
    console.log("Connection Successful!");

    // define Schema
    var OrderSchema = mongoose.Schema({
      userfname: String,
      userlname: String,
      useremail: String,
      userphone : Number,
      useraddress : String,
      usercity : String,
      userstate: String,
      userzip: Number,
      price: Number,
      products: [],
    });

    // compile schema to model
    var Order = mongoose.model("Order", OrderSchema);

    // documents array
    /*var orderDetails = {
      username: "Veena",
      email: "veena@gmail.com",
      address: "700 camberley court",
      price: "$200",
      products: [
        { name: "Saree1", price: 100, quantity: 1 },
        { name: "Saree2", price: 50, quantity: 2 },
      ],
      quanity: "3",
    };*/
    var orderDetails = req.body.orderDetails;
    console.log("orderDetails:: ", orderDetails);
    // save multiple documents to the collection referenced by Book Model
    Order.collection.insert(orderDetails, function (err, docs) {
      if (err) {
        return console.error(err);
      } else {
        console.log(docs.ops[0]._id);
        res.json({
          OrderId: docs.ops[0]._id,
          msg: "order inserted successfully",
        });
      }
    });
  });
});
module.exports = router;
