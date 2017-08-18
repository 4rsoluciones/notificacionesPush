# NOTIFICACIONES PUSH PARA IONIC 2

Para utilizar la librería se deben efectuar los siguientes pasos:

- Instalar el plugin phonegap-plugin-push:

```
ionic cordova plugin add phonegap-plugin-push --variable SENDER_ID=XXXXXXXXX
npm install --save @ionic-native/push
```

- Incluir las librerías en la declaración del módulo app:

/app/app.module.ts
```
import {PushFactory} from "@4r/notificacionesPush/push";
import {Push} from "@ionic-native/push";

@NgModule({
	...
    providers: [
		PushFactory,
		Push,
    ]
	...
})
```

- Crear una instancia de la clase en el constructor de la clase MyApp

/app/app.component.ts
```
import {BasicAuthenticatorInterceptor} from "basic-authenticator";
export class MyApp {
    constructor(private push: PushFactory) {
	
		push.init({
			'android': {
			  'senderID': "XXXXXXXXXX"
			},
			'ios': {
			  'alert': "true",
			  'badge': "false",
			  'sound': "true"
			}
		  },() => { return Promise.resolve() });
	  
  }
}
```


- En caso de necesitar modificar el evento onNotification, utilizar el siguiente método:

```
push.setOnNotification(myCustomFunction);
```
