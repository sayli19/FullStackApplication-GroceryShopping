import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserDetails() {
    return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
  }

  setDataInLocalStorage(variableName, data) {
    localStorage.setItem(variableName, data);
  }

  getUserPersonalDetails() {
    return localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : null;
  }

  setCartDetails(variableName, data){
    localStorage.setItem(variableName, data);
  }

  getCartDetails(){
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
  }

  getLink(){
    return localStorage.getItem('link') ? JSON.parse(localStorage.getItem('link')) : null;
  }
  


  getToken() {
    return localStorage.getItem('token');
  }

  clearCart() {
    return localStorage.removeItem('cart');
  }

  clearStorage() {
    localStorage.clear();
  }
}
