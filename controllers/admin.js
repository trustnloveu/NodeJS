const uuid = require("uuid");

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

  req.user // User.create() 대체
    .createProduct({
      id: uuid.v1(),
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
      // userSequelizeId: req.user.id,
    })
    .then((result) => {
      console.log("Create Product Instance Result ::: ");
      // console.log(result);

      res.redirect("/");
    })
    .catch((error) => {
      console.log("Create Product Instance Error ::: ");
      console.log(error);
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

// SELECT ONE PRODUCT
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const productId = req.params.productId;

  //* New Version ( with Sequelize )
  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/add-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((error) => {
      console.log("Create Product Instance Error ::: ");
      console.log(error);
    });

  //* Old Version ( without Sequelize )
  // Product.findById(productId, (product) => {
  //   if (!product) {
  //     return res.redirect("/");
  //   }

  //   res.render("admin/edit-product", {
  //     pageTitle: "Edit Product",
  //     path: "/admin/add-product",
  //     editing: editMode,
  //     product: product,
  //   });
  // });
};

// UPDATE ONE PRODUCT
exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  //* New Version ( with Sequelize )
  Product.findByPk(productId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDescription;

      return product.save();
    })
    .then((result) => {
      console.log("Result of Updating Product Detail");
      // console.log(result);

      return res.redirect("/admin/list-product");
    })
    .catch((error) => {
      console.log("Create Product Instance Error ::: ");
      console.log(error);
    });

  //* Old Version ( without Sequelize )
  // const updatedProduct = new Product(
  //   productId,
  //   updatedTitle,
  //   updatedPrice,
  //   updatedImageUrl,
  //   updatedDescription
  // );

  // updatedProduct.save();

  // return res.redirect("/admin/list-product");
};

// SELECT PRODUCTS
exports.getProducts = (req, res, next) => {
  //* New Version ( with Sequelize )
  Product.findAll()
    .then((products) => {
      res.render("admin/list-product", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/list-product",
      });
    })
    .catch((error) => {
      console.log("Create Product Instance Error ::: ");
      console.log(error);
    });

  //* Old Version ( without Sequelize )
  // Product.fetchAll((products) => {
  //   res.render("admin/list-product", {
  //     prods: products,
  //     pageTitle: "Admin Products",
  //     path: "/admin/list-product",
  //   });
  // });
};

// DELETE ONE PRODUCT
exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  //* New Version ( with Sequelize )
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("Result of Deleting Product");
      // console.log(result);

      return res.redirect("/admin/list-product");
    })
    .catch((error) => {
      console.log("Create Product Instance Error ::: ");
      console.log(error);
    });

  //* Old Version ( without Sequelize )
  // Product.deleteOne(productId);

  // return res.redirect("/admin/list-product");
};
