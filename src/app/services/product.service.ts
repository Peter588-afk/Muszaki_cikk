import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;


  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    afs.firestore.enablePersistence().then(()=>{
      console.log('firebase oks');
    }).catch((error)=>{
      console.error(error);
    });

    this.productsCollection = afs.collection<Product>('Products');
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const productid = a.payload.doc['id'];
        return { productid, ...data };
      }))
    );
  }

  /*public GetAllCategory(collection: string, collectionName: string): Observable<DocumentData[]>{
    return this.afs.collection(collection).doc(collectionName).valueChanges();
  }*/

  getProductsByCategory(category: string): Observable<Product[]> {
    console.log(this.afs.collection<Product>('Products', ref => ref.where('category', '==', category)).valueChanges())
    /*let order: 'asc' | 'desc' = 'asc';
  if (sort === 'desc') {
    order = 'desc';
  }*/
    return this.afs.collection<Product>('Products', ref => ref.where('category', '==', category)).valueChanges();
  }
  
  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }

  getProducts(): Observable<Product[]> {
    return this.products;
  }

  getProduct(id: string): Observable<Product | undefined> {
    return this.productsCollection.doc<Product>(id).valueChanges();
  }

  addProduct(product: Product): Promise<void> {
    return this.productsCollection.add(product).then(ref => {
      console.log('Added product with ID: ', ref.id);
    });
  }

  updateProduct(id: string, product: Product): Promise<void> {
    return this.productsCollection.doc<Product>(id).update(product).then(() => {
      console.log('Updated product with ID: ', id);
    });
  }

  deleteProduct(id: string): Promise<void> {
    return this.productsCollection.doc<Product>(id).delete().then(() => {
      console.log('Deleted product with ID: ', id);
    });
  }
}
