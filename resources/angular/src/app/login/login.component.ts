import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { faSpinner, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faSpinner = faSpinner;
  faCancel = faClose;

  // Variables
  form: FormGroup;
  loading: boolean;
  errors: boolean;
  passwordInvalid: boolean;
  usernameInvalid: boolean;
  
  constructor(
    fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) {
    this.passwordInvalid = false;
    this.usernameInvalid = false;
    this.loading = false;
    this.errors = false;
    this.form = fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }

  ngOnInit(): void { }

  /**
   * Login the user based on the form values
   */
  login(): void {
    this.loading = true;
    this.errors = false;
    this.passwordInvalid = false;
    this.usernameInvalid = false;

    if (this.controls['email'].value.trim() === '') {
      this.loading = false;
      this.usernameInvalid = true;
      this.errors = true;
    }

    if (this.controls['password'].value.trim() === '') {
      this.loading = false;
      this.passwordInvalid = true;
      this.errors = true;
    }

    if (this.errors) {
      return;
    }

    this.errors = false;
    this.authService.login(this.controls['email'].value, this.controls['password'].value)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.access_token);
        this.loading = false;
        this.router.navigate(['/']);
      }, (err: any) => {
        this.loading = false;
        this.errors = true;
      });
  }

  /**
   * Getter for the form controls
   */
  get controls() {
    return this.form.controls;
  }

}