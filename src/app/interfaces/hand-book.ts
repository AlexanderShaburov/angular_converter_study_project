
import { SafeHtml } from "@angular/platform-browser";

export interface HandBook {
    [key:string]:{
        "symbol":string;
        "flag":SafeHtml;
	    "name":string;
        "rate":number;
    }
};
