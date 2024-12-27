import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertReportComponent } from './convert-report.component';

describe('ConvertReportComponent', () => {
  let component: ConvertReportComponent;
  let fixture: ComponentFixture<ConvertReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
