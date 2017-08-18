
import {Push, PushOptions, PushObject} from "@ionic-native/push";
import {Injectable} from "@angular/core";
import {AlertController, Alert, Platform} from "ionic-angular";

@Injectable()
export class PushFactory {

  alert: Alert;
  pushObject: PushObject;

  constructor(private push: Push, private alertCtrl: AlertController, private platform: Platform ){}

  init(config: PushOptions, registerPush: any){
    this.pushObject = this.push.init(config);

    this.pushObject.on('notification').subscribe((notification: any) => {
      console.log('[Push Notification] Notification received', notification);

      if (this.alert)
        this.alert.dismiss();

      this.alert = this.alertCtrl.create({
        title: notification.title,
        subTitle: notification.message,
        buttons: ['OK']
      });

      this.alert.present();
    });

    this.pushObject.on('registration').subscribe((registration: any) => {
      console.log('[Push Notification] Register OK', registration);

      if (registration.registrationId) {
        window.localStorage['pushId'] = registration.registrationId;
        if (this.platform.is('android'))
          window.localStorage['deviceType'] = 'device_type.android.gcm';
        if (this.platform.is('ios'))
          window.localStorage['deviceType'] = 'device_type.apple.apn';

        registerPush({
          'type': window.localStorage['deviceType'],
          'code': window.localStorage['pushId'],
        }).then(() => console.log("[Web Service] Register Notification OK"))
          .catch(error => console.log("[Web Service] Register Notification ERROR", error))
      }
    });

    this.pushObject.on('error').subscribe(error => {
      console.log('[Push Notification] Error', error)
    });
  }

  setOnNotification(customFunction: any){
    this.pushObject.on('notification').subscribe(customFunction);
  }

  //TODO: funcion para desregistrarse (al hacer logout o no querer recibir mas notificaciones)


}



