import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface CredentialsRequest{
  username: string,
  password: string,
  passwordConfirmation: string
}

interface SigninRequest{
  username: string,
  password: string
}

interface CredentialsResponse{
  username:string
}

interface SignedinResponse{
  authenticated:boolean,
  username: string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  rootUrl: string = "https://api.angular-email.com";
  signedin$ = new BehaviorSubject<any>(null);
  username:string = '';

  constructor( private http: HttpClient) { }

  usernameAvailable(username:string){
    return this.http.post<any>(this.rootUrl + '/auth/username', {
      username
    })
  }

  signup(credentials:CredentialsRequest){
    return this.http.post<CredentialsResponse>(
      this.rootUrl + '/auth/signup',
      credentials
    ).pipe(
      tap(({username}) =>{
        this.signedin$.next(true);
        this.username = username;
      })
    )
  }

  signin(credentials:SigninRequest){
    return this.http.post<CredentialsResponse>(
      this.rootUrl + '/auth/signin',
      credentials
    ).pipe(
      tap(({username}) =>{
        this.signedin$.next(true);
        this.username = username;
      })
    )
  }

  checkAuth(){
    return this.http.get<SignedinResponse>(
      this.rootUrl + '/auth/signedin'
    ).pipe(
      tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username = username;
      })
    )
  }

  signout(){
    return this.http.post<any>(this.rootUrl + '/auth/signout', {})
    .pipe(
      tap(() => {
        this.signedin$.next(false)
      })
    )
  }


}
