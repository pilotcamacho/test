import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { UsuarioService } from './services/usuario.service';


Amplify.configure(outputs)


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, AmplifyAuthenticatorModule],
})
export class AppComponent {
  constructor(
    public authenticator: AuthenticatorService,
    private userSrv: UsuarioService
  ) {
    Amplify.configure(outputs);
    this.authenticator.subscribe((state) => {
      console.log('AppComponent::constructor.subscribe::state: ', state);
      this.userSrv.updateUser(state.authStatus);
    })
  }
}
