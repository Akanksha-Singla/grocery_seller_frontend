import { Component, inject, EventEmitter ,Output} from '@angular/core';
import {  FormGroup,
  ReactiveFormsModule,
  Validators,FormControl} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../sevices/product/category.service';
import { SnackbarService } from '../../../../auth/services/sanckbar.service';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule,MatCardModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatIconModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  categoryForm: FormGroup;
  @Output() close = new EventEmitter<void>();
 
  closeModal(): void {
   
    this.close.emit();
    }

    constructor(private http:HttpClient,private categoryService:CategoryService ,private snackbar:SnackbarService){
      this.categoryForm = new FormGroup({
        name: new FormControl('', [
          Validators.required,
  
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      })
    }

    getControl(controlName: string) {
      return this.categoryForm.get(controlName);
    }
  getErrorMessage(controlName:string){
    const control = this.getControl(controlName);
    if (!control || !control.dirty || !control.touched) return '';
    switch(controlName){
      case 'name':
        if (control.hasError('required')) return 'Product name is required!';
        if (control.hasError('pattern'))
          return 'Only letters, numbers, and special characters . - _ $ @ * ! are allowed.';
        if (control.hasError('minlength'))
          return 'Product name must be at least 3 characters!';
        if (control.hasError('maxlength'))
          return 'Maximum length is 20 characters.';
        break;

        case 'description':
          if (control.hasError('required')) return 'Description is required!';
          if (control.hasError('minlength'))
            return 'Description must be at least 3 characters!';
          if (control.hasError('maxlength'))
            return 'Maximum length for description is 50 characters.';
          break;
          default:
            return '';
    }

 return ''
  }
 


  
  collectData() {
    console.log('values', this.categoryForm.value);

    if (this.categoryForm.valid) {
      const category = this.categoryForm.value
      this.categoryService.addCategory(category).subscribe({
        next: (responseData) => {
          console.log("response :",responseData);
          this.snackbar.showSuccess("Category added successfully")
        },
        error: (error) => {
          console.error(error);
          this.snackbar.showError("Error in adding category")
        },
      });
    } else {
      console.log('invalid form');
    }
  }
}

