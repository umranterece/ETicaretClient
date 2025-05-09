import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem("accessToken"),
        allowedDomains:["localhost:7175"]
      }
    }),
    SocialLoginModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
     {provide:"baseUrl",useValue:"https://localhost:7175/api", multi:true},
     {
      provide:"SocialAuthServiceConfig",
      useValue:{
        autoLogin:false,
        providers:[
          {
            id:GoogleLoginProvider.PROVIDER_ID,
            provider:new GoogleLoginProvider("585032283225-4mbeeh51siinulnl1a73ic5s7l5lmbt4.apps.googleusercontent.com")
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("546631843676576")
          }
        ],
        onerror:err=>console.log(err)
      } as SocialAuthServiceConfig
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
