import { Component, OnInit } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
declare var $:any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ETicaretClient';
 
  constructor(public authService:AuthService,
    private toastrService:CustomToastrService,
    private router:Router
  ) {
    authService.identityCheck();

  }
  
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
  
    this.toastrService.message("Oturum kapatilmistir","Oturum Kapatildi",{
      position:ToastrPosition.TopRight,
      messageType:ToastrMessageType.Warning
    });
    this.router.navigate[""];
  }
  ngOnInit(){
   
  } 
}

// $.get("https://localhost:7175/api/Products/GetAll",data =>{
//   console.log('data',data);
// })
