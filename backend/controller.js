const express = require("express");
const app = express();
const pool = require("./db.config.js");
var md5 = require("md5");
var jwt = require("jsonwebtoken");
const admin = require("./models/admin.js");
const user = require("./models/user.js");
const isAuth = require("./authorization/auth.config.js");

// *************ADMIN**************************

exports.postAdminLogin = async (req, res) => {
  const hashed_password = md5(req.body.password.toString());
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const params = req.body;
    connection.query(
      admin.postLogin,
      [params.username, hashed_password],
      (err, result, fields) => {
        if (result.length) {
          connection.release();
          if (!err) {
            let body = {
              name: req.body.username,
            };
            let token = jwt.sign({ data: result }, "secret");
            res.send({ status: 1, data: result, token: token, body: body });
          } else {
            res.send({ status: 0 });
          }
        }
      }
    );
  });
};

exports.getAllProducts = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(admin.getProducts, (err, rows) => {
      connection.release();
      if (!err) {
        console.log(rows);
        res.status(200).send(rows);
      } else {
        res.status(404).send({ message: "Products not found" });
      }
    });
  });
};

exports.postProductsAdmin = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    const prodcutName = req.body.product_name;
    const brandId = req.body.brand_id;
    const categoryId = req.body.category_id;
    const expiryDate = "24.10.2021";
    const weight = req.body.weight;
    const unit = req.body.unit;
    const price = req.body.price;
    const product_img = req.body.product_img;
    const quantity = 1;
    const total = 0;
    isAuth,
      connection.query(
        admin.getProductsIdempotent,
        [
          prodcutName,
          Number(brandId),
          Number(categoryId),
          Number(weight),
          unit,
          price,
        ],
        (err, rows) => {
          console.log(err);
          if (!rows.length) {
            connection.query(
              admin.postProduct,
              [
                prodcutName,
                brandId,
                categoryId,
                expiryDate,
                weight,
                unit,
                price,
                product_img,
                quantity,
                total,
              ],
              (err, rows) => {
                if (!err) {
                  res.send({ status: 1 });
                } else {
                  res.send({ status: 0 });
                }
              }
            );
          } else {
            res
              .status(404)
              .send({ message: "Products already exist", status: 0 });
          }
        }
      );
  });
};

exports.putProductsAdmin = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    const product_id = req.body.product_id;
    const product_name = req.body.product_name;
    const weight = req.body.weight;
    const unit = req.body.unit;
    const price = req.body.price;
    isAuth,
      connection.query(
        admin.putProduct,
        [product_name, weight, unit, price, product_id],
        (err, rows) => {
          connection.release();
          if (!err) {
            res.send(`updated`);
          } else {
            res.status(404).send({ message: "Products not found" });
          }
        }
      );
  });
};

exports.deleteProductsAdmin = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const productId = req.params.id;
    isAuth,
      connection.query(admin.deleteProduct + productId, (err, rows) => {
        connection.release();
        if (!err) {
          res.send(`deleted`);
        } else {
          res.status(404).send({ message: "Products not found" });
        }
      });
  });
};

//Pagination in admin - for viewing products
exports.getPaginatedProductsAdmin = (req, res) => {
  const limit = 10;
  const page = req.params.page;
  const offset = (page - 1) * limit;

  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      admin.getProductPagination + limit + admin.offset + offset,
      (err, rows) => {
        connection.release();
        if (!err) {
          // create payload
          var jsonResult = {
            products_page_count: rows.length,
            page_number: page,
            products: rows,
          };
          // create response
          var myJsonString = JSON.parse(JSON.stringify(jsonResult));
          res.statusMessage = "Products for page " + page;
          res.statusCode = 200;
          res.json(myJsonString);
          res.end();
        } else {
          res.status(404).send({ message: "Page not found", status: "404" });
        }
      }
    );
  });
};

//Query filter
exports.getProductsByCategory = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      admin.getProductsByCategory + req.params.id,
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(rows);
        } else {
          res.status(404).send({ message: "Category not found" });
        }
      }
    );
  });
};

exports.getBrandsAdmin = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(admin.getBrands, (err, rows) => {
      connection.release();
      if (!err) {
        res.send(rows);
      } else {
        res.status(404).send({ message: "Brand not found" });
      }
    });
  });
};

