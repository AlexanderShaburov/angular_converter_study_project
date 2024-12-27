import { NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { CurrencySelectorForm } from '../forms/currency-selector-base.component';
import { ConvertData } from '../interfaces/convert-data';
import { ConvertReportComponent } from '../convert-report/convert-report.component';
import { CurrensyDataGatherService } from '../services/currensy-data-gather.service';
import { ShowCaseComponent } from '../show-case/show-case.component';
import { DropBoxComponent } from '../drop-box/drop-box.component';
import { HandBook } from '../interfaces/hand-book';
import { SaveConversionService } from '../services/save-conversion.service';
import { CsrfTokenService } from '../services/csrf-token.service';


@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [NgIf, ShowCaseComponent, DropBoxComponent, ConvertReportComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
})
export class MainContainerComponent extends CurrencySelectorForm implements OnInit {
  
  constructor(private saveConversion: SaveConversionService,
    dataChanel: CurrensyDataGatherService,
    csrfTokenService: CsrfTokenService
  ) {
    super(dataChanel, csrfTokenService)
  }




  // BOOLEAN FLAGS:

  public handBook: HandBook = {}; // to store actual currencies information

  public formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  public savingStatus:any;
  public fromFormattedAmount: string = '';
  public formattedConvertedAmount: string = ''; // calculated and formatted amount of destination currency
  public convertedAmount: number = 0;

  public conversionData: ConvertData = {
    fromCode : '',
    timestamp : '',
    fromAmount : 0,
    fromRate : 1,
    toCode : '',
    toAmount : 0,
    toRate : 1,
    savingStatus: '', 
  };

  async ngOnInit() {
    await this.csrfTokenService.retrieveAPIToken();
    await this.dataChanel.gatherData(); // gather actual data
    this.handBook = this.dataChanel.getData(); // use getter to get data
    this.fromCurrency = this.dataChanel.getSinglCurrency('USD'); // set initial 'fromCurrency' as USD
    this.toCurrency = this.dataChanel.getSinglCurrency('EUR'); // set initial 'toCurrency' as EURO
  }

  swapCurrencies() {
    [this.toCurrency, this.fromCurrency] = [this.fromCurrency, this.toCurrency];
    this.viewPressed = false;
  }

  // Listen 'esc' key and close dropBox on it:

  // save entered amount:
  amountEntered(amount: number) {
    ;
    this.amount = amount;
    this.isFocusedAmount = false;
  }

  displayCalculations() {
    ;
    this.viewPressed = true;
    this.convertedAmount = Math.round(
      (this.toCurrency.rate * this.amount) * 100 / this.fromCurrency.rate
    ) / 100;
    this.formattedConvertedAmount = this.formatted.format(this.convertedAmount);
    this.fromFormattedAmount = this.formatted.format(this.amount);
  }

  addValue(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;
    const filteredValue = inputElement.value.replace(/[^0-9]/g, '');
    inputElement.value = filteredValue;
    this.amount = Number(filteredValue);
    ;
    if (this.viewPressed) {
      this.displayCalculations();
    }
  }
  harvestConversion (): ConvertData { // compose all data about just complited conversion
    this.conversionData.timestamp = new Date().toISOString();
    this.conversionData.fromCode = this.fromCurrency.code;
    this.conversionData.fromAmount = this.amount;
    this.conversionData.fromRate = this.fromCurrency.rate;
    this.conversionData.toCode = this.toCurrency.code;
    this.conversionData.toAmount = this.convertedAmount;
    this.conversionData.toRate = this.toCurrency.rate;
    return this.conversionData;
  }
  async convert() {
    
    this.conversionData = this.harvestConversion()  // collect all convertion dataset to save
    this.conversionData = await this.saveConversion.save(this.conversionData);  // save conversion data to database
    
    this.showConversion = true; //  display conversion data
  }
}
