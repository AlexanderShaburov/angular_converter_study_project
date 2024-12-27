import { HandBook } from '../interfaces/hand-book';
import { KeyValuePipe, NgFor } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CurrensyDataGatherService } from '../services/currensy-data-gather.service';

@Component({
  selector: 'app-drop-box',
  standalone: true,
  imports: [NgFor, KeyValuePipe],
  templateUrl: './drop-box.component.html',
  styleUrl: './drop-box.component.scss',
})
export class DropBoxComponent {
  @Output() selectCurrency = new EventEmitter<string>();
  @Output() closeBox = new EventEmitter<string>
  @Input() lable!:string;
  
  private handBook: HandBook = {};
  public filteredList: HandBook = {};
  public frameLable: string = '';

  constructor(private dataChanel: CurrensyDataGatherService) {
    this.dataChanel.gatherData();
    this.handBook = this.dataChanel.getData();
    this.filteredList = this.handBook;
  
  }
// set focus on new input:
  ngAfterViewInit(){
    const container = document.getElementById('inputPart');
    if (container) {
      const inputLink = container.querySelector('input') as HTMLElement | null;
      if (inputLink) {
        inputLink.focus();
      }
    }
  }
// build new selected list on every new input value:
  getFilteredList(event: Event) {
    ;
    const target = event.target as HTMLElement;
    const container = target.closest('.container');
    if (!container) {
      return;
    }
    const inputTarget = container.querySelector('input');
    if (inputTarget) {
      this.filteredList = {};
      const inputElement = target as HTMLInputElement;

      for (let code of Object.keys(this.handBook)) {
        if (
          this.handBook[code]['name']
            .toLowerCase()
            .match(inputElement.value.toLowerCase())
        ) {
          this.filteredList[code] = this.handBook[code];
        }
      }
    }
  }
  // return selected by mouseclick currency from currency list to main-component:
  selectCurrencyFromList(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const liTarget = target.closest('li');
    if (!liTarget) {
      return;
    }
    const liTargetId = liTarget.id;
    this.selectCurrency.emit(liTarget.id);
  }


  @HostListener('clicl', ['$event'])
  closeDropBox() {
    this.closeBox.emit()    
  }
}
