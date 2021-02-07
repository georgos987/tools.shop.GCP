import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ip } from 'src/app/modules/ip';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private ip = Ip.IP;
  private baseUrl: string = `${this.ip}`
  constructor(private http: HttpClient) { }

  ClearLocalStorgeAfter12Hour() {
    let lastclear = localStorage.getItem('lastclear');
    let lastclearNumber: number = + lastclear;
    let time_now = (new Date()).getTime();
    if ((time_now - lastclearNumber) > 1000 * 60 * 60 * 12) {
      localStorage.clear();
      localStorage.setItem('lastclear', JSON.stringify(time_now));
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    return localStorage.setItem('token', token);
  }

  login(usernameOrEmail: string ,password: string): Observable<any> {

    let userPasswrord ={
      "usernameOrEmail": usernameOrEmail,
      "password": password
    }
    console.log(userPasswrord)
    return this.http.post(`${this.baseUrl}/api/auth/signin`, userPasswrord, { observe: 'response' });

  }

  singUp(username: string ,email : string ,password: string): Observable<any> {
    let userPasswrord ={
      "name": username,
      "username": username ,
      "email": email,
      "password": password
    }
    return this.http.post(`${this.baseUrl}/api/auth/signup`, userPasswrord, { responseType: "text" });
  }

  

  // getIsValid(): Observable<any> {
  //   let token = this.getToken();
  //   return this.http.post(`${this.baseUrl}/isvalid`, token, { responseType: "text" });
  // }

}
