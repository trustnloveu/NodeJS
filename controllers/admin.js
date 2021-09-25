const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

// SELECT PRODUCTS
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/list-product", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/list-product",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// INSERT ONE PRODUCT
exports.postAddProduct = (req, res, next) => {
  // properties
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  const product = new Product(title, price, imageUrl, description);

  product
    .save()
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((error) => {
      console.log(error);
    });
};

// SELECT ONE PRODUCT
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      console.log(product);

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/add-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// UPDATE ONE PRODUCT
exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedPrice,
    updatedImageUrl,
    updatedDescription
  );

  updatedProduct.save();

  return res.redirect("/admin/list-product");
};

// DELETE ONE PRODUCT
exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.deleteOne(productId);

  return res.redirect("/admin/list-product");
};
