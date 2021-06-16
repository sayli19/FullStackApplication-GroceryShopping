import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from 'angularx-social-login';
import {  GoogleLoginProvider } from "angularx-social-login";
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

users:SocialUser;
user:any
localName:any
products:any;
cart:  string[] = [];
addedIndex : string[]=[];
public show: number;
cartNumber:any
isLogin: boolean = false;
cartStorage:any;
cartFromStorage:any;
chatLink:any;
//pagination
pagCounter:number = 1;
GoogleLoginProvider = GoogleLoginProvider;
  constructor(private authService: SocialAuthService,
    private auth : AuthService,
    private router: Router, private httpService: HttpService) {
      this.user = this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit(): void {
    if(this.auth.getUserDetails() != null){
      this.isLogin = true;
      }

    if(this.auth.getUserPersonalDetails() != null){
      this.localName = this.auth.getUserPersonalDetails();
      }

    if(this.auth.getLink() != null){
        this.chatLink = this.auth.getLink();
      }

      
    this.getCartDetails();
    this.getAllProducts(this.pagCounter)
  }
  

  signOut(): void {
      this.authService.authState.subscribe(user => {
        this.user = user
      })
      this.authService.signOut();
  }

  logout():void{
    this.auth.clearStorage()
    window.location.reload();
    this.router.navigate(['/home']);
  }


  getAllProducts(pagc):void{
    this.httpService.getAllProducts(pagc)
    .subscribe(
      data => {
        this.products = data.products;
      },
      error => {
        console.log(error);
      });
  }


  addToCart(product, i):void{
    this.cart.push(product)
    this.cartNumber = this.cart.length 
    this.cartStorage = {
      "products" : this.cart,
      "items" : this.cart.length
    }

    this.auth.setCartDetails('cart', JSON.stringify(this.cartStorage));
    this.toggle(i);
    this.getCartDetails()
  }

  toggle(index) : void {
    if (this.show == index) {
        this.show = -1;
    }
    else {
      this.show = index;
    }
  }

  getCartDetails(){
      if(this.auth.getCartDetails() != null){
      this.cartFromStorage = this.auth.getCartDetails();
      this.cart = this.cartFromStorage.products
      this.cartNumber = this.cartFromStorage.items
      }
  }

  gotoCart() : void{
    this.router.navigateByUrl('/cart', { state: this.cart });
  }

  goToAdmin():void {
    this.router.navigateByUrl('/admin');
  }

  goToLogin(role):void{
    this.router.navigateByUrl('/login', { state: role });
  }

   //Pagination
   decrementPag():void{
    if(this.pagCounter > 1 ){
      --this.pagCounter;
      this.getAllProducts(this.pagCounter)
    }
  }

  incrementPag():void{
      ++this.pagCounter;
      this.getAllProducts(this.pagCounter)
  }

  //Query filtering
  loadCategory(cat : number, name):void{
    if(cat >= 1){
    this.httpService.loadByCategory(cat)
    .subscribe(
      data => {
        console.log(data)
        this.products = data;
      },
      error => {
        console.log(error);
      });
  }
  else{
    this.getAllProducts(this.pagCounter)
  }
}
}