exports.postLogin =
  "select * from t_user_login where user_email = ? and user_password = ?";
exports.getUserEmail =
  "Select user_email FROM t_user_login WHERE user_email = ?";
exports.getMaxUserID = "SELECT MAX(user_id) AS LastID FROM t_users";
exports.postUserDetails =
  "INSERT INTO t_users (user_fname, user_lname, user_contact, user_email) VALUES('";
exports.postUserAddress =
  "INSERT INTO t_user_address (user_id, short_address, city, pin_code) VALUES(";
exports.postUserLogin =
  "INSERT INTO t_user_login (user_id, user_email, user_password) VALUES(";
exports.putUser =
  "UPDATE t_users SET user_fname = ?, user_lname = ?, user_contact = ?, user_email = ? ";
exports.putUserAddress =
  "UPDATE t_user_address SET short_address = ?, city = ?, pin_code = ? ";
exports.putUserLogin = "UPDATE t_user_login SET user_email = ? ";
exports.userID = " WHERE user_id = ";
exports.isActive = " AND is_active = 1";
exports.postOrderIdempotent =
  "select product_id, quantity, price, user_id from t_orders where product_id = ? AND quantity = ? AND price = ? AND user_id = ?";

exports.postOrder =
  "INSERT INTO t_orders SET product_id = ?, quantity = ?, price = ?, user_id = ?";

exports.getUserDetails =
  "SELECT t_users.user_id, t_users.user_fname, t_users.user_lname, t_users.user_contact, t_users.user_email, t_user_address.short_address, t_user_address.city, t_user_address.pin_code FROM t_users INNER JOIN t_user_address ON t_users.user_id = t_user_address.user_id WHERE t_users.user_id = ?";

exports.putUserDetailsCart =
  "UPDATE t_users SET user_fname = ?, user_lname = ?, user_contact = ? WHERE user_id = ";
exports.putUserAddressCart =
  "UPDATE t_user_address SET short_address = ?, pin_code = ?, city = ? WHERE user_id =";
exports.getUserOrdersbyID =
  "SELECT tp.product_name, tor.created_at, tb.brand_name, tc.category_name, tor.quantity, tor.order_id, tor.price FROM `t_orders` tor INNER JOIN t_products tp ON tor.product_id = tp.product_id INNER JOIN t_brands tb ON tb.brand_id = tp.brand_id INNER JOIN t_category tc ON tc.category_id = tp.category_id WHERE tor.is_active = 1 AND tor.user_id = ? limit ";
exports.deleteOrder = "delete from t_orders WHERE order_id = ";
