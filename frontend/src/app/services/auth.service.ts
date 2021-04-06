import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignInRequest } from '../models/user/SignInRequest';
import { JwtResponse } from '../models/user/JwtResponse';
import { SignUpRequest } from '../models/user/SignUpRequest';
import { User } from '../models/user/User';
import jwt_decode, { JwtPayload } from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = '';
  isAuth = new BehaviorSubject<boolean>(false);
  userSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    if (isDevMode()) {
      this.baseUrl = 'http://localhost:8080/api/auth';
    }
  }

  initAuth() {
    const token = this.getToken();
    const jwtPayload: JwtPayload = jwt_decode(token);
    let JWT_EXP = ((jwtPayload.exp as unknown) as number) * 1000;
    const NOW = Date.now();
    const EXP_LIMIT = 0;

    if (JWT_EXP - NOW < EXP_LIMIT) {
      this.signOut();
    } else {
      const cachedUser = this.getUserFromStorage();
      this.isAuth.next(true);
      this.userSubject.next(cachedUser);
    }
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  getAuth(): Observable<boolean> {
    return this.isAuth.asObservable();
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  async signIn(signInRequest: SignInRequest) {
    const jwtResponse: JwtResponse = await this.http
      .post<JwtResponse>(this.baseUrl + '/signin', signInRequest)
      .toPromise();
    const newUser: User = {
      id: jwtResponse.id,
      email: jwtResponse.email,
      roles: jwtResponse.roles,
      username: jwtResponse.username,
    };
    this.saveToken(jwtResponse.token);
    this.saveUser(newUser);
    this.userSubject.next(newUser);
    this.isAuth.next(true);
  }

  signUp(signUpRequest: SignUpRequest): void {
    this.http.post<JwtResponse>(this.baseUrl + '/signup', signUpRequest);
  }

  signOut(): void {
    sessionStorage.clear();
    this.isAuth.next(false);
    this.userSubject.next(null);
  }

  saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  }

  saveUser(user: User): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromStorage(): User {
    return (sessionStorage.getItem(USER_KEY) as unknown) as User;
  }
}