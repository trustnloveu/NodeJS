//* Model with Schema, based on Mongoose
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    // isAuthenticated: req.session.isLogin,
  });
};

// SELECT PRODUCTS
exports.getProducts = (req, res, next) => {
  Product.find()
    // .select("title price -_id") //! To filter data, whcih you'd like to see or not
    .populate("userId", "name") //! To get all nested data related to ObjectId
    .then((products) => {
      res.render("admin/list-product", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/list-product",
        // isAuthenticated: req.session.isLogin,
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
    userId: req.user, //! [ req.user._id ] is typical, but Mongoose will automatically pick one property according to Schema in Product Model
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
        // isAuthenticated: req.session.isLogin,
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

  Product.findById(productId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDescription;

      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/list-product");
    })
    .catch((error) => {
      console.log(error);
    });
};

// DELETE ONE PRODUCT
exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.findByIdAndDelete(productId)
    .then((result) => {
      console.log(result);
      return res.redirect("/admin/list-product");
    })
    .catch((error) => {
      console.log(error);
    });
};
