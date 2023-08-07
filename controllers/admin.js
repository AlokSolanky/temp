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
  const product = new Product(null,title, imageUrl, description, price);
  product
    .save(null)
    .then((data) => {
      console.log("inserstion succesfull", data);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }

  const prodId = req.params.productId;
  Product.findById(prodId).then(([data])=>
  {
    res.render("admin/edit-product", {
      pageTitle: "edit Product",
      path: "/admin/add-product",
      editing: editMode,
      product: data[0],
    });
  })
    

};



exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatePrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatePrice
  );
  updatedProduct
    .save()
    .then((data) => {
      res.redirect("/admin/products");
      console.log("update succesfull");
    })
    .catch((err) => {
      console.log("err");
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([data]) => {
    res.render("admin/products", {
      prods: data,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.deleteProductById(prodId).then((data)=>
  {
    console.log("deletion succesfull");
    res.redirect("/admin/products");
  });
  
};
