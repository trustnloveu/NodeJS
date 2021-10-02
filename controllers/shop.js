//* Product
const Product = require("../models/product");

// //* exports

// SELECT ALL PRODUCTS (Home)
exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Home",
        path: "/",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// SELECT ALL PRODUCTS (Products)
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/products",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// SELECT ONE PRODUCT
exports.getProductDetail = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId) //! Mongoose automatically convert String ID to ObjectId
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((error) => console.log(error));
};

// SELECT ALL CART ITEMS
exports.getCart = (req, res, next) => {
  console.log(req.user);
  return req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// UPDATE CART IN USER
exports.postCart = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postCartDelete = (req, res, next) => {
  const productId = req.body.productId;

  return req.user
    .deleteCart(productId)
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getOrders = (req, res, next) => {
  const userId = req.user._id;

  return req.user
    .getOrders(userId)
    .then((orders) => {
      res.render("shop/orders", {
        orders: orders,
        pageTitle: "Orders",
        path: "/orders",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postOrder = (req, res, next) => {
  return req.user
    .addOrder()
    .then((result) => {
      console.log(result);

      res.redirect("/orders");
    })
    .catch((error) => {
      console.log(error);
    });
};

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     pageTitle: "Checkout",
//     path: "/checkout",
//   });
// };
