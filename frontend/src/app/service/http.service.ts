import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

constructor(private http: HttpClient) { }

postAdminLogin(body): Observable<any> {

  return this.http.post('http://localhost:5000/admin/login/', body);
}
 
postProduct(data): Observable<any> {
  return this.http.post('http://localhost:5000/admin/products/', data);
}

 //Update
update(id, data): Observable<any> {
  return this.http.put('http://localhost:5000/admin/products/', data);
}

 //Delete
updateDeletedProduct(data): Observable<any> {
  let id = data.product_id;

  let url = 'http://localhost:5000/admin/products'
  return this.http.delete(`${url}/${id}`);
}

getAllProducts(page): Observable<any> {
  let baseUrl = 'http://localhost:5000/admin/products';
  let page1 = page;
  console.log(page1)
  return this.http.get(`${baseUrl}/${page1}`);
}

loadByCategory(id): Observable<any> {
  let baseUrl = 'http://localhost:5000/admin/category';
  let id1 = id;
  return this.http.get(`${baseUrl}/${id1}`);
}
 
getAllBrands(b): Observable<any> {
  return this.http.get('http://localhost:5000/admin/brands/');
}

getAllCategory(): Observable<any> {
  return this.http.get('http://localhost:5000/admin/category/');
}

getAllOrders(page): Observable<any> {
  return this.http.get(`http://localhost:5000/admin/orders/${page}`);
}

postTypeRequest(body): Observable<any> {
  return this.http.post('http://localhost:5000/user/login/', body);
}

postRegistration(body): Observable<any> {
  return this.http.post('http://localhost:5000/user/registration/', body);
}

editUserDetails(body): Observable<any> {
  return this.http.put('http://localhost:5000/user/details/', body);
}

getUserDetails(id): Observable<any> {
  let baseUrl = 'http://localhost:5000/user/details'
   return this.http.get(`${baseUrl}/${id}`);
}

placeOrder(data): Observable<any> {
  console.log("place order", data)
  return this.http.post('http://localhost:5000/user/orders/', data);
}

updateUserCart(body): Observable<any> {
  console.log("edit user in cart", body)
  return this.http.put('http://localhost:5000/user/cart/', body);
}

getOrderByID(id, page): Observable<any> {
  let baseUrl = 'http://localhost:5000/user/orders';
  return this.http.get(`${baseUrl}/${id}/${page}`);
}

deleteOrderByOrderId(body): Observable<any> {
  let baseurl = 'http://localhost:5000/user/orders'
  let id = body.orderid;
  return this.http.delete(`${baseurl}/${id}`);
}



}
