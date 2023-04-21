import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
dishArr: any;
@Input() dishList: any;
@Input() strResponse: any;

JSON = JSON;
  constructor() { }

  ngOnInit(): void {
    this.dishArr = this.dishList;
  }
  toggleCSS(event: any) {
    const child = event.currentTarget.children[1];
    if (child.style.display === 'block') {
      child.style.display = 'none'
    } else {
      child.style.display = 'block'
    }

  }
}
