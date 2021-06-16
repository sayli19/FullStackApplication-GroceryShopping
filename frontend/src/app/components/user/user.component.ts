import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import {FormsModule} from '@angular/forms'
import { HttpService } from 'src/app/service/http.service';
import {NgForm} from '@angular/forms';
import {  ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
user:any;
userid;
userStorage:any
allOrders:any;
//pagination
pagCounter:number = 1;
@ViewChild('defaultOpen',  {static: true}) defaultOpen: ElementRef;
  constructor(private httpService: HttpService,private auth : AuthService) { }

  ngOnInit(): void {
    if(this.auth.getUserPersonalDetails() != null){
      this.userStorage= this.auth.getUserDetails();
      this.userid = this.userStorage[0].user_id;
      }
      this.getUserContactDetails();
    
  }

  openTab(event:Event, cityName): void {
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

  //Get user by id
  getUserContactDetails(){
    this.httpService.getUserDetails(this.userid)
    .subscribe(
      data => {
        this.user = data[0];
        this.getOrderByID(this.userid, this.pagCounter);
      },
      error => {
        console.log(error);
      });
  }

  //edit user
  onSubmit(form: NgForm){
    this.httpService.editUserDetails(form.value)
    .subscribe( data => {
        if(data){
          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
      },
      error => {
        console.log(error);
      });
  }

  //get all orders
  getOrderByID(userid, page): void{
    this.httpService.getOrderByID(userid, page)
    .subscribe(
      data => {
        console.log(data)
        this.allOrders = data.products;
      },
      error => {
        console.log(error);
      });
  }


  // delete order by id
  deleteOrder(orderid): void{
    let body = {
      'orderid' :  orderid,
      'userid' : this.userid
    }
    this.httpService.deleteOrderByOrderId(body)
    .subscribe(
      data => {
        window.location.reload();
        
        
      },
      error => {
        console.log(error);
      });
  }

//pagination
   //Pagination
   decrementPag():void{
    if(this.pagCounter > 1 ){
      --this.pagCounter;
      this.getOrderByID(this.userid, this.pagCounter)
    }
  }

  incrementPag():void{
      ++this.pagCounter;
      this.getOrderByID(this.userid, this.pagCounter)
  }


}
