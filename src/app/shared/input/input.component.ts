import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() control: any;
  @Input() label?:string;
  @Input() inputType:string = "";

  constructor() { }

  ngOnInit(): void {
  }

  showErrors(){
    const { errors, touched, dirty } = this.control;
    return errors && touched && dirty;
  }

}
