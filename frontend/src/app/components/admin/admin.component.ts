import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {  ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products:any;
  filteredProducts:any
  prdName = "All Products";
  productName:any;

  pName:any;
  pImg:any;
  brandId:any;
  cID:any;
  pweight:any;
  pUnit:any;
  pprice:any;

  addProd : boolean;
  brand:any;
  category:any

//pagination
  pagCounter:number = 1;
  orderCounter:number = 1;
listLength;
// orders
  allOrders:any

  @ViewChild('defaultOpen',  {static: true}) defaultOpen: ElementRef;
  constructor(private httpService: HttpService) {
    this.addProd =false;
   }

  ngOnInit(): void {
    this.getAllProducts(this.pagCounter)
    this.getAllOrders(this.orderCounter)
  }


  getAllProducts(pagCounter):void{
    this.httpService.getAllProducts(pagCounter)
    .subscribe(
      data => {
        this.products = data.products;
        this.filteredProducts = this.products.filter(x=>{
          return x.is_active == 1;
         })
      },
      error => {
        console.log("Oh ho server down");
      });
  }

  getAllOrders(page): void{
    this.httpService.getAllOrders(page)
    .subscribe(
      data => {
        console.log(data)
        this.allOrders = data.orders;
      },
      error => {
        console.log(error);
      });
  }

 openCity(event:Event, cityName): void {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(cityName).style.display = "block";
  }



  loadCategory(cat : number, name):void{
    this.addProd =false;
    this.prdName = name;

      if(cat >= 1){
        this.httpService.loadByCategory(cat)
        .subscribe(
          data => {
            console.log(data)
            this.filteredProducts = data;
          },
          error => {
            console.log(error);
          });
      }else{
        this.getAllProducts(this.pagCounter)
      }
  }



  updateProduct(product,i:number):void{
    if(this.filteredProducts[i].product_id == product.product_id){
      this.httpService.update(product.product_id, product)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    }
  }


  deleteProduct(product,i:number):void{
    if(this.filteredProducts[i].product_id == product.product_id){
      this.httpService.updateDeletedProduct(product)
      .subscribe(
        response => {
        },
        error => {
          console.log(error);
        });
    }
  }

  createProduct(){
    console.log(this.pName,
      this.pImg,
      this.brandId,
      this.cID,
      this.pweight,
      this.pUnit)

      let product = {
          "product_name" : this.pName,
          "brand_id" : this.brandId,
          "category_id" : this.cID,
          "weight" : this.pweight,
          "unit" : this.pUnit,
          "price" : this.pprice,
          "product_img" : this.pImg
      }

      this.httpService.postProduct(product)
      .subscribe(
        response => {
          console.log(response)
          if(response.status == 1){
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
          }else{
            var x = document.getElementById("snackbar1");
          x.className = "show";
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
          }
        },
        error => {
          var x = document.getElementById("snackbar1");
          x.className = "show";
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        });
  }

  //FETCH BRAND & CATEGORY TABLE

  addProduct():void{
    this.addProd = true;
    this.getBrands()
    this.getCategory()
  }

  getBrands():void{
    let b;
    this.httpService.getAllBrands(b)
    .subscribe(
      data => {
        this.brand = data;
      },
      error => {
        console.log(error);
      });
  }
  getCategory():void{
    this.httpService.getAllCategory()
    .subscribe(
      data => {
        this.category = data;
      },
      error => {
        console.log(error);
      });
  }


  //Pagination - products
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

    //Pagination - orders
    decrementOrder():void{
      if(this.orderCounter > 1 ){
        --this.orderCounter;
        this.getAllOrders(this.orderCounter)
      }
    }
  
    incrementOrder():void{
        ++this.orderCounter;
        this.getAllOrders(this.orderCounter)
    }
 
}
