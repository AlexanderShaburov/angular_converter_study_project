import { Directive, HostListener } from '@angular/core';
import { SelectedCurrency } from '../interfaces/selected-currency';
import { CurrensyDataGatherService } from '../services/currensy-data-gather.service';
import { CsrfTokenService } from '../services/csrf-token.service';

@Directive()
export abstract class CurrencySelectorForm {
  constructor(
    protected dataChanel: CurrensyDataGatherService,
    protected csrfTokenService: CsrfTokenService
  ) {}
  protected USD: SelectedCurrency = {
    code: 'USD',
    symbol: '$',
    flag: 'flags/us.svg',
    name: 'US Dollar',
    rate: 1,
  };

  public isFocusedFrom: boolean = false; // to signal if "from" form selected
  public isFocusedTo: boolean = false; // to signal if "to" form selected
  protected focusedElement: HTMLElement | null = null; // to remember current focused element
  public fromCurrency: SelectedCurrency = this.USD;
  public isFocusedAmount: boolean = false; // to signal if "amount" form selected
  public viewPressed: boolean = false;
  public showConversion: boolean = false; // to show conversion results
  public amount: number = 1; // initial amaoutnt is 1USD
  public toCurrency: SelectedCurrency = {
    code: '',
    symbol: '',
    flag: '',
    name: '',
    rate: 1,
  };


  // check if one of the fields selected:
  @HostListener('focusin', ['$event.target'])
  onFocus(target: HTMLLIElement) {
    // first check if is .container then what frame: toCase or fromCase
    ;
    this.focusedElement = target;
    switch (target.id) {
      case 'fromCase':
        this.isFocusedFrom = true;
        this.isFocusedTo = false;
        this.isFocusedAmount = false;
        break;
      case 'toCase':
        this.isFocusedTo = true;
        this.isFocusedAmount = false;
        this.isFocusedFrom = false;
        break;
      case 'amountCase':
        this.isFocusedAmount = true;
        setTimeout(() => {
          const container = document.getElementById('amountCase');
          if (container) {
            const inputLink = container.querySelector(
              'input'
            ) as HTMLElement | null;
            if (inputLink) {
              inputLink.focus();
            }
          }
        }, 10);
        break;
      default:
        break;
    }
  }

  @HostListener('focusout', ['$event.relatedTarget'])
  onBlur(target: HTMLElement) {
    if (target && target.closest('#fromCase')) return;
    else {
      this.isFocusedFrom = false;
    }
    if (target && target.closest('#toCase')) return;
    else {
      this.isFocusedTo = false;
    }
    if (target && target.closest('#amountCase')) return;
    else {
      this.isFocusedAmount = false;
    }
  }

  // get selected currency from dropBox component and set it as selected
  setCurrency(code: string) {
    if (this.isFocusedFrom) {
      this.fromCurrency = this.dataChanel.getSinglCurrency(code);
      this.isFocusedFrom = false;
    }
    if (this.isFocusedTo) {
      this.toCurrency = this.dataChanel.getSinglCurrency(code);
      this.isFocusedTo = false;
    }
    this.viewPressed = false;
  }

  // Listen 'esc' key and close dropBox on it:
  @HostListener('document:keydown', ['$event'])
  escHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        
        this.viewPressed = false;
        this.showConversion = false;
        this.closeDropBox();
        this.reset();
        break;
      case 'Enter':
        ;
        this.isFocusedAmount = false;
        break;
      default:
        break;
    }
    // if (event.key === 'Escape') {
    //   this.viewPressed = false;
    //   this.showConversion = false;
    //   this.closeDropBox();
    //   this.reset();
    // }
    // if (event.key === 'Enter') {
    //   ;
    //   this.isFocusedAmount = false;
    // }
  }

  // close dropBox on inpropriate mouse clic and focus drop from selected element:
  closeDropBox() {
    ;
    this.isFocusedTo = false;
    this.isFocusedFrom = false;
    if (this.focusedElement) {
      this.focusedElement.blur();
      this.focusedElement = null;
    }
  }

  reset() {
    this.viewPressed = false;
    this.showConversion = false;
    this.isFocusedAmount = false;
    this.amount = 0;
    this.closeDropBox();
    this.fromCurrency = this.dataChanel.getSinglCurrency('USD'); // set initial 'fromCurrency' as USD
    this.toCurrency = this.dataChanel.getSinglCurrency('EUR'); // set initial 'toCurrency' as EURO

  }
}
