
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

import {User} from './grid/grid.component';
import {UserService} from './data/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      age:[null,[Validators.required, Validators.max(100),Validators.min(18)]],
    });
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      // console.log('Hrereerer-----');
      console.log('Hrereerer-----');
      var user: User = {
        firstName: this.form.controls['firstName'].value,
        lastName: this.form.controls['lastName'].value,
        email: this.form.controls['email'].value,
        age:this.form.controls['age'].value,
      };
      console.log('Hrereerer-----'+user);
      this.userService.addUser(user);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      // if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      // }
    });
  }

  reset(){
    this.form.reset();
  }
}
