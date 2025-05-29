import { Injectable } from '@angular/core';
import { signUp, confirmSignUp } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async signUpWithEmail(email: string) {
    const { nextStep } = await signUp({
      username: email,
      options: {
        userAttributes: {
          email,
        },
      },
    });

    if (nextStep.signUpStep === 'DONE') {
      console.log('Sign up complete');
      return { status: 'DONE' };
    }

    if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
      console.log('Confirmation code sent to:', nextStep.codeDeliveryDetails.destination);
      return { status: 'CONFIRM_SIGN_UP' };
    }

    return { status: 'UNKNOWN' };
  }

  async confirmEmailSignUp(email: string, code: string) {
    const { nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });

    if (nextStep.signUpStep === 'DONE') {
      console.log('Sign up confirmed');
      return true;
    }

    return false;
  }
}
