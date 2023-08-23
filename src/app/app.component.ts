import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string;
  userForm: FormGroup;
  fields: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fields = {
      isRequired: true,
      type: {
        options: [
          {
            label: 'Option 1',
            value: '1'
          },
          {
            label: 'Option 2',
            value: '2'
          }
        ]
      }
    };
    this.userForm = this.fb.group({
      type: this.fb.group({
        options: this.fb.array([])
      })
    });
    this.patch()
  }

  submit(value) {
    console.log(value);
  }

  patch() {
    const control = <FormArray>this.userForm.get('type.options');
    this.fields.type.options.forEach(x => {
      control.push(this.patchValues(x.label, x.value))
    })
  }

  patchValues(label, value) {
    return this.fb.group({
      label: [label],
      value: [value]
    })
  }
}
