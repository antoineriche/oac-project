import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import AlertMessage from 'src/app/model/alert-message';
import ClientError from 'src/app/model/error/client-error';

@Component({
  selector: 'app-my-alert',
  templateUrl: './my-alert.component.html',
  styleUrls: ['./my-alert.component.sass']
})
export class MyAlertComponent implements OnInit {

  @Input() error: any;
  @Input() alertType: string;
  private alertMessage: AlertMessage;
  private hidden: boolean;
  private timeoutCallback: any;

  constructor() {
  }

  ngOnInit(){
    this.hidden = true;
  }
  private showMessage(type: string, title: string, detail: string, timeout: number){
    this.alertMessage = new AlertMessage();
    this.alertMessage.timeout = timeout;
    this.alertMessage.type = type;
    this.alertMessage.title = title;
    this.alertMessage.detail = detail;
    this.displayMessage();
  }

  public showError(error: ClientError, timeout: number){
    this.showMessage("danger", error.cause, error.detail, timeout);
  }

  public showWarning(title: string, detail: string, timeout: number){
    this.showMessage("warning", title, detail, timeout);
  }

  public showSuccess(title: string, detail: string, timeout: number){
    this.showMessage("success", title, detail, timeout);
  }

  private displayMessage(){
    this.hidden = false;

    if(this.timeoutCallback){
      clearTimeout(this.timeoutCallback);
    }
    
    this.timeoutCallback = setTimeout(() => { 
       this.hidden = true;
       this.timeoutCallback = null;
    }, this.alertMessage.timeout);
  }

}
