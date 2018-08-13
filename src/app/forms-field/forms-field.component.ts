import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormService } from '../form.service';
import { User } from '../user';
import { emailValidator, passwordValidator, passwordSpecialValidator, passwordLengthValidator, passwordCharSValidator } from './validator';


@Component({
  selector: 'app-forms-field',
  templateUrl: './forms-field.component.html',
  styleUrls: ['./forms-field.component.css']
})
export class FormsFieldComponent implements OnInit {
  count: number = 1;
  profileForm: FormGroup;
  profile2: FormGroup;
  profile3: FormGroup;
  editFlag: boolean = false;
  name: '';
  email = '';
  password = '';
  socialmedia = '';
  address = '';
  user: User;
  selectedId: number;
  constructor(private fb: FormBuilder, private router: Router, private formsvc: FormService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      id: [],
      name: [this.name, Validators.required],
      email: [this.email,
      [Validators.required,
        emailValidator]
      ],
      password: [this.password, [Validators.required, passwordValidator, passwordSpecialValidator, passwordLengthValidator, passwordCharSValidator]]
    });
    this.profile2 = this.fb.group({
      socialmedia: [this.socialmedia, [Validators.required]]
    });
    this.profile3 = this.fb.group({
      address: [this.address, [Validators.required]]
    })

    this.selectedId = +this.route.snapshot.paramMap.get('id');
    if (this.selectedId) {
      this.formsvc.getdataId(this.selectedId)
        .subscribe(hero => { this.user = hero; this.updateValue(hero) });
      console.log(this.user)
    }
  }

  updateValue(data) {
    console.log(data);
    this.profileForm.patchValue({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password
    });
    this.profile2.patchValue({
      socialmedia: this.user.socialmedia
    });
    this.profile3.patchValue({
      address: this.user.address
    })

  }


  onNext(e) {
    this.count++
  }

  get f() {
    return this.profileForm.controls;
  }
  get f1() {
    return this.profile2.controls;
  }
  get f2() {
    return this.profile3.controls;
  }
  onSubmitClick(formdata1, formdata2, formdata3) {
    var newObj: User = Object.assign({}, formdata1.value, formdata2.value, formdata3.value);
    if (this.selectedId) {
      this.formsvc.updateHero(newObj).subscribe(()=>this.router.navigate(['/tableview']))
    }
    else {
      this.formsvc.addData(newObj).subscribe(data => this.addDatas(data));
    }
  }

  addDatas(data) {
    console.log(data);
    this.router.navigate(['/tableview']);
  }
}
