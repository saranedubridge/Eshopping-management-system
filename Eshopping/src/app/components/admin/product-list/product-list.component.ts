import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Product } from '../../model/product.model';
import { EshoppingService } from '../../service/eshopping.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
 //Product is comming from model class line and line 14 meaning same
 //productList: Product[]= [];
 productList : Array<Product>= [];
 constructor(
   private eService:EshoppingService,
   private router:Router
 ) {
   this.getProductList();
 }

 ngOnInit(): void {
 }
getProductList(): void {
   this.eService.getProductlist().pipe(take(1)).subscribe(
     (res: any) => {
       console.log("*******",res);
       if(!!res && Array.isArray(res)){
         this.productList= res;
       }
     }, err =>{
       console.log("Error");
     }
   )
}
delProduct(product: Product): void {
 this.eService.deleteProduct(product?.productId).pipe(take(1)).subscribe(
   (res:any)=>{
     alert("Product deleted sucessfully");
     this.getProductList();
   }, err =>{
       console.log("Error");
     }
 )
}
editProduct(product:Product):void{
 this.router.navigate(['/admin/addproduct'], { queryParams: {
   id: product?.productId
 }});

}

}
