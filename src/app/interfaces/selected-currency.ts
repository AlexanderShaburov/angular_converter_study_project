import { SafeHtml } from "@angular/platform-browser";

export interface SelectedCurrency {
    code: string;
    symbol:string;
    flag:SafeHtml;
    name:string;
    rate:number;
}