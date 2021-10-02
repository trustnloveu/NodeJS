//* Model with Schema, based on Mongoose
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
  // product properties
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  // user properties
  // console.log(req.user);
  // const userId = req.user._id; // ObjectId

  const product = new Product({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  });

  product
    .save()
    .then(() => {
      res.redirect("/products");
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
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const productId = req.body.productId;

  const updatedProduct = new Product(
    updatedTitle,
    updatedPrice,
    updatedImageUrl,
    updatedDescription,
    productId
  );

  updatedProduct
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });

  return res.redirect("/admin/list-product");
};

// DELETE ONE PRODUCT
exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.deleteById(productId)
    .then((result) => {
      console.log(result);
      return res.redirect("/admin/list-product");
    })
    .catch((error) => {
      console.log(error);
    });
};
