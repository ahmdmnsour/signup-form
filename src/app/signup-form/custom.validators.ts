import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return !regex.test(control.value) ? error : null;
        };
    }

    static passwordMatchValidator(control: AbstractControl): any {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('passowrdConfirmation')?.value;
        if (password !== confirmPassword) {
            control.get('passowrdConfirmation')?.setErrors({ mismatch: true });
        }
    }

    static ageValidator(control: AbstractControl): ValidationErrors | null {
        let age = Math.abs(Date.now() - control.value);
        age = Math.floor((age / (1000 * 3600 * 24)) / 365);
        console.log(age);
        if (age < 18) {
            return { shouldBeOlder: true };
        } else if (age > 60) {
            return { shouldBeYounger: true };
        }
        return null;
    }
}