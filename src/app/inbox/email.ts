export interface Email{
  id: string,
  subject: string,
  text: string,
  to: string,
  from: string,
  html: string
}

export interface EmailSummary {
  id: string,
  subject:string;
  from: string
}
