import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, take } from 'rxjs';
import { Cart } from '../../model/cart.model';
import { EshoppingService } from '../../service/eshopping.service';

@Component({
  selector: 'app-client-cart',
  templateUrl: './client-cart.component.html',
  styleUrls: ['./client-cart.component.scss']
})
export class ClientCartComponent implements OnInit{
  cartList: Cart[] = [];
  grandTotal: number = 0;
  customer: any = {};


  constructor(
    private eService: EshoppingService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.getCartList();
    this.getCustomerDetail();
  }

  ngOnInit(): void {
  }
  getCartList(): void {
    this.eService.cartList().pipe(take(1)).subscribe(
      (res: any) => {
        console.log("********", res);
        if (!!res && Array.isArray(res)) {
          const customerFilter = res.filter((item: Cart)=> item?.customer?.customerId === parseInt(this.eService.getClientAuthorization()));
          console.log("customer filter::::::",customerFilter);
          this.cartList = customerFilter;
          if (this.cartList.length > 0) {
            this.cartList.map((item: Cart) => {
              this.grandTotal += (item?.mrpPrice * item?.quantity);
            })
          }
        }
      }, err => {
        console.log("error");
      }

    );
  }
  getTotal(quantity: number = 0, mrpPrice: number = 0): number {
    return quantity * mrpPrice;
  }
  placeOrder(): void {
    const req:any[]=[];
    this.cartList.map((item: Cart) => {
      const body: any = {
        mrpPrice: item?.mrpPrice,
        quantity: item?.quantity,
        totalPrice: item?.mrpPrice * item?.quantity,
        orderStatus: "success",
        paymentStatus: "success",
        orderedDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
        customer: this.customer,
        cart: item
      };

      console.log("add to order", body);
      req.push(this.eService.placeOrder(this.customer?.customerId, item?.cartId, body));

    });

     forkJoin(req).pipe(take(1)).subscribe(
        (res: any) => {
          console.log("PLaceorder$$$$$$$$",res);
          alert("Place order Sucessfully");
          this.router.navigate(["/client/home"])

        }, err => {
          console.log("Error");
        });


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

  deleteCart(cart:Cart):void{
    this.eService.deleteCart(cart?.cartId).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Cart*****", res);
       /* if (!!res && res?.customerId) {
          this.customer = res;
        }*/
      }, err => {
        console.log("Err");
      }
    )
  }

}
