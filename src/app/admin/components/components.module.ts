import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { CustomerModule } from './customer/customer.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrdersModule } from './orders/orders.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerModule,
    DashboardModule,
    OrdersModule,
    ProductsModule
  ]
})
export class ComponentsModule { }
