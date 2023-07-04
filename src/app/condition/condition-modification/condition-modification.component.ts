import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConditionService} from "../../services/condition/condition.service";
import {Error} from "../../error/error";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-condition-modification',
  templateUrl: './condition-modification.component.html',
  styleUrls: ['./condition-modification.component.css']
})
export class ConditionModificationComponent implements OnInit {
  mood: string = 'Create new Condition';
  form: FormGroup;
  loading: boolean = false;
  error: Error;

  constructor(private service: ConditionService,
              private dialogRef: MatDialogRef<ConditionModificationComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    if (data) {
      this.mood = 'Update Condition';
      this.form = new FormGroup({
        id: new FormControl(data.id as number),
        name: new FormControl(data.name, Validators.required),
        description: new FormControl(data.description, Validators.required),
      });
    } else {
      this.form = new FormGroup({
        id: new FormControl(null),
        name: new FormControl('', Validators.required),
        description: new FormControl(''),
      });
    }
  }

  subscribeModification() {
    this.loading = true;
    if (this.form.get('id').value == null) {
      return this.service.create(this.form.value)

    } else {
      return this.service.update(this.form.value)
    }
    //console.log(this.form.value);
  }

  OnSubmit() {
    this.subscribeModification().subscribe(value => {
      this.loading = false;
      this.dialogRef.close(value);
    }, error => {
      this.error = error.error as Error;

      this.error.subErrors.forEach(v => {
        let key = v.field;
        let val = v.message;
        this.form.controls[key].setErrors({err: val});
      });

      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

  get id() {
    return this.form.get('id');
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }
}