exports.getCategoryAdmin = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(admin.getCategory, (err, rows) => {
      connection.release();
      if (!err) {
        res.send(rows);
      } else {
        res.status(404).send({ message: "Category not found" });
      }
    });
  });
};

exports.getOrdersAdmin = (req, res) => {
  const limit = 10;
  const page = req.params.page;
  const offset = (page - 1) * limit;

  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      admin.getOrders + limit + admin.offset + offset,
      (err, rows) => {
        connection.release();
        if (!err) {
          // create payload
          var jsonResult = {
            products_page_count: rows.length,
            page_number: page,
            orders: rows,
          };
          // create response
          var myJsonString = JSON.parse(JSON.stringify(jsonResult));
          res.statusMessage = "Products for page " + page;
          res.statusCode = 200;
          res.json(myJsonString);
          res.end();
        } else {
          res.status(404).send({ message: "Page not found", status: "404" });
        }
      }
    );
  });
};

//*****************USER********************** */

exports.postUserLogin = async (req, res) => {
  const hashed_password = md5(req.body.password.toString());
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const params = req.body;
    connection.query(
      user.postLogin,
      [params.username, hashed_password],
      (err, result, fields) => {
        if (result.length) {
          connection.release();
          if (!err) {
            let body = {
              name: req.body.username,
            };
            let token = jwt.sign({ data: result }, "secret");
            res.send({
              status: 1,
              data: result,
              token: token,
              body: body,
              link: {
                href: "http://localhost:5000/chat",
              },
            });
          } else {
            res.send(err);
          }
        }
      }
    );
  });
};

exports.postUserRegistration = async (req, res) => {
  // console.log(pw1);
  const hashed_password = md5(req.body.password.toString());
  let id;
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      user.getUserEmail,
      [req.body.email],
      (err, result, fields) => {
        const pw1 = req.body.password;
        const pw2 = req.body.cpassword;

        if (!result.length) {
          const letters = /^[A-Za-z]+$/;
          const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          const phoneNo = /^\d{10}$/;
          if (req.body.email.match(mailformat)) {
            if (req.body.fname.match(letters)) {
              if (req.body.lname.match(letters)) {
                if (req.body.phone.match(phoneNo)) {
                  if (pw1 != pw2) {
                    console.log("Passwords did not match");
                    res.send({
                      message: "Passwords did not match",
                    });
                    return false;
                  } else {
                    const sql = user.getMaxUserID;
                    connection.query(sql, (err, result, fields) => {
                      id = result[0].LastID + 1;

                      connection.query(
                        user.postUserDetails +
                          req.body.fname +
                          "', '" +
                          req.body.lname +
                          "', '" +
                          req.body.phone +
                          "', '" +
                          req.body.email +
                          "');",
                        (err, result, fields) => {
                          connection.query(
                            user.postUserAddress +
                              id +
                              ", '" +
                              req.body.street +
                              "', '" +
                              req.body.city +
                              "', " +
                              req.body.pincode +
                              ");",
                            (err, result, fields) => {
                              connection.query(
                                user.postUserLogin +
                                  id +
                                  ", '" +
                                  req.body.email +
                                  "', '" +
                                  hashed_password +
                                  "');",
                                (err, result, fields) => {
                                  if (err) {
                                    console.log(err);
                                    res.send({ status: 0, data: err });
                                  } else {
                                    let body = {
                                      name: req.body.fname,
                                      email: req.body.email,
                                    };
                                    let token = jwt.sign(
                                      { data: result },
                                      "secret"
                                    );
                                    res.send({
                                      status: 1,
                                      data: result,
                                      token: token,
                                      body: body,
                                      message: "Registered Successfully",
                                    });
                                  }
                                }
                              );
                            }
                          );
                        }
                      );
                    });
                  }
                } else {
                  console.log("You have entered an invalid phone number");
                  res.send({
                    message: "You have entered invalid phone number!",
                  });
                  return false;
                }
              } else {
                console.log("You have entered invalid Last Name!");
                res.send({
                  message: "You have entered invalid Last Name!",
                });
                return false;
              }
            } else {
              console.log("You have entered invalid First Name!");
              res.send({
                message: "You have entered invalid First Name!",
              });
              return false;
            }
          } else {
            console.log("You have entered an invalid email address!");
            res.send({
              message: "You have entered an invalid email address!",
            });
            return false;
          }
        } else {
          res.send(err);
        }
      }
    );
  });
};
exports.putUserDetails = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    userId = req.body.userid;
    userFname = req.body.user_fname;
    userLname = req.body.user_lname;
    userContact = req.body.user_contact;
    userEmail = req.body.user_email;
    shortAddress = req.body.short_address;
    city = req.body.city;
    pinCode = req.body.pin_code;

    connection.query(
      user.putUser + user.userID + userId + user.isActive,
      [userFname, userLname, userContact, userEmail],
      (err, rows) => {
        connection.query(
          user.putUserAddress + user.userID + userId + user.isActive,
          [shortAddress, city, pinCode],
          (err, rows) => {
            connection.query(
              user.putUserLogin + user.userID + userId + user.isActive,
              [userEmail],
              (err, rows) => {
                if (err) {
                  res.send(err);
                } else {
                  res.send({ email: userEmail });
                }
              }
            );
          }
        );
      }
    );
  });
};

