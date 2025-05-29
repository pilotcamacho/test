import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { UsuarioService } from './services/usuario.service';

import { getCurrentUser } from '@aws-amplify/auth';

Amplify.configure(outputs)


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, AmplifyAuthenticatorModule],
})
export class AppComponent implements OnInit {
  constructor(
    public authenticator: AuthenticatorService,
    private userSrv: UsuarioService,
    private navCtrl: NavController
  ) {
    Amplify.configure(outputs);
    this.authenticator.subscribe((state) => {
      console.log('AppComponent::constructor.subscribe::state: ', state);
      this.userSrv.updateUser(state.authStatus);
    })
  }

  async ngOnInit() {
    try {
      const user = await getCurrentUser();
      this.navCtrl.navigateRoot('/home');
    } catch {
      this.navCtrl.navigateRoot('/sign-in'); // or login
    }
  }
}
