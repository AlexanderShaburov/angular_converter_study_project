import { Component, HostListener, Input } from '@angular/core';
import { DropBoxComponent } from '../drop-box/drop-box.component';
import { ShowCaseComponent } from '../show-case/show-case.component';
import { NgIf } from '@angular/common';
import { CurrensyDataGatherService } from '../services/currensy-data-gather.service';
import { SelectedCurrency } from '../interfaces/selected-currency';
import { CurrencySelectorForm } from '../forms/currency-selector-base.component';
import { CsrfTokenService } from '../services/csrf-token.service';
import { RequestData } from '../interfaces/request-data';
import { ConversReportService } from '../services/convers-report.service';
import { ReportObject } from '../interfaces/report-object';

@Component({
  selector: 'app-queries-page',
  standalone: true,
  imports: [DropBoxComponent, ShowCaseComponent, NgIf],
  templateUrl: './queries-page.component.html',
  styleUrl: './queries-page.component.scss',
})
export class QueriesPageComponent extends CurrencySelectorForm {
  constructor(
    override dataChanel: CurrensyDataGatherService,
    override csrfTokenService: CsrfTokenService,
    private conversionReader: ConversReportService
  ) {
    super(dataChanel, csrfTokenService);
  }
  private requestData: RequestData = {
    sinceDate: '',
    untilDate: '',
    lowerLimit: 0,
    upperLimit: 0,
    fromCurrency: 'USD',
    toCurrency: 'EU',
  };

  ngOnInit() {
    this.fromCurrency = this.dataChanel.getSinglCurrency('SLCT'); // set initial 'fromCurrency' as USD
    this.toCurrency = this.dataChanel.getSinglCurrency('SLCT'); // set initial 'toCurrency' as EURO
  }

  addValue(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;
    const filteredValue = inputElement.value.replace(/[^0-9]/g, '');
    inputElement.value = filteredValue;
  }

  async requestQuery(event: Event) {
    event.preventDefault();
    ;
    // collect form data:
    let sinceInput = document.getElementById('since');
    if (sinceInput instanceof HTMLInputElement) {
      this.requestData.sinceDate = sinceInput.value;
    }
    let untilInput = document.getElementById('until');
    if (untilInput instanceof HTMLInputElement) {
      this.requestData.untilDate = untilInput.value;
    }
    let minAmount = document.getElementById('min_value');
    if (minAmount && minAmount instanceof HTMLInputElement) {
      this.requestData.lowerLimit = parseInt(minAmount.value);
      ;
    }
    let maxAmount = document.getElementById('max_value') as HTMLInputElement;
    ;
    this.requestData.upperLimit = parseInt(maxAmount.value);
    ;

    this.requestData.fromCurrency = this.fromCurrency.code;
    this.requestData.toCurrency = this.toCurrency.code;
    ;
    if (document.getElementById('display_aria')) {
      const reportWindow = document.getElementById(
        'display_aria'
      ) as HTMLElement;
      const report: ReportObject[] = await this.conversionReader.requestData(
        this.requestData
      );
      const fV = new Intl.NumberFormat('en-US', {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2.
      })
      const fD = new Intl.DateTimeFormat('en-US', {
        year: '2-digit',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        timeZone: 'UTC',
      })
      if (report) {
        ;
        let reportLine = '<ol>';
        report.forEach((element) => {
          const date = new Date(element.convert_date);
          const rate = (element.target_rate/element.source_rate).toString(
          ).match(/^\d*\.?0{0,6}[1-9]{0,2}/);
          reportLine += `<li>${fV.format(element.amount_source)} ${
            element.currency_source} \twere converted to ${fV.format(
            element.amount_target)} ${element.currency_target} \tat rate ${
            rate} \tfor 1  ${element.currency_target} \t${fD.format(date)} </li><p>`;
        });
        reportLine += '</ol>';
        reportWindow.innerHTML = reportLine;
      }
    }
  }
  // const reportWindow? = document.getElementById('display_aria').innerHTML
  // this.conversionReader.requestData(this.requestData)
}
// /^\d*/\\.?0{0,6}[1-9]{0,2}/
