import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contratcs/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { MatCard } from '@angular/material/card';
import { DialogService } from 'src/app/services/common/dialog/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $:any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(dialogRef:MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:SelectProductImageState | string,
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private dialog:DialogService
  ){
    super(dialogRef);
  }

  @Output() options: Partial<FileUploadOptions>={
    accept:".png, .jpg, .jpeg, .gif",
    action:"upload",
    controller:"products",
    explanation:"Urun resmini secin veya buraya surukleyin",
    isAdminPage:true,
    queryString:`id=${this.data}`
  };

  images:List_Product_Image[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom);
    this.images= await this.productService.readImages(this.data as string,()=>this.spinner.hide(SpinnerType.BallAtom));
  }

  async deleteImage(imageId:string,event:any){

    this.dialog.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed: async ()=>{
        this.spinner.show(SpinnerType.BallAtom);
        const card = $(event.target).closest('.product-image-card');
        await this.productService.deleteImage(this.data as string,imageId,()=>{
          this.spinner.hide(SpinnerType.BallAtom);
          card.fadeOut(500);
        });
      }
    });
  }
  
}

export enum SelectProductImageState{
  Close
}