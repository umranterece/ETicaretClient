import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  
  constructor(public dialogRef:MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DeleteState,){
    
  }
  
  close():void{
    this.dialogRef.close();
  }
 
}

export enum DeleteState{
  Yes,
  No
}

