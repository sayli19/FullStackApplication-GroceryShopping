import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { CartComponent } from './components/cart/cart.component';
import {FormsModule} from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CartComponent,
    AdminComponent,
    UserComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '738880354117-koo6e5v65hl30vl0e7fgjc742chh7r9q.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
