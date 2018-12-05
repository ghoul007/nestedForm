import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  userForm: FormGroup;
  typeControl: FormControl;

  constructor(private formBuilder: FormBuilder) {}

  /**
   *  initialize form
   */
  initForm() {
    this.userForm = this.formBuilder.group({
      name: ["", Validators.required],
      age: ["", Validators.required],
      typegroup: this.formBuilder.group(this.initTypeGroup())
    });
    this.typeControl = this.userForm.controls.typegroup.get( "type" ) as FormControl;
    this.typeControl.valueChanges.subscribe(value => {
      const adminCtrl = this.userForm.controls.typegroup.get("admin");
      const clientCtrl = this.userForm.controls.typegroup.get("client");

      if (value === "admin") {
        this.setFormValidity(adminCtrl, this.initAdminForm());
        this.setFormValidity(clientCtrl);
      } else if (value === "client") {
        this.setFormValidity(clientCtrl, this.initClientForm());
        this.setFormValidity(adminCtrl);
      } else if (value === "user") {
        this.setFormValidity(clientCtrl);
        this.setFormValidity(adminCtrl);
      }
    });
  }

  /**
   *  set Form Validity
   * @param form {object} Controls form
   * @param val {Object}  validity form controls
   */
  setFormValidity(form, val = null) {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].setValidators(val ? val[key][1] : null);
      form.controls[key].updateValueAndValidity();
    });
  }

  /**
   *  init Group Type
   */
  initTypeGroup() {
    return {
      type: [""],
      admin: this.formBuilder.group(this.initAdminForm()),
      client: this.formBuilder.group(this.initClientForm())
    };
  }

  /**
   * Init Group Admin
   */
  initAdminForm() {
    return {
      tel: ["", Validators.required],
      address: ["", Validators.required],
      email: ["", Validators.required]
    };
  }

  /**
   * init Client Form
   */
  initClientForm() {
    return {
      permis: [""],
      card: [""]
    };
  }

  ngOnInit() {
    this.initForm();
  }
}
