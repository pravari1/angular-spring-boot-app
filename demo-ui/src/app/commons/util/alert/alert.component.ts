import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';
@Component({
  selector: 'app-alert',
  template: `
        <div class="row" *ngIf='isDismiss()'>
            <img class='dismiss-right' (click)='dismissAll()' src='assets/icon/dismiss_all.png' alt='Dismiss'>
        </div>
        <div *ngFor='let alert of alerts' class='{{ cssClass(alert) }} alert-dismissable'>
            {{alert.message}}
            <a class='close' (click)='removeAlert(alert)'>&times;</a>
        </div>

    ` ,
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: Alert[];
  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.alertService.getAlert().subscribe((alert: Alert) => {
          if (!alert) {
              // clear alerts when an empty alert is received
              this.alerts = [];
              return;
          }

          // add alert to array
          this.alerts.push(alert);
      });
  }

  removeAlert(alert: Alert) {
      this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
      if (!alert) {
          return;
      }
      switch (alert.type) {
          case AlertType.Success:
              return 'alert alert-success';
          case AlertType.Error:
              return 'alert alert-danger';
          case AlertType.Info:
              return 'alert alert-info';
          case AlertType.Warning:
              return 'alert alert-warning';
      }
  }

  isDismiss() {
      if (this.alerts && this.alerts.length > 1) {
        console.log('return true;');
        return true;
      }
      console.log('return false;');
      return false;
  }

  dismissAll() {
      this.alerts.length = 0;
  }

}
