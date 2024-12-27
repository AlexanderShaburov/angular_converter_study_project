import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SelectedCurrency } from '../interfaces/selected-currency';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-show-case',
  standalone: true,
  imports: [NgIf],
  templateUrl: './show-case.component.html',
  styleUrl: './show-case.component.scss',
  // encapsulation: ViewEncapsulation.None
})
export class ShowCaseComponent {
  @Input() currencyToShow!: SelectedCurrency; 
  @Input() lable!:string;

  constructor () {
  }
}
