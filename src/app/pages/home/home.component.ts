
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  studentSubjects = [  
    { value: 'matematicas', name: 'Matemáticas' },
    { value: 'ingles', name: 'Inglés' }
  ];
  reactForm: FormGroup;

  constructor(private formBuilder: FormBuilder ) {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'surname': new FormControl('', [FormValidators.required]),
      'email': new FormControl('', [FormValidators.email]),
      'date': new FormControl('', [FormValidators.date]),
      'subjects': formBuilder.array(this.addCheckboxes())
    });
  }
  
  private addCheckboxes(): string[] {
    let names: string[] = [];
    this.studentSubjects.forEach((o) => {
      names.push(o.value);
    });
    return names;
  }


  ngOnInit(): void {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId')?.addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          let subjectsChecked: string[] = []
          this.reactForm.value.subjects.map((el: boolean, index: number) => {
            if (el === true) {
              subjectsChecked.push(this.studentSubjects[index].value);
            }
          });
          this.reactForm.value.subjects = [];
          this.reactForm.value.subjects.push(subjectsChecked);
          alert('Alumno registrado!');
          this.reactForm.reset();
        } else {
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
  get subjects() { return this.reactForm.get("subjects") as FormArray; }



  submit() {
    const selectedValues: string[] = this.reactForm.value.subjects
      .map((value: any, i: number) => value ? this.studentSubjects[i].value : null)
      .filter((value: null) => value !== null);
    console.log('selectedValues', selectedValues);
  }

}
