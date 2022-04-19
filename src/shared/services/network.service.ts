import { environment } from '../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { ApiResponse } from '../interfaces/common.interface';
import * as authService from '../services/auth.service';
import { DataSharingService } from './dataSharing.service';
export const API_URI: string = environment.API_URI;

export type UrlParams = Map<string, string>;

export class NetworkService {
  protected _serviceName: string;
  protected _handleError: HandleError;
  constructor(
    serviceName: string,
    protected httpClient: HttpClient,
    protected errorHandler: HttpErrorHandler,
    protected dataSharingService: DataSharingService
  ) {
    this._serviceName = serviceName;
    this._handleError = errorHandler.createHandleError(this._serviceName);
  }

  protected get = (uri: string, criteria: any = undefined): Observable<ApiResponse> => {
    if (!criteria) {
      return this.httpClient.get<ApiResponse>(`${API_URI}/${uri}`, {
        headers: this.getHeaders(), observe: 'response', withCredentials: false
      }).pipe(
        map(response => {
          this.tokenTimeOut();
          return {
            code: response.status,
            message: response.body?.message,
            data: response.body?.data,
            totalDataSize: response?.body?.totalDataSize
          };
        }),
        catchError(err => {
          this.tokenTimeOut(err.status);
          this._handleError('get', this.ErrorResponse());
          return throwError(err);
        })
      );
    } else {
      return this.httpClient.get<ApiResponse>((criteria._id) ?
        `${API_URI}/${uri}?_id=${criteria._id}`
        : `${API_URI}/${uri}${criteria}`
        , {
          headers: this.getHeaders(), observe: 'response', withCredentials: false
        }).pipe(
          map(response => {
            this.tokenTimeOut();
            return {
              code: response.status,
              message: response.body?.message,
              data: response.body?.data || [],
              totalDataSize: response.body?.totalDataSize
            };
          }),
          catchError(err => {
            this.tokenTimeOut(err.status);
            this._handleError('get', this.ErrorResponse());
            return throwError(err);
          })
        );
    }
  }

  protected post = (uri: string, data: any): Observable<ApiResponse> => {
    return this.httpClient.post<ApiResponse>(`${API_URI}/${uri}`, data, {
      headers: this.getHeaders(), observe: 'response', withCredentials: false
    }).pipe(
      map(response => {
        this.tokenTimeOut();
        return {
          code: response.status,
          message: response.body?.message,
          data: response.body?.data || [],
          totalDataSize: response.body?.totalDataSize,
          status: response.body?.status
        };
      }),
      catchError(err => {
        this.tokenTimeOut(err.status);
        this._handleError('post', this.ErrorResponse());
        return throwError(err);
      })
    );
  }

  protected put = (uri: string, data: any): Observable<ApiResponse> => {
    return this.httpClient.put<ApiResponse>(`${API_URI}/${uri}`, data, {
      headers: this.getHeaders(), observe: 'response', withCredentials: false
    }).pipe(
      map(response => {
        this.tokenTimeOut();
        return {
          code: response.status,
          message: response.body?.message,
          data: response.body?.data || []
        };
      }),
      catchError(err => {
        this.tokenTimeOut(err.status);
        this._handleError('put', this.ErrorResponse());
        return throwError(err);
      })
    );
  }

  protected patch = (uri: string, data: any): Observable<ApiResponse> => {
    return this.httpClient.patch<ApiResponse>(`${API_URI}/${uri}`, data, {
      headers: this.getHeaders(), observe: 'response', withCredentials: false
    }).pipe(
      map(response => {
        this.tokenTimeOut();
        return {
          code: response.status,
          status: response.body?.status,
          message: response.body?.message,
          data: response.body?.data,
        };
      }),
      catchError(err => {
        this.tokenTimeOut(err.status);
        this._handleError('patch', this.ErrorResponse());
        return throwError(err);
      })
    );
  }

  protected delete = (uri: string): Observable<ApiResponse> => {
    return this.httpClient.delete<ApiResponse>(`${API_URI}/${uri}`, {
      headers: this.getHeaders(), observe: 'response', withCredentials: false
    }).pipe(
      map(response => {
        this.tokenTimeOut();
        return {
          code: response.status,
          message: response.body?.message,
          data: response.body?.data || [],
          status: response.body?.status
        };
      }),
      catchError(err => {
        this.tokenTimeOut(err.status);
        this._handleError('delete', this.ErrorResponse());
        return throwError(err);
      })
    );
  }

  protected getNavigateUrl = (url: string, params: UrlParams) => {
    params.forEach((key: string, value: string) => {
      url = url.replace(`{${key}}`, value);
    });
    return url;
  }

  private getHeaders = (): HttpHeaders => {
    const authToken = authService.getToken();
    let headers: HttpHeaders;
    if (authToken) {
      headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`);
      // .set('x-access-token', `${authToken}`);
    } else {
      headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    }
    return headers;
  }

  protected ErrorResponse(): ApiResponse {
    console.log("Check Error")
    return <ApiResponse>{
      data: undefined,
      code: 900,
      message: ''
    };
  }

  tokenTimeOut(data: any = undefined) {
    this.dataSharingService.resetTokenChange(true)
    if (data === 400) {
      authService.setAuthentication();
      this.dataSharingService.userTokenChange(true);
    }
  }
}
