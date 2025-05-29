import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { signIn, confirmSignIn } from '@aws-amplify/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: true,
  imports: [IonicModule,
    IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SignInPage implements OnInit {
  emailForm: FormGroup;
  otpForm: FormGroup;
  showOtpInput = false;
  username: string = '';

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });
  }

  ngOnInit() {
  }


  async submitEmail() {
    this.username = this.emailForm.value.email;
    try {
      const { nextStep } = await signIn({
        username: this.username,
        options: {
          authFlowType: 'USER_AUTH',
          preferredChallenge: 'EMAIL_OTP',
        },
      });

      if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE') {
        this.showOtpInput = true;
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      // Show toast or alert here
    }
  }

  async submitOtp() {
    try {
      const { nextStep } = await confirmSignIn({
        challengeResponse: this.otpForm.value.otp,
      });

      if (nextStep.signInStep === 'DONE') {
        this.navCtrl.navigateRoot('/home');
      }
    } catch (error) {
      console.error('OTP confirmation error:', error);
      // Show toast or alert here
    }
  }
}
