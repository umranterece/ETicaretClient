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

 
  constructor() {


  }
  

  ngOnInit(){
   
  } 
}

// $.get("https://localhost:7175/api/Products/GetAll",data =>{
//   console.log('data',data);
// })
