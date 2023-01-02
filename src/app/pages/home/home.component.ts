import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { ToastUtility } from '@syncfusion/ej2-angular-notifications';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('element') element: any
  @ViewChild('dropdownlistlelement')

  public dropDownListObject!: DropDownListComponent;
  public position = { X: 'Right' };
  public userForm: FormGroup;
  public dateValue: Date = new Date();
  public minDate: Date = new Date();
  public studentSubjects = [
    { value: 'Matemáticas', name: 'Matemáticas' },
    { value: 'Inglés', name: 'Inglés' }
  ];
  public genders: string[] = ['Hombre', 'Mujer'];
  private genderSelectedByUser: string = '';
  public toastObj!: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'surname': new FormControl('', [FormValidators.required]),
      'gender': new FormControl('', [FormValidators.required]),
      'email': new FormControl('', [FormValidators.email]),
      'date': new FormControl('', [FormValidators.date]),
      'subjects': this.formBuilder.array(this.addCheckboxes())
    });
  }

  ngOnInit(): void {
    this.userForm.reset();
    this.userService.userSubject.subscribe({
      next: () => this.successToast(),
      error: () => this.dangerToast()
    });
  }

  ngOnDestroy(): void {
    this.userService.userSubject.unsubscribe();
  }

  get name() { return this.userForm.get('name'); }
  get surname() { return this.userForm.get('surname'); }
  get gender() { return this.userForm.get('genders') }
  get email() { return this.userForm.get('email'); }
  get date() { return this.userForm.get('date'); }
  get subjects() { return this.userForm.get("subjects") as FormArray; }


  public onFocusOutEvent(event: any) {
    if (!this.genderSelectedByUser) {
      this.setGenderInDropdown();
    }
  }

  public onChange(args?: any): void {
    if (args.isInteracted) {
      this.genderSelectedByUser = args.value;
    }
  }

  public submitForm(): void {
    this.userForm.value.subjects
      .map((value: any, i: number) => value ? this.studentSubjects[i].value : null)
      .filter((value: null) => value !== null);
    this.validateForm();
  }

  public successToast(): void {
    this.toastObj = ToastUtility.show('Tu usuario se ha creado correctamente', 'Success', 20000);
  }

  public dangerToast(): void {
    this.toastObj = ToastUtility.show('Ha ocurrido un error durante la creación de tu usuario', 'Error', 20000);
  }

  private addCheckboxes(): string[] {
    let names: string[] = [];
    this.studentSubjects.forEach((o) => {
      names.push(o.value);
    });
    return names;
  }

  private setGenderInDropdown() {
    const name: string = this.userForm?.value?.name;
    this.userService.setGender(name).subscribe((response) => {
      if (response.probability === 0) {
        this.userForm.controls['gender'].patchValue(null);
      } else {
        if (response.gender === 'female') {
          this.userForm.controls['gender'].setValue('Mujer');
        } else {
          this.userForm.controls['gender'].setValue('Hombre');
        }
      }
    });
  }

  private validateForm(): void {
    if (this.userForm.valid) {
      this.checkSubjects();
      this.userService.setNewUser(this.userForm.value);
      this.router.navigate(['/dashboard']);
      this.userForm.reset();
    } else {
      Object.keys(this.userForm.controls).forEach(field => {
        const control = this.userForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  private checkSubjects(): void {
    let subjectsChecked: string[] = []
    this.userForm.value.subjects.map((el: boolean, index: number) => {
      if (el === true) {
        subjectsChecked.push(this.studentSubjects[index].value);
      }
    });
    this.userForm.value.subjects = [];
    this.userForm.value.subjects.push(subjectsChecked);
  }

}
