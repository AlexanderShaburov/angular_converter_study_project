import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsrfTokenService {
  private CSRF_TOKEN_URL: string = 'https://127.0.0.1:8000/csrf-token/';
  public csrfAPIToken: string = '';
  private COOKIES_TAMPLATE: string = `csrftoken=${this.csrfAPIToken}; path=/; domain=127.0.0.1`;
  constructor() {}
  
  

  // Fetch the token from API:

  async retrieveAPIToken(): Promise<void> {
    
    try {
      const response = await fetch(this.CSRF_TOKEN_URL, {credentials: 'include'});
      if (response.ok) {
        const data =  await response.json();
        this.csrfAPIToken = data.csrfToken;
        document.cookie = this.COOKIES_TAMPLATE;
        ;
      } else {
        console.error("Error fetchin csrf token: ", response.status);
      }
    } catch (error) {
      console.error('Error fetching CSRF token: ', error);
    }
  }

  getAPIToken():string {
    return this.csrfAPIToken;
  }
}
