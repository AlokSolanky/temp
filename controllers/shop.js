const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([data]) => {
    res.render("shop/product-list", {
      prods: data,
      pageTitle: "All Products",
      path: "/products",
    });
  });
}
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([data,_]) => {
      res.render("shop/product-detail", {
        product: data[0],
        pageTitle: "title",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log("there is some error", err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([data]) => {
      res.render("shop/index", {
        prods: data,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {console.log("there is some error")});
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
