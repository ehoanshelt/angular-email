import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm = new FormGroup({
    username: new FormControl('',[
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })

  constructor(
    private authService : AuthService,
    private router : Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.signinForm.invalid){
      return;
    }

    this.authService.signin(this.signinForm.value).subscribe({
     next: (val) => {
       this.router.navigateByUrl('/inbox');
     },
     error: (err) => {
       if(err.error.password || err.error.username){
         this.signinForm.setErrors({ wrongCreds: true });
       }
     }
    })
  }

}
