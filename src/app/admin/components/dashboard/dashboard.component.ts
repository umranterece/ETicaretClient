import { Component,OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertify:AlertifyService,spinner:NgxSpinnerService)
  {
    super(spinner);
  }

  ngOnInit(): void {
      // this.showSpinner(SpinnerType.BallScaleMultiple);
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
