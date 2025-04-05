import { Component,OnInit } from '@angular/core';

import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private alertify:AlertifyService)
  {

  }

  ngOnInit(): void {
  }

  stop(){
    this.alertify.dismiss();
  }

  start(){
    this.alertify.message("Selam",{
      messageType:MessageType.Success,
      delay:3,
      dismissOther:false,
      positon:Position.TopLeft
    });

  }
}
