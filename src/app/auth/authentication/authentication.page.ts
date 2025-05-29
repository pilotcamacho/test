import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import {  } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AuthenticationPage implements OnInit {

  authState: 'SIGNED_OUT' | 'SIGNED_UP_NOT_CONFIRMED' | 'SIGNED_UP_CONFIRMED' | 'SIGNED_IN_NOT_CONFIRMED' | 'SIGNED_IN_CONFIRMED' = 'SIGNED_OUT'

  emailForm: FormGroup;
  otpForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
    });
  }

  ngOnInit() {
  }

  async sendEmail() {
    console.log('AuthenticationPage:::sendEmail()');

    if (this.authState === 'SIGNED_OUT') {
      return this.signUp();
    }
    if (this.authState === 'SIGNED_UP_CONFIRMED') {
      return this.signIn();
    }
  }

  async confirm() {
    console.log('AuthenticationPage:::confirm()');

    if (this.authState === 'SIGNED_UP_NOT_CONFIRMED') {
      return this.confirmSignUp();
    }
    if (this.authState === 'SIGNED_IN_NOT_CONFIRMED') {
      return this.confirmSignIn();
    }
  }

  async signUp() {
    console.log('AuthenticationPage:::signUp()');

    const result = await this.auth.signUpWithEmail(this.emailForm.value.email);
    if (result.status === 'CONFIRM_SIGN_UP') {
      this.authState = 'SIGNED_UP_NOT_CONFIRMED';
      this.signIn()

    } else if (result.status === 'USER_ALREADY_EXISTS') {
      this.signIn()
      // this.authState = 'SIGNED_IN_NOT_CONFIRMED';

    } else if (result.status === 'DONE') {
      this.authState = 'SIGNED_UP_CONFIRMED';
    }
  }

  async confirmSignUp() {
    console.log('AuthenticationPage:::confirmSignUp()');

    const success = await this.auth.confirmEmailSignUp(this.emailForm.value.email, this.otpForm.value.code);
    if (success) {
      this.authState = 'SIGNED_UP_CONFIRMED';
    }
  }

  async signIn() {
    console.log('AuthenticationPage:::signIn()');

    try {
      const result = await this.auth.signInWithEmail(this.emailForm.value.email);

      if (result.status === 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE') {
        this.authState = 'SIGNED_IN_NOT_CONFIRMED';

      } else if (result.status === 'DONE') {
        this.authState = 'SIGNED_IN_CONFIRMED';
        this.navCtrl.navigateRoot('/home');

      } else {
        console.warn('Unknown sign-in status');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  }

  async confirmSignIn() {
    console.log('AuthenticationPage:::confirmSignIn()');
    try {
      const success = await this.auth.confirmEmailSignIn(this.otpForm.value.otp);

      if (success) {
        this.navCtrl.navigateRoot('/home');
      } else {
        console.warn('Confirmation failed');
      }
    } catch (error) {
      console.error('OTP confirmation error:', error);
    }
  }
}