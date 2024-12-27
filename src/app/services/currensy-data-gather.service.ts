import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HandBook } from '../interfaces/hand-book';
import { SelectedCurrency } from '../interfaces/selected-currency';
import createDOMPurify from 'dompurify';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RequestData } from '../interfaces/request-data';

@Injectable({
  providedIn: 'root',
})
export class CurrensyDataGatherService {
  private handBook: HandBook = {};
  private requestId: string = '';
  private DATA_URL: string = 'https://127.0.0.1:8000/api/gather_data/';

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async gatherData() {
    if (isPlatformBrowser(this.platformId)) { // !!!!!!!!!!!!!!!!
      const DOMPurify = createDOMPurify(window);
      // gatherData method initiate gathering data process and compile all data to HandBook
      await fetch(this.DATA_URL)
        .then((r1) => r1.json())
        .then((data) => {
          ;
          for (const currency in data) {
            // const purified_xml = DOMPurify.sanitize(data[currency].flag);
            data[currency].flag =
              this.sanitizer.bypassSecurityTrustHtml(data[currency].flag);
          }
          this.handBook = data;
          console.log(data)
        });
      ;
    }
  }

  getData(): HandBook {
    // Getter:
    return this.handBook;
  }
  getSinglCurrency(code: string): SelectedCurrency {
    
    // Retreave all about selected currency
    // in SelectedCurrency interface format by currency code.
    return {
      code: code,
      symbol: this.handBook[code].symbol,
      flag: this.handBook[code].flag,
      name: this.handBook[code].name,
      rate: this.handBook[code].rate,
    };
  }
}

// '2024-11-27T12:47:29.723Z'
