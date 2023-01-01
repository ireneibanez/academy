
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public reactForm: FormGroup;
  public dateValue: Date = new Date();
  public minDate: Date = new Date();
  public studentSubjects = [
    { value: 'matematicas', name: 'Matemáticas' },
    { value: 'ingles', name: 'Inglés' }
  ];
  public genders: string[] = ['Hombre', 'Mujer'];
  private genderSelectedByUser: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'surname': new FormControl('', [FormValidators.required]),
      'gender': new FormControl('', [FormValidators.required]),
      'email': new FormControl('', [FormValidators.email]),
      'date': new FormControl('', [FormValidators.date]),
      'subjects': this.formBuilder.array(this.addCheckboxes())
    });
  }

  @ViewChild('dropdownlistlelement')
  public dropDownListObject!: DropDownListComponent;

  ngOnInit(): void {
    this.reactForm.reset();
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
          this.userService.setNewUser(this.reactForm.value);
          alert('Alumno registrado!');
          console.log('values', this.reactForm.value);
          this.router.navigate(['/dashboard']);
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
  get gender() { return this.reactForm.get('genders') }
  get email() { return this.reactForm.get('email'); }
  get date() { return this.reactForm.get('date'); }
  get subjects() { return this.reactForm.get("subjects") as FormArray; }


  submit() {
    this.reactForm.value.subjects
      .map((value: any, i: number) => value ? this.studentSubjects[i].value : null)
      .filter((value: null) => value !== null);
  }

  private addCheckboxes(): string[] {
    let names: string[] = [];
    this.studentSubjects.forEach((o) => {
      names.push(o.value);
    });
    return names;
  }

  private setGenderInDropdown() {
    const name: string = this.reactForm?.value?.name;
    this.userService.setGender(name).subscribe((response) => {
      if (response.probability === 0) {
        this.reactForm.controls['gender'].patchValue(null);
      } else {
        if (response.gender === 'female') {
          this.reactForm.controls['gender'].setValue('Mujer');
        } else {
          this.reactForm.controls['gender'].setValue('Hombre');
        }
      }
    });
  }

  onFocusOutEvent(event: any) {
    if (!this.genderSelectedByUser) {
      this.setGenderInDropdown();
    }
  }

  onChange(args?: any): void {
    if (args.isInteracted) {
      this.genderSelectedByUser = args.value;
    }
  }
}
