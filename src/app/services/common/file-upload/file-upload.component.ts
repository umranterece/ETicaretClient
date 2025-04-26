import { Component, Input } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService:DialogService 
  ) { }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;
  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService .openDialog({
      componentType:FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed:()=>{
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {
    
          const message: string = "Dosyalar basariyla yuklenmistir";
          if (this.options.isAdminPage) {
            //admin sayfasinda islem yapilacaksa
            this.alertifyService.message(message, {
              dismissOther: true,
              messageType: MessageType.Success,
              positon: Position.TopRight
            })
          }
          else {
            //user sayfasinda islem yapilacaksa
            this.customToastrService.message(message, "Basarili", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            });
          }
        }, (errorResponse: HttpErrorResponse) => {
    
          const message: string = "Dosyalar yuklenirken hata olustu";
          if (this.options.isAdminPage) {
            //admin sayfasinda islem yapilacaksa
            this.alertifyService.message(message, {
              dismissOther: true,
              messageType: MessageType.Error,
              positon: Position.TopRight
            })
          }
          else {
            //user sayfasinda islem yapilacaksa
            this.customToastrService.message(message, "Hata!", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            });
          }
        });
      }
    });

    

  }

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent , {
  //     width: "250px",
  //     data: FileUploadDialogState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == FileUploadDialogState .Yes) {
  //       console.log('The dialog was closed');
  //       afterClosed();
  //     }
  //   });
  // } 

}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;

}
