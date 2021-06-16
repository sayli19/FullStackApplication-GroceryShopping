module.exports = (app) => {
  const contrl = require("./controller.js");
  var path = require("path");
  var router = require("express").Router();
  const cache = require("./caching/cache-service.js");

  //SOCKET
  router.use("/chat", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
  });

  //ADMIN
  router.post("/admin/login", contrl.postAdminLogin);
  router.get("", cache(200), contrl.getAllProducts);
  router.post("/admin/products", contrl.postProductsAdmin);
  router.put("/admin/products", contrl.putProductsAdmin);
  router.delete("/admin/products/:id", contrl.deleteProductsAdmin);
  router.get("/admin/products/:page", contrl.getPaginatedProductsAdmin);
  router.get("/admin/category/:id", cache(200), contrl.getProductsByCategory);
  router.get("/admin/brands", cache(200), contrl.getBrandsAdmin);
  router.get("/admin/category", cache(200), contrl.getCategoryAdmin);
  router.get("/admin/orders/:page", cache(200), contrl.getOrdersAdmin);

  //USER

  router.post("/user/login", contrl.postUserLogin);
  router.post("/user/registration", contrl.postUserRegistration);
  router.put("/user/details", contrl.putUserDetails);
  router.get("/user/details/:id", contrl.getUserDetails);
  router.post("/user/orders", contrl.postOrder);
  router.put("/user/cart", contrl.putUserInCart);
  router.get("/user/orders/:id/:page", contrl.getOrdersByUserId);
  router.delete("/user/orders/:id", contrl.deleteOrderByOrderId);

 
  
  // SWAGGER

  /**
   * @swagger
   *  definitions:
   *    AdminLogin:
   *     type: object
   *     properties:
   *      admin_fName:
   *       type: string
   *      admin_lName:
   *       type: string
   *      admin_email:
   *       type: string
   *      admin_password:
   *       type: string
   */
  /**
   * @swagger
   * /admin/login:
   *  post:
   *   summary: Login by admin
   *   description: Admin can see the orders of grocery shop
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *       $ref:'#/definitions/AdminLogin'
   *   responses:
   *    200:
   *     description: Getting order Details successfully
   *    500:
   *     description: failure in getting order details
   */

  /**
   * @swagger
   * /:
   *  get:
   *   summary: To get all the products to admin
   *   description: Admin can see all the products in grocery shop
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *       $ref:'#/definitions/Product'
   *   responses:
   *    200:
   *     description: Getting Products successfully
   *    500:
   *     description: failure in getting product details
   */

  /**
   * @swagger
   *  definitions:
   *    Category:
   *     type: object
   *     properties:
   *      category_id:
   *       type: int
   *      category_name:
   *       type: string
   */

  /**
   * @swagger
   *  definitions:
   *    Product:
   *     type: object
   *     properties:
   *      product_name:
   *       type: string
   *      brand_id:
   *       type: number
   *      category_id:
   *       type: number
   *      weight:
   *       type: number
   *      unit:
   *       type: string
   *      price:
   *       type: number
   */

  /**
   * @swagger
   * /admin/products:
   *  post:
   *   summary: Create a new product
   *   description: Admin can add the products in grocery shop
   *   parameters:
   *    - in: req.body
   *      name: req.body
   *      required: true
   *      description: body of products
   *      schema:
   *       $ref: '#/definitions/Product'
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *       $ref: '#/definitions/Product'
   *   responses:
   *    200:
   *     description: Adding Products successfully
   *    400:
   *     description: failed
   */

  /**
   * @swagger
   * /admin/products:
   *  put:
   *   summary: Update an existing product
   *   description: Admin can update the products in grocery shop
   *   parameters:
   *    - in: path
   *      name: id
   *      schema:
   *       type: integer
   *      required: true
   *      description: id of the product
   *      example: 2
   *    - in: req.body
   *      name: req.body
   *      required: true
   *      description: body object
   *      schema:
   *       $ref: '#/definitions/Product'
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *       $ref: '#/definitions/Product'
   *   responses:
   *    200:
   *     description: Updating Products successfully
   */
  /**
   * @swagger
   * /admin/products/{id}:
   *  delete:
   *   summary: To delete the product by a particular product id
   *   description: Admin can delete the products in grocery shop
   *   parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: Numeric id required
   *      schema:
   *          type: integer
   *   responses:
   *    200:
   *     description: Deletion successful
   */

  /** @swagger
   * /admin/products/{page}:
   *  get:
   *   summary: To get products by admin by page number - pagination
   *   description: Admin can see the orders of grocery shop
   *   parameters:
   *    - in: path
   *      name: page
   *      required: true
   *      description: body of products
   *      schema:
   *       type: integer
   *   responses:
   *    200:
   *     description: Getting products successfully
   *    500:
   *     description: failure in getting product details
   */
  /**
   * @swagger
   *  definitions:
   *    Brand:
   *     type: object
   *     properties:
   *      brand_id:
   *       type: int
   *      brand_name:
   *       type: string
   */
  /**
   * @swagger
   * /admin/brands:
   *  get:
   *   summary: To get brands of products by admin
   *   description: Admin can see the brands in grocery shop
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *       $ref:'#/definitions/Brand'
   *   responses:
   *    200:
   *     description: Getting Brand Details successfully
   *    500:
   *     description: failure in getting brand details
   */
  /**
   * @swagger
   * /admin/category:
   *  get:
   *   summary: To get categories by admin
   *   description: Admin can see the categories in grocery shop
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *       $ref:'#/definitions/Category'
   *   responses:
   *    200:
   *     description: Getting Category Details successfully
   */

  /**
   * @swagger
   *  definitions:
   *    Order:
   *     type: object
   *     properties:
   *      product_name:
   *       type: string
   *      user_fname:
   *       type: string
   *      user_lname:
   *       type: string
   *      user_contact:
   *       type: int
   *      user_email:
   *       type: string
   *      short_address:
   *       type: string
   *      city:
   *       type: string
   *      pin_code:
   *       type: int
   *      quantity:
   *       type: int
   *      price:
   *       type: int
   */

  //---

  /**
   * @swagger
   *  definitions:
   *    CategoryID:
   *     type: object
   *     properties:
   *      product_id:
   *       type: int
   *      product_name:
   *       type: string
   *      brand_id:
   *       type: int
   *      category_id:
   *       type: int
   *      expiry_date:
   *       type: time
   *      weight:
   *       type: int
   *      unit:
   *       type: string
   *      price:
   *       type: int
   *      quantity:
   *       type: int
   *      total:
   *       type: int
   */
  /**
   * @swagger
   * /admin/category/{id}:
   *  get:
   *   summary: To get all the details of a product by a particular category id
   *   description: Admin can see the products details by a paricular category id in grocery shop
   *   parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: Numeric id required
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *       $ref:'#/definitions/CategoryID'
   *   responses:
   *    200:
   *     description: Getting category details successfully
   *    500:
   *     description: failure in getting category details
   */
  /**
   * @swagger
   * /admin/orders/{page}:
   *  get:
   *   summary: To get orders by admin - pagination
   *   description: Admin can see the orders of grocery shop
   *   parameters:
   *    - in: path
   *      name: page
   *      required: true
   *      description: body of products
   *      schema:
   *       type: integer
   *   responses:
   *    200:
   *     description: Getting order Details successfully
   *    500:
   *     description: failure in getting order details
   */

  //----USER

  /**
   * @swagger
   *  definitions:
   *    UserLogin:
   *     type: object
   *     properties:
   *      user_email:
   *       type: string
   *      user_password:
   *       type: string
   */
  /**
   * @swagger
   * /user/login:
   *  post:
   *   summary: Login by user
   *   description: user can see the list of products of grocery shop
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *       $ref:'#/definitions/UserLogin'
   *   responses:
   *    200:
   *     description: Getting order Details successfully
   *    500:
   *     description: failure in getting order details
   */

  /**
   * @swagger
   *  definitions:
   *    UserRegisteration:
   *     type: object
   *     properties:
   *      user_fname:
   *       type: string
   *      user_lname:
   *       type: string
   *      user_contact:
   *       type: string
   *      user_email:
   *       type: string
   *      short_address:
   *       type: string
   *      city:
   *       type: string
   *      pin_code:
   *       type: string
   *      user_password:
   *       type: string
   */

  /**
   * @swagger
   * /user/registration:
   *  post:
   *   summary: Registration by user
   *   description: user can register in order to purchase goods from grocery store
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *       $ref:'#/definitions/UserRegisteration'
   *   responses:
   *    200:
   *     description: Getting order Details successfully
   *    500:
   *     description: failure in getting order details
   */
  /**
   * @swagger
   * definitions:
   *  User:
   *   type: object
   *   properties:
   *    user_id:
   *     type: int
   *     description: The id of user
   *    user_fname:
   *     type: string
   *     description: First name of user
   *    user_lname:
   *     type: string
   *     description: Last name of User
   *    user_contact:
   *     type: int
   *     description: Contact number of User
   *    user_email:
   *     type: string
   *     description: Email of User
   *    short_address:
   *     type: string
   *     description: Address of User
   *    city:
   *     type: string
   *     description: City of User
   *    pin_code:
   *     type: int
   *     description: Pincode of User
   */

  /**
   * @swagger
   * /user/details:
   *  put:
   *   summary: To update user details
   *   description: see user details from our grocery shop
   *   parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: Numeric id required
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *       $ref:'#/definitions/User'
   *   responses:
   *    200:
   *     description: User created successfully
   *    500:
   *     description: failure in creating user
   */

  /**
   * @swagger
   * /user/details/{id}:
   *  get:
   *   summary: To get user details from id
   *   description: see user details from our grocery shop
   *   parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: Numeric id required
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *       $ref:'#/definitions/User'
   *   responses:
   *    200:
   *     description: User created successfully
   *    500:
   *     description: failure in creating user
   */

  /**
   * @swagger
   * /user/cart:
   *  put:
   *   summary: To update user details such as address during checkout
   *   description: see user details from our grocery shop
   *   parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: Numeric id required
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *       $ref:'#/definitions/User'
   *   responses:
   *    200:
   *     description: User created successfully
   *    500:
   *     description: failure in creating user
   */

  /**
   * @swagger
   *  definitions:
   *    PostOrder:
   *     type: object
   *     properties:
   *      product_id:
   *       type: integer
   *      quantity:
   *       type: integer
   *      price:
   *       type: string
   *      user_id:
   *       type: integer
   *
   */
  /**
   * @swagger
   * /user/orders:
   *  post:
   *   summary: submit orders requested by user
   *   description: User can add the orders in grocery shop
   *   parameters:
   *    - in: req.body
   *      name: body
   *      required: true
   *      description: body of products
   *      schema:
   *       $ref: '#/definitions/PostOrder'
   *   requestBody:
   *    required: true
   *    content:
   *     application/json:
   *      schema:
   *       $ref: '#/definitions/PostOrder'
   *   responses:
   *    200:
   *     description: Adding Orders successfully
   */

  /**
   * @swagger
   *  definitions:
   *    UserOrderID:
   *     type: object
   *     properties:
   *      order_id:
   *       type: integer
   *      product_name:
   *       type: string
   *      brand_name:
   *       type: string
   *      quantity:
   *       type: integer
   *      category_id:
   *       type: integer
   *      category_name:
   *       type: string
   *      price:
   *       type: integer
   *
   */
  /**
   * @swagger
   * /user/orders/{id}/{page}:
   *  get:
   *   summary: To get user orders from id - pagination
   *   description: User can see the orders from its id
   *   parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: Numeric id required
   *    - in: path
   *      name: page
   *      required: true
   *      description: body of products
   *      schema:
   *       type: integer
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *       $ref:'#/definitions/UserOrderID'.
   *   responses:
   *    200:
   *     description: Getting Order Details successfully
   *    500:
   *     description: failure in getting order details
   */

  /**
   * @swagger
   * /user/orders/{id}:
   *  delete:
   *   summary: To delete the order by a adding particular id
   *   description: User can delete the orders of theirs
   *   parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: Numeric id required
   *      schema:
   *       type: integer
   *   responses:
   *    200:
   *     description: Deletion successful
   */

  
  
  
  
  
  
  
  
  app.use("", router);
};
