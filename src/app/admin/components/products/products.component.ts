import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService, private httpClientService:HttpClientService)
  { 
    super(spinner); 
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);

    // LISTELEME
    // this.httpClientService.get({
    //   controller:"products"
    // }).subscribe(data=>console.log(data));


    // EKLEME 
    // this.httpClientService.post({
    //   controller:"products"
    // },{
    //   name:"Pensan",
    //   stock:100,
    //   price:120
    // }).subscribe(data=>console.log(data));

    // GUNCELLEME
    // this.httpClientService.put({
    //   controller:"products"
    // },{
    //   Id:"2a3fca6d-53cb-4335-8271-8052f0c5edf0",
    //   Name:"Pensen Ismi Guncellendi olan",
    //   Stock:101,
    //   Price:12
    // }).subscribe();

    // SILME
    // this.httpClientService.delete({
    //   controller:"products"
    // },"47521b3a-e80e-4a6d-b023-ed43eda6714f").subscribe();

    // this.httpClientService.get({
    //   fullEndPoint:"https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data=>console.log(data));

  }
}
