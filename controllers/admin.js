const Product = require("../models/product-sequelize");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

// INSERT ONE PRODUCT
exports.postAddProduct = (req, res, next) => {
  // properties
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  //* New Version ( with Sequelize )
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      console.log("Create Product Instance Result ::: ");
      console.log(result);
    })
    .catch((error) => {
      console.log("Create Product Instance Error ::: " + error);
    });

  //* Old Version ( without Sequelize )
  // Product instance
  // const product = new Product(title, price, imageUrl, description);

  // insert
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((error) => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/add-product",
      editing: editMode,
      product: product,
    });
  });
};

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

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/list-product", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/list-product",
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.deleteOne(productId);

  return res.redirect("/admin/list-product");
};
