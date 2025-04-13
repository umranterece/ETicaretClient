import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contratcs/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private productService:ProductService, private alertify:AlertifyService){
    super(spinner);
  }

  ngOnInit(): void {
    
  }

  create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);
    const create_product:Create_Product=new Create_Product();
    create_product.name=name.value;
    create_product.stock=parseInt(stock.value);
    create_product.price=parseFloat(price.value);

    if(!name.value){
      this.alertify.message("Urun adini giriniz",{
        dismissOther:true,
        messageType:MessageType.Warning,
        positon:Position.TopRight
      })
      return;
    }

    if(parseInt(stock.value)<0){
      this.alertify.message("stok bilgisini giriniz",{
        dismissOther:true,
        messageType:MessageType.Warning,
        positon:Position.TopRight
      })
      return;
    }

    if(parseFloat(price.value)<0){
      this.alertify.message("fiyat bilgisini giriniz",{
        dismissOther:true,
        messageType:MessageType.Warning,
        positon:Position.TopRight
      })
      return;
    }


    if(!name.value){
      this.alertify.message("Urun adini giriniz",{
        dismissOther:true,
        messageType:MessageType.Warning,
        positon:Position.TopRight
      })
      return;
    }



    this.productService.create(create_product,()=> {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Urun basariyla eklenmistir",{
        dismissOther:true,
        messageType:MessageType.Success,
        positon:Position.TopRight
      })
    },errorMessage=>{
      this.alertify.message(errorMessage,
        {
          dismissOther:true,
          messageType: MessageType.Error,
          positon: Position.TopRight
        });
    });
  }

}
