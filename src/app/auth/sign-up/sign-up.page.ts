import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [
    IonicModule, CommonModule, FormsModule]
})
export class SignUpPage implements OnInit {

  email = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async signUp() {
    const result = await this.auth.signUpWithEmail(this.email);
    if (result.status === 'CONFIRM_SIGN_UP') {
      this.router.navigate(['/confirm'], { state: { email: this.email } });
    } else if (result.status === 'DONE') {
      this.router.navigate(['/home']);
    }
  }
}
