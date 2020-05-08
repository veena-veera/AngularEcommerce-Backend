var MongoClient = require("mongodb").MongoClient;

var express = require("express"),
  router = express.Router();
var fs = require("fs");

router.get("/getProducts", function (req, res) {
  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017", function (err, client) {
    var db = client.db("sunshine");
    db.collection("Products", function (err, collection) {
      collection.find().toArray(function (err, items) {
        if (err) throw err;
        console.log("result is an array :: ", typeof items);
        res.send(items);
      });
    });
    client.close();
  });
});
router.get("/insertProducts", function (req, res) {
  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017", function (err, client) {
    var db = client.db("sunshine");

    var img = { data: Buffer, contentType: String };

    img.data = fs.readFileSync(
      "C:\\Users\\nagra\\angular\\angular-ecommerce\\Angular-Ecommerce\\src\\assets\\images\\product-img1.png"
    );
    img.contentType = "image/png";

    db.collection("Products", function (err, collection) {
      collection.insert({
        id: 1,
        name: "Kanchipuram Silk Jaal Sea Green Saree",
        price: "$120",
      });
      collection.insert({
        id: 2,
        name: "Kanchipurm Silk Butta Green Saree",
        price: "$139",
      });
      collection.insert({
        id: 3,
        name: "Kanchipuram Silk Jaal And Tissue Pastel Green Saree",
        price: "$99",
      });
      res.send("products inserted successfully");
    });
  });
});
module.exports = router;
