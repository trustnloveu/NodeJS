//* Product
const Product = require("../models/product");
const Cart = require("../models/cart");

//* exports
exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Home",
      path: "/",
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/products",
    });
  });
};

exports.getProductDetail = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: "Product Details",
      path: "/products",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];

      for (product of products) {
        const cartProductData = cart.products.find(
          (item) => item.id === product.id
        );

        if (cartProductData) {
          cartProducts.push({ productItem: product, qty: cartProductData.qty });
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
