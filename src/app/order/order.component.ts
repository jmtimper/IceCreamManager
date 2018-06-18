import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [
    trigger('order', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),

          ]))
        ]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 }),

          ]))
        ]), { optional: true })
      ])
    ])
  ]
})
export class OrderComponent implements OnInit {

  flavors: any;
  orders: any;

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.flavor.subscribe(res => this.flavors = res);
    this._data.order.subscribe(res => this.orders = res);
  }

  updateFlavor(flavor) {
    this.orders[0] = flavor;
  }

  updateCone(cone) {
    this.orders[1] = cone;
  }

  updateTopping(topping) {
    this.orders.push(topping);
  }
}
