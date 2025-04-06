import { Component, OnInit } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ETicaretClient';

 
  constructor(private toastrService:CustomToastrService, private spinner:NgxSpinnerService) {
  //  toastrService.message("Merhaba","Baslik",{
  //   messageType:ToastrMessageType.Success,
  //   position:ToastrPosition.BottomLeft
  //  });

  }
  

  ngOnInit(){
    // this.spinner.show('s3');

    // setTimeout(()=>{
    //   this.spinner.hide('s3');
    // },5000);
  } 
}
