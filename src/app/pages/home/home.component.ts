// import { FormBuilder } from '@angular/forms';
// import { Validators } from '@angular/forms';
// import { FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  reactForm: FormGroup;

  constructor() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'surname': new FormControl('', [FormValidators.required]),
      'email': new FormControl('', [FormValidators.email]),
      'date': new FormControl('', [FormValidators.date])
    });
  }

  ngOnInit(): void {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId')?.addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          alert('Customer details added!');
          this.reactForm.reset();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control?.markAsTouched({ onlySelf: true });
          });
        }
      });
  }

  get name() { return this.reactForm.get('name'); }
  get surname() { return this.reactForm.get('surname'); }
  get email() { return this.reactForm.get('email'); }
  get date() { return this.reactForm.get('date'); }

}
