import { Injectable } from '@angular/core';
import { ConvertData } from '../interfaces/convert-data';
import { CsrfTokenService } from './csrf-token.service';

@Injectable({
  providedIn: 'root',
})
export class SaveConversionService {
  private SAVE_CONV_URL: string = 'https://127.0.0.1:8000/api/save_conversion/';
  private TEST_URL = 'https://127.0.0.1:8000/api/test/';

  constructor(private tokenService: CsrfTokenService) {}

  async save(data: ConvertData): Promise<ConvertData> {
    
    try {
      let res: string;
      const csrfAPIToken: string = this.tokenService.getAPIToken();

      // Ensure CSRF token is available:
      if (!csrfAPIToken) {
        console.error('CSRF token is missing!');
        data.savingStatus = 'CSRF token missing'
        return data;
      }
      //**********************************************/
      
      const response = await fetch(this.SAVE_CONV_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': this.tokenService.getAPIToken(),
        },
        credentials: 'include', // Include cookies
        body: JSON.stringify(data),
      })
      const responseData = await response.json();


      
     
      if (typeof responseData === typeof data) {
        if (responseData['savingStatus'] === 'OK'){
          ;
          responseData['savingStatus'] = 'Data saved successfully.'
          return  responseData as ConvertData;
          } else { return  responseData as ConvertData; }
      } else {
        console.error('Unreadable server response.');
        data.savingStatus = 'Unreadable server response.';
         return data;
      }
      
      //**********************************************/
      
    } catch (error) {
      console.error('Error during saving operation: ', error);
      data.savingStatus = 'Error during saving operation'
      return data
    }
  }
}
