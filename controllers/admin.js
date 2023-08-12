const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
    })
    .then((res) => {
      console.log(res);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/admin/products");
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }

  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    // Product.findByPk(prodId)
    .then((data) => {
      data = data[0];
      if (!data) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "edit Product",
        path: "/admin/add-product",
        editing: editMode,
        product: data,
      });
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatePrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then((data) => {
      data.title = updatedTitle;
      data.price = updatePrice;
      data.imageUrl = updatedImageUrl;
      data.description = updatedDesc;
      return data.save();
    })
    .then((result) => {
      console.log("updated Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    // Product.findAll()
    .then((data) => {
      res.render("admin/products", {
        prods: data,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((data) => {
      return data.destroy();
    })
    .then((result) => {
      console.log("deletion succesfull");
      res.redirect("/admin/products");
    });
};