exports.getUserDetails = (req, res) => {
  isAuth,
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(user.getUserDetails, [req.params.id], (err, rows) => {
        connection.release();
        if (!err) {
          res.send(rows);
        } else {
          res.send(err);
        }
      });
    });
};

exports.postOrder = (req, res) => {
  console.log("inside post order");
  let userid = req.body.userid;
  let products = req.body.products;
  console.log(req.body);

  pool.getConnection((err, connection) => {
    products.forEach((element) => {
      if (err) throw err;
      connection.query(
        user.postOrder,
        [element.product_id, element.quantity, element.total, userid],
        (err, rows) => {
          //connection.release();
          // if (!err) {
          //   console.log("inside no error post order 1");
          //   console.log(rows);
          //   res.send(rows);
          //   console.log("inside no error post order 2");
          // } else {
          //   console.log("inside  error post order 1");
          //   console.log(err);
          //   res.send(err);
          //   console.log("inside error post order 2");
          // }
        }
      );
    });
    if (!err) {
      res.send({ data: "rows" });
    }
  });
};

exports.putUserInCart = (req, res) => {
  console.log("edut method");
  const params = req.body;
  console.log(
    "edit user in cart",
    params.user_id,
    params.user_fname,
    params.user_lname,
    params.user_contact
  );
  pool.getConnection((err, connection) => {
    // if (err) throw err;
    console.log(err);
    connection.query(
      user.putUserDetailsCart + params.user_id,
      [params.user_fname, params.user_lname, params.user_contact],
      (err, rows) => {
        connection.query(
          user.putUserAddressCart + params.user_id,
          [params.short_address, params.pin_code, params.city],
          (err, rows) => {
            if (!err) {
              console.log("inside no error put user  1");
              res.send(rows);
              console.log("inside no error put user  2");
            } else {
              console.log("inside  error put user  1");
              console.log(err);
              res.send(err);
              console.log("inside  error put user  2");
            }
          }
        );
      }
    );
  });
};

exports.getOrdersByUserId = (req, res) => {
  const limit = 10;
  const page = req.params.page;
  const offset = (page - 1) * limit;
  isAuth,
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        user.getUserOrdersbyID + limit + admin.offset + offset,
        [req.params.id],
        (err, rows) => {
          connection.release();
          if (!err) {
            // create payload
            var jsonResult = {
              products_page_count: rows.length,
              page_number: page,
              products: rows,
            };
            // create response
            var myJsonString = JSON.parse(JSON.stringify(jsonResult));
            res.statusMessage = "Orders for page " + page;
            res.statusCode = 200;
            res.json(myJsonString);
            res.end();
          } else {
            console.log(err);
            res.send(err);
          }
        }
      );
    });
};

exports.deleteOrderByOrderId = async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(req.params.id);
    const orderId = req.params.id;
    isAuth,
      connection.query(user.deleteOrder + orderId, (err, rows) => {
        connection.release();
        if (!err) {
          res.send(rows);
        } else {
          res.status(404).send({ message: "Order not found" });
        }
      });
  });
};
