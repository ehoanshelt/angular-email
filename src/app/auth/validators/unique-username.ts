import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UniqueUsername implements AsyncValidator {
  constructor(private authService : AuthService){}

  validate = (control: AbstractControl) => {
    const { value } = control;

    return this.authService.usernameAvailable(value).pipe(
      map(() => {
        // This API call only sends success or failure.
        // We don't care about the value. if we did we can add (value)
        // But because we don't, we always return null if success
        return null;
      }),
      catchError((err) => {
        // if API sends back error, map above is skipped and this is run
        if(err.error.username){
          return of({ nonUniqueUsername: true })
        }else{
          return of({ noConnection: true })
        }
      })
    );
  }
}
