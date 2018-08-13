import { FormControl, FormGroup } from "@angular/forms";

export function emailValidator(control: FormControl): { [key: string]: any } | null {
  var emailRegexp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
  return null;
}

  export function passwordValidator(control: FormControl): { [key: string]: any | null} {
    var pass = control.value != undefined ? control.value : '';
    if (!pass.match(/[0-9]/)) {
      return { minNumber: true };
    }
  }
  
  export function passwordLengthValidator(control: FormControl): { [key: string]: any } {
    var pass = control.value != undefined ? control.value : '';
    if (!(pass.length >= 8)) {
      return { minLen: true };
    }
  }
  
  export function passwordSpecialValidator(control: FormControl): { [key: string]: any } {
    var pass = control.value != undefined ? control.value : '';
    if (!pass.match(/[!,%,&,@,#,$,^,*,?,_,~]/)) {
      return { specialChar: true };
    }
  }
  
  export function passwordCharCValidator(control: FormControl): { [key: string]: any } {
    var pass = control.value != undefined ? control.value : '';
    if (!pass.match(/[A-Z]/)) {
      return { minCapChar: true };
    }
  }
  
  export function passwordCharSValidator(control: FormControl): { [key: string]: any } {
    var pass = control.value != undefined ? control.value : '';
    if (!pass.match(/[a-z]/)) {
      return { minSmallChar: true };
    }
  }
  
  export function passwordSpaceValidator(control: FormControl): { [key: string]: any } {
    var pass = control.value != undefined ? control.value : '';
    if (!pass.match(/^\S*$/)) {
      return { noSpace: true };
    }
  }