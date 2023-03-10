import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Product } from '../../model/product.model';
import { EshoppingService } from '../../service/eshopping.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  productList: Array<Product> = [];
  quantity: number = 0;
  customer: any = {};
  constructor(
    private eService: EshoppingService,
    private router: Router
  ) {

    this.getProductList();
    this.getCustomerDetail();


  }


  ngOnInit(): void {
  }

  getCustomerDetail(): void {
    const cid = this.eService.getClientAuthorization();
    this.eService.getCustomerById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Customer*****", res);
        if (!!res && res?.customerId) {
          this.customer = res;
        }
      }, err => {
        console.log("Err");
      }
    )
  }

  getProductList(): void {
    this.eService.getProductlist().pipe(take(1)).subscribe(
      (res: any) => {
        if (!!res && Array.isArray(res)) {
          this.productList = res;
        }
        if (this.productList.length > 0) {
          setTimeout(() => {
            this.productList.forEach((item: Product) => {
              const element: any = document.getElementById(item?.productId.toString());
              element.value = 0;
            });
          }, 1000);

        }
      }, err => {
        console.log("Error");
      }
    )
  }

  addToCart(product: Product): void {
    const element: any = document.getElementById(product?.productId.toString());
  let qty:any= element!==null ? element.value : 0;
  if(qty ===""){
    element.value=0;
    qty=0;
  }
    if (qty === 0 || qty === "0") {
      alert("Qunatity should not be zero");
      return ;
    }


    const body: any = {
      quantity: qty,
      mrpPrice: product?.mrpPrice,
      prouct: product,
      customer: this.customer
    };
    console.log("add to cart", body);
    this.eService.addToCart(body, product?.productId, this.customer?.customerId).pipe(take(1)).subscribe(
      (res: any) => {
        console.log(res);
        if (!!res && res?.cartId) {
          alert("Item added sucessfully");
        }
      }, err => {
        console.log("Error");
      }
    )
  }

}



