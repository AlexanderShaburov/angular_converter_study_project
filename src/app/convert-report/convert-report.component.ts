import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConvertData } from '../interfaces/convert-data';

@Component({
  selector: 'app-convert-report',
  standalone: true,
  imports: [],
  templateUrl: './convert-report.component.html',
  styleUrl: './convert-report.component.scss'
})
export class ConvertReportComponent {
  @Input() conversionData!:ConvertData;
  @Output() resetView = new EventEmitter;

  public savingStatus: string = '';

  constructor () {}

  resetReport () {
    
    this.resetView.emit();
  }
}
