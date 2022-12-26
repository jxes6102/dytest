import { Component } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';  

@Component({
  selector: 'app-formtest',
  templateUrl: './formtest.component.html',
  styleUrls: ['./formtest.component.css']
})
export class FormtestComponent {
  formData = new FormControl('')
  formContent = new FormControl('')

  // profileForm = new FormGroup({
  //   firstName: [''],
  //   lastName: new FormControl(''),
  //   phone: new FormControl(''),
  // });

  profileForm = this.bd.group({
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    phone: [''],
  });

  testName:string = ''

  constructor(private bd: FormBuilder) { }

  ngOnInit(): void {
    this.formData.valueChanges.subscribe(val => console.log(val));
    this.formContent.valueChanges.subscribe(val => console.log(val));
    this.profileForm.valueChanges.subscribe(val => console.log(val));
  }

  setVal(): void {
    this.formData.setValue('set formData');
    this.formContent.setValue('set formContent');
  }

  setProfileVal(): void {
    this.profileForm.setValue({
      firstName:'is firstName',
      lastName:'is lastName',
      phone:'is phone',
    });
  }

}
