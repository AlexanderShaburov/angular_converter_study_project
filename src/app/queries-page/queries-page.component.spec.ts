import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueriesPageComponent } from './queries-page.component';

describe('QueriesPageComponent', () => {
  let component: QueriesPageComponent;
  let fixture: ComponentFixture<QueriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueriesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
