import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit{
@Output() showCategory = new EventEmitter<string>();
//categories: string[] = [];

categories: Observable<any[]> | undefined;
selectedCategory: string | undefined;
filteredProducts: Observable<any[]> | undefined;

constructor(private firestore: AngularFirestore, private productService: ProductService) {
  
}
  ngOnInit(): void {
    this.categories = this.firestore.collection('Categories').valueChanges();
    console.log(this.categories);
  }

onShowCategory(category: any): void{
  this.showCategory.emit(category.name);
  console.log(category.name)
  
  return category.name;
};
}
