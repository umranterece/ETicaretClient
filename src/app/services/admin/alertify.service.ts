import { Injectable } from '@angular/core';

declare var alertify:any;


@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  // message(message:string,messageType:MessageType,position:Position, delay:number, dismissOthers:boolean=false){
  message(message:string,options:Partial<AlertifyOptions>){
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position',options.positon);
    const msg=alertify[options.messageType](message);
    if(options.dismissOther)
      msg.dismissOthers();
  }

  dismiss(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  messageType:MessageType=MessageType.Message;
  positon:Position=Position.BottomLeft;
  delay: number=3;
  dismissOther:boolean=false;;
  

}

export enum MessageType{
  Error="error",
  Message="message",
  Notify="notify",
  Success="success",
  Warning="warning"
}

export enum Position{
  TopCenter="top-center",
  TopRight="top-right",
  TopLeft="top-left",
  BottomRight="bottom-right",
  BottomCenter="bottom-center",
  BottomLeft="bottom-left"
}


