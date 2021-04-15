import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignInRequest } from '../models/user/SignInRequest';
import { JwtResponse } from '../models/user/JwtResponse';
import { SignUpRequest } from '../models/user/SignUpRequest';
import { User } from '../models/user/User';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Role } from '../models/user/Role';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

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
    if (token) {
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
      .post<JwtResponse>(this.baseUrl + '/signin', signInRequest, httpOptions)
      .toPromise();
    const newUser: User = {
      id: jwtResponse.id,
      email: jwtResponse.email,
      roles: jwtResponse.roles.map((role) => new Role(0, role)),
      username: jwtResponse.username,
    };
    this.saveToken(jwtResponse.token);
    this.saveUser(newUser);
    this.userSubject.next(newUser);
    this.isAuth.next(true);
  }

  async signUp(signUpRequest: SignUpRequest): Promise<void> {
    await this.http
      .post(this.baseUrl + '/signup', signUpRequest, httpOptions)
      .toPromise();
  }

  signOut(): void {
    localStorage.clear();
    this.isAuth.next(false);
    this.userSubject.next(null);
  }

  saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  saveUser(user: User): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromStorage(): User {
    return JSON.parse(<string>localStorage.getItem(USER_KEY));
  }
}
