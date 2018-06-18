import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class DataService {

  private flavors = new BehaviorSubject<any>(['Vanilla', 'Chocolate', 'Strawberry', 'Cookie Dough']);
  flavor = this.flavors.asObservable();
  private orders = new BehaviorSubject<any>(['Choose a flavor', 'Choose a cone']);
  order = this.orders.asObservable();

  constructor() { }

  changeFlavor(flavor) {
    this.flavors.next(flavor);
  }

  changeOrder(order) {
    this.flavors.next(order);
  }
}
