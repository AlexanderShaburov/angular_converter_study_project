import { Injectable } from '@angular/core';
import { RequestData } from '../interfaces/request-data';
import { CsrfTokenService } from './csrf-token.service';
import { ReportObject } from '../interfaces/report-object';
@Injectable({
  providedIn: 'root',
})
export class ConversReportService {
  private REPORT_URL: string = 'https://127.0.0.1:8000/api/report/';

  constructor(private tokenService: CsrfTokenService) {}

  async requestData(params: RequestData):Promise<ReportObject[]> {
    const response = await fetch(this.REPORT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': this.tokenService.getAPIToken(),
      },
      credentials: 'include',
      body: JSON.stringify(params),
    });
    const reportObject = await response.json()
    
    return reportObject
  }
}
