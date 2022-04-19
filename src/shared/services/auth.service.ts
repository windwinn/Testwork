import {
  IsGridLayout,
  Url,
  Token,
  User,
  Language,
  Expired,
  ExpiredRemain,
  AuthDisplay
} from '../app.constants';
import { Authentication as IAuthentication } from '../interfaces/common.interface';

export function setAuthentication(authentication?: IAuthentication): void {
  if (authentication) {
    localStorage.setItem(Token, JSON.stringify(authentication));
  } else {
    localStorage.removeItem(Token);
  }
}

export function getAuthentication(): IAuthentication {
  const token: IAuthentication = JSON.parse(localStorage.getItem(Token) || '');
  return (!token || token === null) ? {
    token: '',
    role: ''
  } : token;
}

export function getToken(): string {
  const token = localStorage.getItem(Token);
  const tokenGet = token !== null ? JSON.parse(token) : undefined;
  return tokenGet?.token;
}

export function getRole(): any {
  const token: IAuthentication = JSON.parse(localStorage.getItem(Token) || '');
  return (!token || token === null) ? undefined : token.role;
}

export function setUrl(url: string = '') {
  localStorage.setItem(Url, JSON.stringify(url));
}

export function getUrl() {
  const url = JSON.parse(localStorage.getItem(Url) || '');
  return (!url || url === null || url === '/') ? undefined : url;
}

export function getIsGridLayout() {
  const isGridLayout = JSON.parse(localStorage.getItem(IsGridLayout) || '');
  return (isGridLayout === undefined || isGridLayout === null) ? undefined : isGridLayout;
}

export function setUser(user: any) {
  localStorage.setItem(User, JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem(User);
  const userGet = user !== null ? JSON.parse(user) : undefined;
  return userGet;
}

export function setLanguage(language: string = '') {
  localStorage.setItem(Language, language);
}

export function getLanguage() {
  const language = localStorage.getItem(Language);
  return (!language || language === null) ? '' : language;
}

export function setExpireBase(time: any = '') {
  localStorage.setItem(Expired, time);
}

export function getExpireBase() {
  const time = localStorage.getItem(Expired);
  return (!time || time === null) ? '' : time;
}

export function setExpireRemain(time: any = '') {
  localStorage.setItem(ExpiredRemain, time);
}

export function getExpireRemain() {
  const time = localStorage.getItem(ExpiredRemain);
  return (!time || time === null) ? '' : time;
}

export function setAuthorizationDisplay(authEditable: any) {
  localStorage.setItem(AuthDisplay, JSON.stringify(authEditable));
}

export function getAuthorizationDisplay() {
  const auth = localStorage.getItem(AuthDisplay);
  const authGet = auth !== null ? JSON.parse(auth) : undefined;
  return authGet;
}