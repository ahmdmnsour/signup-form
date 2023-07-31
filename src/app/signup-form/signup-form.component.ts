import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { CustomValidators } from './custom.validators'

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {

  clicked = false;

  map = new Map([
    ["Menofia", ["Qwesna", "Shebin El kom"]],
    ["Egypt", ["Cairo", "Alexandria"]],
    ["KSA", ["Riyadh", "Jeddah"]]
  ]);

  currentDate = new Date().getFullYear();

  user: any;

  signupForm = new FormGroup({
    personalInformation: new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]),
      birthDate: new FormControl('', [
        Validators.required,
        CustomValidators.ageValidator
      ]),
      gender: new FormControl('', Validators.required),
      militaryStatus: new FormControl()
    }),
    accountInformation: new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', Validators.pattern("^01[0-2,5]{1}[0-9]{8}$")),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        CustomValidators.patternValidator(/\d/, { shouldHaveNum: true }),
        CustomValidators.patternValidator(/[A-Z]/, { shouldHaveUpper: true }),
        CustomValidators.patternValidator(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, { shouldHaveSpecial: true }),
      ]),
      passowrdConfirmation: new FormControl(),
    }, CustomValidators.passwordMatchValidator),
    addressiInformation: new FormGroup({
      country: new FormControl(),
      city: new FormControl(),
    }),
  });

  constructor() {
    if (localStorage.getItem('user')) {
      this.signupForm.setValue(JSON.parse(localStorage.getItem('user') || '{}'));
    }
  }

  onSubmit() {
    localStorage.setItem('user', JSON.stringify(this.signupForm.value));
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    if (day > new Date()) {
      return false;
    }
    return true;
  };

  onCountryChange() {
    if (this.country?.value != 'Country') {
      this.city?.setValidators(Validators.required);
      this.city?.updateValueAndValidity();
    } else {
      this.city?.clearValidators();
      this.city?.updateValueAndValidity();
    }
  }

  militaryVisibility(): boolean {
    if (this.gender?.value == 'male') {
      this.militaryStatus?.setValidators(Validators.required);
      this.militaryStatus?.updateValueAndValidity();
      return true;
    } else {
      this.militaryStatus?.clearValidators();
      this.militaryStatus?.updateValueAndValidity();
      return false;
    }
  }

  get personalInformation() {
    return this.signupForm['controls'].personalInformation;
  }

  get accountInformation() {
    return this.signupForm['controls'].accountInformation;
  }

  get addressiInformation() {
    return this.signupForm['controls'].addressiInformation;
  }

  get name() {
    return this.signupForm['controls'].personalInformation['controls'].name;
  }

  get email() {
    return this.signupForm['controls'].accountInformation['controls'].email;
  }

  get password() {
    return this.signupForm['controls'].accountInformation['controls'].password;
  }

  get passowrdConfirmation() {
    return this.signupForm['controls'].accountInformation['controls'].passowrdConfirmation;
  }

  get phone() {
    return this.signupForm['controls'].accountInformation['controls'].phone;
  }

  get country() {
    return this.signupForm['controls'].addressiInformation['controls'].country;
  }

  get city() {
    return this.signupForm['controls'].addressiInformation['controls'].city;
  }

  get gender() {
    return this.signupForm['controls'].personalInformation['controls'].gender;
  }

  get militaryStatus() {
    return this.signupForm['controls'].personalInformation['controls'].militaryStatus;
  }

  get birthDate() {
    return this.signupForm['controls'].personalInformation['controls'].birthDate;
  }

}
