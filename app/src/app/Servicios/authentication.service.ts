import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../Modelos/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<LoginRequest>;
  public currentUser: Observable<LoginRequest>;
  resourceUrl: string;
  constructor(private httpClient: HttpClient, private loginRequest:LoginRequest) {
    this.currentUserSubject = new BehaviorSubject<LoginRequest>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.resourceUrl='https://localhost:44368/api/login/authenticate';
  }

  public get currentUserValue(): LoginRequest {
    return this.currentUserSubject.value; 
  }

  login(username: string, password: string): Observable<any> {
    //const pass = bcrypt.hashSync(password);

    return this.httpClient.post<any>(this.resourceUrl, { username, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.loginRequest.Username=username;
        this.loginRequest.Password=password;
        localStorage.setItem('loginRequest', JSON.stringify(this.loginRequest))
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('domicilio');
    localStorage.removeItem('loginRequest');
    this.currentUserSubject.next(null);
  }
}
