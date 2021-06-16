import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth.service';
import {FormsModule} from '@angular/forms'
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
counter:number = 1;
cart:any;
grandTotal:number;
indexF:number;
quantity:any;
sum:number=0;
tax:number=0;
cartFromStorage:any;
cartNumber:any;
cartStorage:any;
userid;
userdetails:any;
userPersonalDetails:any;


//table personal details
fname:any;
lname:any;
contact:any;
street:any;
city:any;
pin:any;
  constructor(private router: Router,private httpService: HttpService,private auth : AuthService,) {
    this.counter = 1;
    //this.cart = this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit(): void {
    this.getCartDetails();
    if(this.auth.getUserPersonalDetails() != null){
      this.userdetails= this.auth.getUserDetails();
      this.userid = this.userdetails[0].user_id;
      }
    this.getUserContactDetails();
  
  }

  getUserContactDetails(){
    this.httpService.getUserDetails(this.userid)
    .subscribe(
      data => {
        this.userPersonalDetails = data[0];

      },
      error => {
        console.log(error);
      });
  }

  getCartDetails(){
    if(this.auth.getCartDetails() != null){
      this.cartFromStorage = this.auth.getCartDetails();
      this.cart = this.cartFromStorage.products
      this.cartNumber = this.cartFromStorage.items
      this.cart.forEach(i => {
        i.total = i.quantity * i.price
      });
      this.checkOut()
    }
}

  addItem(product,i:number){
  if(this.cart[i].product_id == product.product_id){
  this.cart[i].quantity ++;
  this.cart[i].total = this.cart[i].quantity * this.cart[i].price
    }
    this.checkOut()
  }

  deleteItem(product,i:number){
    if(this.cart[i].product_id == product.product_id){
      if(this.cart[i].quantity > 1){
        this.cart[i].quantity --;
        this.cart[i].total = this.cart[i].quantity * this.cart[i].price
      }
    }
    this.checkOut()
  }

  checkOut():void{
    this.sum = 0;
    this.cart.forEach(element => {
      this.sum = this.sum + element.total
    });
    this.tax = 0.03 * this.sum;
    this.cartStorage = {
      "products" : this.cart,
      "items" : this.cart.length
    }
    this.auth.setCartDetails('cart', JSON.stringify(this.cartStorage));
  }
  
  removeItem(product,i:number) : void{
    if(this.cart[i].product_id == product.product_id){
    this.cart.splice(i,1);
    this.cartStorage = {
      "products" : this.cart,
      "items" : this.cart.length
    }
    this.auth.setCartDetails('cart', JSON.stringify(this.cartStorage));
    }
    this.checkOut()
  }

  

  postInOrders(){
    if(this.auth.getCartDetails() != null){
      let body = {
        'userid' : this.userid,
        'products' : this.cart
      }

      this.httpService.placeOrder(body)
      .subscribe((data) => {
        console.log(data)
        if(data){
         
          this.updateUserinCart(this.userPersonalDetails)
         
        }else{
          console.log("already added")
        }
        
        },
        error => {
          console.log(error);
        });
    }else{
      console.log("add items in cart first")
    }
        
  }


  updateUserinCart(user):void{
      this.httpService.updateUserCart(user)
      .subscribe((data) => {
        if(data){
          this.auth.clearCart();
          this.router.navigate(['/home']);
        }
        },
        error => {
          console.log(error);
        });
  }




}
