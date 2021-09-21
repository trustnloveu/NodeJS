//* Product
const Product = require("../models/product-sequelize");
const Cart = require("../models/cart");

//* exports

// SELECT ALL PRODUCTS (Home)
exports.getIndex = (req, res, next) => {
  //* New Version ( with Sequelize )
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Home",
        path: "/",
      });
    })
    .catch((error) => {
      console.log("Create Product Instance Error ::: ");
      console.log(error);
    });

  //* Old Version ( without Sequelize )
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/index", {
  //       prods: rows,
  //       pageTitle: "Home",
  //       path: "/",
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

// SELECT ALL PRODUCTS (Products)
exports.getProducts = (req, res, next) => {
  //* New Version ( with Sequelize )
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/products",
      });
    })
    .catch((error) => {
      console.log("Create Product Instance Error ::: ");
      console.log(error);
    });

  //* Old Version ( without Sequelize )
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/product-list", {
  //       prods: rows,
  //       pageTitle: "Shop",
  //       path: "/products",
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

// SELECT ONE PRODUCT
exports.getProductDetail = (req, res, next) => {
  const productId = req.params.productId;

  //* New Version ( with Sequelize ) - findByPk, findAll
  // Product.findByPk(productId)
  //   .then((product) => {
  //     res.render("shop/product-detail", {
  //       product: product,
  //       pageTitle: product.title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((error) => console.log(error));

  Product.findAll({ where: { id: productId } })
    .then((products) => {
      res.render("shop/product-detail", {
        product: products[0],
        pageTitle: products[0].title,
        path: "/products",
      });
    })
    .catch();
};

//* Old Version ( without Sequelize )
//   Product.findById(productId)
//     .then(([product, fieldData]) => {
//       res.render("shop/product-detail", {
//         product: product[0],
//         pageTitle: product[0].title,
//         path: "/products",
//       });
//     })
//     .catch((error) => console.log(error));
// };

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];

      for (product of products) {
        const cartProductData = cart.products.find(
          (item) => item.id === product.id
        );

        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }

      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });

  res.redirect("/cart");
};

exports.postCartDelete = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
