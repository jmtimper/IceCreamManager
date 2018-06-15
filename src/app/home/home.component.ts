import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('flavors', [
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
export class HomeComponent implements OnInit {

  itemCount: number = 4;
  btnText: string = "Add Flavor";
  flavorText: string = "";
  flavors = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.flavor.subscribe(res => this.flavors = res);
    this.itemCount = this.flavors.length;
    this._data.changeFlavor(this.flavors);
  }

  addItem() {
    if (this.flavorText != '') {
      this.flavors.push(this.flavorText);
      this.flavorText = '';
      this.itemCount = this.flavors.length;
      this._data.changeFlavor(this.flavors);
    }
  }

  removeItem(i) {
    this.flavors.splice(i, 1);
    this.itemCount = this.flavors.length;
    this._data.changeFlavor(this.flavors);
  }

}
