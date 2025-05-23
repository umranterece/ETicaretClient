import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contratcs/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrServive:CustomToastrService) {
    }

   async login(usernameOrEmail:string, password:string,callBackFunction?:()=>void):Promise<any>{
    const observable:Observable<any | TokenResponse>= this.httpClientService.post<any | TokenResponse>({
      controller:"auth",
      action:"login"
    },{
      usernameOrEmail, password
    });

    const tokenResponse:TokenResponse=  await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      // localStorage.setItem("expiration", token.expiration.toString());

      this.toastrServive.message("Kullanici girisi basariyla saglanmistir.", "Giris Basarili",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      })
    }

    callBackFunction();
  }

  async googleLogin(user:SocialUser,callBackFunction?:()=> void): Promise<any>{
    const observable:Observable<SocialUser | TokenResponse>= this.httpClientService.post<SocialUser | TokenResponse>({
      action:"google-login",
      controller:"auth"
    },user);

   const tokenResponse:TokenResponse=  await firstValueFrom(observable) as TokenResponse;
   if(tokenResponse){
    localStorage.setItem("accessToken",tokenResponse.token.accessToken);

    this.toastrServive.message("Google uzerinden giris basariyla yapilmistir.", "Giris Basarili",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRight
    })
   }
   callBackFunction();
  }

  async facebookLogin(user:SocialUser,callBackFunction?:()=> void):Promise<any>{
    const observable:Observable<SocialUser | TokenResponse>= this.httpClientService.post<SocialUser | TokenResponse>({
      controller:"auth",
      action:"facebook-login"
    },user);

    const tokenResponse:TokenResponse= await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
  
      this.toastrServive.message("Facebook uzerinden giris basariyla yapilmistir.", "Giris Basarili",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      })
     }
     callBackFunction();
  }
}
