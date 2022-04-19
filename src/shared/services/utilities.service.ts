import { Injectable } from '@angular/core';
import { Devices } from '../interfaces/common.interface';
import { InnerWidth } from '../../shared/app.constants';
import { getRole, getToken, getIsGridLayout } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  setFullname(refUser: any): string {
    let fullName = '';
    if (refUser) {
      if (refUser.firstname) {
        fullName = refUser.firstname;
      }
      if (refUser.lastname) {
        fullName = fullName + ' ' + refUser.lastname;
      }
      if (!refUser.firstname && !refUser.lastname) {
        if (refUser.email) {
          fullName = fullName + ' ' + refUser.email;
        } else if (refUser.phone) {
          fullName = fullName + ' ' + refUser.phone;
        }
      }
    }
    fullName = fullName.trim();
    return fullName;
  }

  getDevice(): Devices {
    let devices: Devices;
    devices = {
      isMobile: false,
      isTablet: false,
      isNotebook: false,
      isPC: false,
      other: false,
    };

    if (window.innerWidth <= InnerWidth.XS) {
      devices.isMobile = true;
    } else if (window.innerWidth <= InnerWidth.SM) {
      devices.isTablet = true;
    } else if (window.innerWidth <= InnerWidth.MD) {
      devices.isNotebook = true;
    } else if (window.innerWidth <= InnerWidth.LG) {
      devices.isPC = true;
    } else {
      devices.other = true;
    }

    return devices;
  }

  setIsGridLayout(): boolean {
    const devices = this.getDevice();
    let isGridLayout = getIsGridLayout();
    if (isGridLayout === undefined) {
      if (devices.isMobile || devices.isTablet) {
        isGridLayout = true;
      } else {
        isGridLayout = false;
      }
    }
    return isGridLayout;
  }

  getRole(): any {
    return getRole();
  }

  getToken(): any {
    return getToken();
  }

  isValidEmail(email: string): boolean {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email && regex.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  isValidPhoneNumber(phone: string): boolean {
    var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (phone && regex.test(phone)) {
      return true;
    } else {
      return false;
    }
  }

  isValidNumber(number: string, digits: number): boolean {
    var regex = /^\d*$/;
    if (number && number.length <= digits && regex.test(number)) {
      return true;
    } else {
      return false;
    }
  }

  getWidthOfPopupCard(): number {
    let width = window.innerWidth;
    const devices = this.getDevice();
    switch (true) {
      case devices.isMobile:
        width = width * 0.85;
        break;
      case devices.isTablet:
        width = width * 0.7;
        break;
      case devices.isNotebook:
        width = width * 0.6;
        break;
      case devices.isPC:
        width = width * 0.5;
        break;
      case devices.other:
        width = width * 0.4;
        break;
      default:
        width = width * 0.5;
        break;
    }
    return width;
  }
  fillZero(value: any, digit: number): string {
    let text = '';
    const length = digit - value.toString().length;
    if (length) {
      for (let index = 0; index < length; index++) {
        text += '0';
      }
    }
    text += value;
    return text;
  }
  convertDate(date: Date): string {
    if (this.dateIsValid(date)) {
      const dateTime = this.convertDateTime(date);
      return dateTime.split(' ')[0];
    } else {
      return '';
    }
  }
  dateIsValid(date: Date): boolean {
    let isValid = false;
    if (date) {
      date = new Date(date);
      if (date.getUTCFullYear() > 1930) {
        isValid = true;
      }
    }
    return isValid;
  }
  convertDateTime(date: Date): string {
    if (this.dateIsValid(date)) {
      let text = '';
      date = new Date(date);
      text += this.fillZero(date.getDate(), 2);
      text += '/';
      text += this.fillZero(date.getMonth() + 1, 2);
      text += '/';
      text += date.getFullYear().toString();
      text += ' ';
      text += this.fillZero(date.getHours(), 2);
      text += ':';
      text += this.fillZero(date.getMinutes(), 2);
      return text;
    } else {
      return ''
    }
  }

  convertDateForExcel(date: Date): string {
    if (this.dateIsValid(date)) {
      const dateTime = this.convertDateTimeForExcel(date);
      return dateTime.split(' ')[0];
    } else {
      return '';
    }
  }

  convertDateTimeForExcel(date: Date): string {
    if (this.dateIsValid(date)) {
      let text = '';
      date = new Date(date);
      text += this.fillZero(date.getDate(), 2);
      text += '.';
      text += this.fillZero(date.getMonth() + 1, 2);
      text += '.';
      text += date.getFullYear().toString();
      text += ' ';
      text += this.fillZero(date.getHours(), 2);
      text += ':';
      text += this.fillZero(date.getMinutes(), 2);
      return text;
    } else {
      return ''
    }
  }

  convertDateToPopup(date: string) {
    if (date) {
      let year =  date.substring(6, 10);
      let month = date.substring(3, 5);
      let day = date.substring(0, 2);
      let text = year+'-'+month+'-'+day
      return text;
    } else {
      return ''
    }
  }

  convertDateFromSystem(date: Date): string {
    if (this.dateIsValid(date) && date.toString() !== '1970-01-01T00:00:00.000Z') {
      const dateTime = this.convertDateTimeFromSystem(date);
      return dateTime.split(' ')[0];
    } else {
      return '';
    }
  }
  convertDateTimeFromSystem(date: Date): string {
    if (this.dateIsValid(date)) {
      if (this.isIsoDate(date)) {
        let text = '';
        const dateArray = date.toString().split('T')[0].split('-');
        const TimeArray = date.toString().split('T')[1].split('.')[0].split(':');
        text += dateArray[2];
        text += '/';
        text += dateArray[1];
        text += '/';
        text += dateArray[0];
        text += ' ';
        text += TimeArray[0];
        text += ':';
        text += TimeArray[1];
        return text;
      } else {
        return date.toString();
      }
    } else {
      return '';
    }
  }
  convertDateActiveFromPopup(date: string): string {
    if (date) {
      let dateFormat =  date.substring(0, 10);
      return dateFormat;
    } else {
      return ''
    }
  }

  isIsoDate(str:any) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    var d = new Date(str);
    return d.toISOString() === str;
  }
} 
