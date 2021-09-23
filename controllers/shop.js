//* Product
const Product = require("../models/product");

// //* exports

// SELECT ALL PRODUCTS (Home)
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
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
  Product.fetchAll()
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

// // SELECT ONE PRODUCT
// exports.getProductDetail = (req, res, next) => {
//   const productId = req.params.productId;

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

// exports.getCart = (req, res, next) => {
//   Cart.getCart((cart) => {
//     Product.fetchAll((products) => {
//       const cartProducts = [];
//       for (product of products) {
//         const cartProductData = cart.products.find(
//           (item) => item.id === product.id
//         );
//         if (cartProductData) {
//           cartProducts.push({ productData: product, qty: cartProductData.qty });
//         }
//       }
//       res.render("shop/cart", {
//         pageTitle: "Your Cart",
//         path: "/cart",
//         products: cartProducts,
//       });
//     });
//   });
// };

// exports.postCart = (req, res, next) => {
//   const productId = req.body.productId;

//   Product.findById(productId, (product) => {
//     Cart.addProduct(productId, product.price);
//   });

//   res.redirect("/cart");
// };

// exports.postCartDelete = (req, res, next) => {
//   const productId = req.body.productId;

//   Product.findById(productId, (product) => {
//     Cart.deleteProduct(productId, product.price);
//     res.redirect("/cart");
//   });
// };

// exports.getOrders = (req, res, next) => {
//   // req.user
//   //   .getOrders({ include: ["products"] })
//   //   .then((orders) => {
//   //     res.render("shop/orders", {
//   //       pageTitle: "Your Orders",
//   //       path: "/orders",
//   //       orders: orders,
//   //     });
//   //   })
//   //   .catch((error) => {
//   //     console.log(error);
//   //   });
// };

// exports.postOrder = (req, res, next) => {
//   // let fetchedCart;
//   // req.user
//   //   .getCart()
//   //   .then((cart) => {
//   //     fetchedCart = cart;
//   //     return cart.getProducts();
//   //   })
//   //   .then((products) => {
//   //     return req.user
//   //       .createOrder()
//   //       .then((order) => {
//   //         return order.addProduct(
//   //           products.map((product) => {
//   //             product.OrderItem = { quantity: product.CartItem.quantity };
//   //             return product;
//   //           })
//   //         );
//   //       })
//   //       .catch((error) => {
//   //         console.log(error);
//   //       });
//   //   })
//   //   .then((result) => {
//   //     return fetchedCart.setProducts(null);
//   //   })
//   //   .then((result) => {
//   //     res.redirect("/orders");
//   //   })
//   //   .catch((error) => {
//   //     console.log(error);
//   //   });
// };

// // exports.getCheckout = (req, res, next) => {
// //   res.render("shop/checkout", {
// //     pageTitle: "Checkout",
// //     path: "/checkout",
// //   });
// // };
