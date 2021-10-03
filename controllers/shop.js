//* Product
const Product = require("../models/product");
const Order = require("../models/order");

// //* exports

// SELECT ALL PRODUCTS (Home)
exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Home",
        path: "/",
        isAuthenticated: req.session.isLogin,
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
        isAuthenticated: req.session.isLogin,
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
        isAuthenticated: req.session.isLogin,
      });
    })
    .catch((error) => console.log(error));
};

// SELECT ALL CART ITEMS
exports.getCart = (req, res, next) => {
  return req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;

      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        isAuthenticated: req.session.isLogin,
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
    .removeFromCart(productId)
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id }).then((orders) => {
    res.render("shop/orders", {
      orders: orders,
      pageTitle: "Orders",
      path: "/orders",
      isAuthenticated: req.session.isLogin,
    });
  });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((item) => {
        return {
          product: { ...item.productId._doc },
          quantity: item.quantity,
        };
      });

      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user, // req.uesr._id
        },
        products: products,
      });

      return order.save();
    })
    .then((result) => {
      req.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((error) => {
      console.log(error);
    });
};
