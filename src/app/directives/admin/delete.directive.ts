import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $:any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective  {

  constructor(private element:ElementRef, 
    private _renderer:Renderer2,
    private httpClientService:HttpClientService,
    private spinner:NgxSpinnerService,
    public dialog:MatDialog,
    private alertifyService:AlertifyService,
    private dialogService:DialogService) { 


      const img = this._renderer.createElement('img');
      img.setAttribute("src","assets/delete.png");
      img.setAttribute("style","cursor:pointer");
      img.width=25;
      img.height=25;
      _renderer.appendChild(element.nativeElement,img);
     
    }

    @Input() id:string;
    @Input() controller:string;
    @Output() callback:EventEmitter<any> =new EventEmitter;

    @HostListener("click")
    async onclick(){
      this.dialogService.openDialog({
        componentType:DeleteDialogComponent,
        data:DeleteState.Yes,
        afterClosed:async ()=>{
          this.spinner.show(SpinnerType.BallAtom);
          console.log(this.id);
          const td:HTMLTableCellElement=this.element.nativeElement;
          // await this.productService.delete(this.id);
          this.httpClientService.delete({
            controller:this.controller
          },this.id).subscribe(data =>{
            $(td.parentElement).animate({
              opacity:0,
              left:"+=50",
              height:"toggle"
            },500,()=>{
              this.callback.emit();
              this.alertifyService.message("Urun basariyla silinmistir.",{
                dismissOther:true,
                messageType:MessageType.Success,
                positon:Position.TopRight
              });
            });
          },(errorResponse:HttpErrorResponse)=>{
            this.spinner.hide(SpinnerType.BallAtom);
  
            this.alertifyService.message("Islem gerceklesirken hata olustu.",{
              dismissOther:true,
              messageType:MessageType.Error,
              positon:Position.TopRight
            });
  
          });
        }
      })
    }

    // openDialog(afterClosed:any): void {
    //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
    //     width:"250px",
    //     data: DeleteState.Yes,
    //   });
  
    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result == DeleteState.Yes) {
    //       console.log('The dialog was closed');
    //       afterClosed();
    //     }
    //   });
    // }
    

}