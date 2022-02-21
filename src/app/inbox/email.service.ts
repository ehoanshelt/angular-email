import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email, EmailSummary } from './email';



@Injectable({
  providedIn: 'root'
})

export class EmailService {
    rootUrl: string = "https://api.angular-email.com";

  constructor(private http : HttpClient) { }

  getEmails(){
    return this.http.get<EmailSummary[]>(this.rootUrl + '/emails');
  }

  getEmail(id:string){
    return this.http.get<Email>(this.rootUrl + '/emails/' + id);
  }
}
