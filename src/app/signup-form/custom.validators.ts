import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static shouldHaveUpper(control: AbstractControl): ValidationErrors | null {
        const upperCaseCharacters = /[A-Z]+/g;
        if (!upperCaseCharacters.test(control.value)) {
            return { shouldHaveUpper: true };
        }
        return null;
    }

    static shouldHaveNum(control: AbstractControl): ValidationErrors | null {
        const numberCharacters = /[0-9]+/g;
        if (!numberCharacters.test(control.value)) {
            return { shouldHaveNum: true };
        }
        return null;
    }

    static shouldHaveSpecial(control: AbstractControl): ValidationErrors | null {
        const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (!specialCharacters.test(control.value)) {
            return { shouldHaveSpecial: true };
        }
        return null;
    }

    static MatchValidator(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const sourceCtrl = control.get(source);
            const targetCtrl = control.get(target);

            return sourceCtrl && targetCtrl && targetCtrl.value !== sourceCtrl.value
                ? { mismatch: true }
                : null;
        };
    }

    static calculateAge(birthDate: number): number {
        var timeDiff = Math.abs(Date.now() - birthDate);
        return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }

    static shouldBeOlder(control: AbstractControl): { [key: string]: any } | null {
        if (CustomValidators.calculateAge(control.value) < 18) {
            return { shouldBeOlder: true };
        }
        return null;
    }

    static shouldBeYounger(control: AbstractControl): { [key: string]: any } | null {
        if (CustomValidators.calculateAge(control.value) > 60) {
            return { shouldBeYounger: true };
        }
        return null;
    }


}