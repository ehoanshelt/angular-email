import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../email';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  @Input() email: Email;
  emailForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
   const {subject, to, from, text} = this.email;

   this.emailForm = new FormGroup({
     subject: new FormControl(subject, 
      [
        Validators.required,
      ]),
     to: new FormControl(to,[
      Validators.required,
      Validators.email
    ]),
     from: new FormControl({ value: from, disabled: true}),
     text: new FormControl(text, 
      [
      Validators.required,
    ]),
   });
  }

}
