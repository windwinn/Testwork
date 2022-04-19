import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {

  private languageSource = new BehaviorSubject(null);
  currentLanguage = this.languageSource.asObservable();
  private userTokenSoruce = new BehaviorSubject(null);
  currentUserToken = this.userTokenSoruce.asObservable();
  private resetTokenSoruce = new BehaviorSubject(null);
  currentResetToken = this.resetTokenSoruce.asObservable();
  constructor() {
  }
  

  
  languageSwitch(language: any) {
    this.languageSource.next(language)
  }

  userTokenChange(token: any) {
    this.userTokenSoruce.next(token);
  }

  resetTokenChange(token: any) {
    this.resetTokenSoruce.next(token);
  }

}
