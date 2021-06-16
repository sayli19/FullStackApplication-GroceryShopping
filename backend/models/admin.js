// CRUD operation in Products
exports.postLogin =
  "select * from t_admin where admin_email = ? and admin_password = ?";
exports.getProducts = "SELECT * from t_products";
exports.postProduct =
  "INSERT INTO t_products set product_name = ?, brand_id = ?, category_id = ?, expiry_date = ?, weight = ?, unit = ?, price = ?, product_img = ?, quantity = ?, total = ? ";
exports.getProductsIdempotent =
  "Select product_name, brand_id, category_id, weight, unit, price from t_products WHERE product_name = ? AND brand_id = ? AND category_id = ? AND weight = ? AND unit = ? AND price = ? ";
// "Select product_name, brand_id, category_id, weight, unit, price from t_products WHERE product_name = ?, brand_id = ?, category_id = ?, weight = ?, unit = ?, price = ? ";

exports.putProduct =
  "UPDATE t_products SET product_name = ?, weight = ?, unit = ?, price = ? WHERE product_id = ?";
exports.deleteProduct = "Delete from t_products WHERE product_id = ";

//PAGINATION in Products
exports.getProductPagination = "SELECT * from t_products limit ";
exports.offset = " OFFSET ";

//Query Filtering
exports.getProductsByCategory = "SELECT * from t_products WHERE category_id =";

//Displaying Brand and category table to add a product
exports.getBrands = "SELECT * from t_brands";
exports.getCategory = "SELECT * from t_category";

// Displaying all Orders to admin
exports.getOrders =
  "SELECT t_products.product_name, t_users.user_fname, t_users.user_lname, t_user_address.short_address, t_user_address.city, t_user_address.pin_code, t_orders.quantity, t_orders.price from t_users inner join t_user_address on t_users.user_id = t_user_address.user_id inner join t_orders on t_orders.user_id = t_user_address.user_id inner join t_products on t_products.product_id = t_orders.product_id limit ";
