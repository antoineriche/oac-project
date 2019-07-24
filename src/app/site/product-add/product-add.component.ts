import { Component, OnInit } from '@angular/core';

import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import Todo from 'src/app/model/Todo';
import { TodosService } from '../../service/todos.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.sass']
})
export class ProductAddComponent implements OnInit {

  angForm: FormGroup;
  todo: Todo;

  constructor(private fb: FormBuilder,
    private ts: TodosService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      ProductName: ['', Validators.required ],
      ProductDescription: ['', Validators.required ],
      ProductPrice: ['', Validators.required ]
    });
  }

  getTodo(id:number){
    this.ts.getTodo(id);
  }

  getAllTodos(){
    this.ts.getAllTodos();
  }

  ngOnInit() {
  }

}
