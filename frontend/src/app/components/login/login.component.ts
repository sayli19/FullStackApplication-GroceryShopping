import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AuthService } from 'src/app/service/auth.service';
import {NgForm} from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  isLogin: boolean = false;
  errorMessage;
  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;
  role : any = 'user';
  isReg : boolean = false;
  name;

  constructor(private authService: SocialAuthService, 
    private router: Router, 
    private auth : AuthService,
    private httpService: HttpService) {
      this.role = this.router.getCurrentNavigation().extras.state;
     }

  ngOnInit(): void {
    
    //local storage login
    this.isUserLogin();

    //Oauth
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => this.router.navigateByUrl('/home', { state: this.user }))

  }
  signOut(): void {
    this.authService.signOut();
  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }


  //local storage login

  onSubmit(form: NgForm) {
console.log(this.role)
    if(this.role=='user' || this.role==undefined){
      this.httpService.postTypeRequest(form.value).subscribe((res: any) => {
        if (res.data[0]) {
          console.log('data',res.data)
          console.log('body',res.body)
            this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
            this.auth.setDataInLocalStorage('userDetails', JSON.stringify(res.body));
            this.auth.setDataInLocalStorage('token', res.token);
            this.auth.setDataInLocalStorage('link', JSON.stringify(res.link.href));
            this.router.navigate(['/home']);
         } else {
        }
        }, err => {
        this.errorMessage = err['error'].message;
        });
    }else{
      this.httpService.postAdminLogin(form.value).subscribe((res: any) => {

       this.router.navigate(['/admin']);
        }, err => {
        this.errorMessage = err['error'].message;
        });
    }
    


    }

    //Registration
     onSubmitRegistration(form1: NgForm) {  	
      this.httpService.postRegistration(form1.value).subscribe((res: any) => {
      if (res.status) {
        alert(res.message);
      this.isReg = !this.isReg;

      } else {
      console.log(res.message)
      alert(res.message);
      }
      }, err => {
      this.errorMessage = err['error'].message;
      });
    }

    isUserLogin(){
      if(this.auth.getUserDetails() != null){
      this.isLogin = true;
      }
    }

    logout(){
      this.auth.clearStorage()
      this.router.navigate(['']);
      }

      showReg(){
        this.isReg = !this.isReg;
      }

}
