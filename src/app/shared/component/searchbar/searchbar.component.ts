import { Component,Input,Output,EventEmitter } from '@angular/core';
import { ProductService } from '../../../features/product/sevices/product/product.service';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule,FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchbar',
  imports: [MatIconModule,ReactiveFormsModule,CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
searchControl = new FormControl('');
@Output()
search:EventEmitter<string>= new EventEmitter<string>


constructor(private productService: ProductService){
  this.searchControl.valueChanges.pipe(debounceTime(2000)).subscribe((value)=>{
    this.search.emit(value || '');
   
  })
}
clearSearch() {
  this.searchControl.setValue('');
  this.search.emit(''); 
}




}
