import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MainContainerComponent } from './main-container/main-container.component';
import { QueriesPageComponent } from './queries-page/queries-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MainContainerComponent,
    QueriesPageComponent,
    NgIf,
    NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedTab: string = 'mainTab';
  title = 'converter-v4';
  constructor () {}
  
  
  
  selectTab (tabName:string) {
    this.selectedTab = tabName;
    ;

  }
}
