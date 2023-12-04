import {Injectable, WritableSignal, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseType, User, UserState} from '../data-types';

export type JWT = {
  _id: string,
  fullname: string,
  email: string
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private static readonly SERVER_URL = `http://localhost:3000`;

  userStateSignal: WritableSignal<UserState> = signal({_id: '', fullname: '', email: '', jwt: ''});

  constructor(private http: HttpClient) {
    const state = localStorage.getItem('STORAGE_JWT');
    if (state) {
      this.userStateSignal.set(JSON.parse(state));
    }
  }

  isLoggedIn() {
    return !!this.userStateSignal().jwt;
  }

  signup(user: User): Observable<ResponseType> {
    return this.http.post<ResponseType>(AuthService.SERVER_URL + `/users/signup`, user);
  }

  signout() {
    this.userStateSignal.set({_id: '', fullname: '', email: '', jwt: ''});
    localStorage.clear();
  }

  signin(user: User): Observable<any> {
    return this.http.post<ResponseType>(AuthService.SERVER_URL + `users/signin`, user)
  }
}
