import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { MongoHandlerService } from './mongo-handler.service';
import { SnackbarService } from './snackbar.service';
import { ILDAPData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  // Store userData in memory for re-auth on locked routes (e.g. admin page)
  private loginData: {
    username: string;
    password: string;
    isCached: boolean;
  } = {
      username: '',
      password: '',
      isCached: false,
    };

  private ldapData: ILDAPData | undefined;

  private isUserAuthenticatedSubject = new ReplaySubject<boolean>();
  public isUserAuthenticatedObservable = this.isUserAuthenticatedSubject.asObservable();

  constructor(
    private mongo: MongoHandlerService,
    private snackbar: SnackbarService) {
    this.mongo
      .isAuthorized()
      .then(result => {
        console.log(result);
        if (result.status === 'ok') {
          this.ldapData = result;
          this.snackbar.showMessage(`Logged in as ${result.fullname}`);
          this.isUserAuthenticatedSubject.next(true);
        } else {
          this.isUserAuthenticatedSubject.next(false);
        }
      })
      .catch(err => {
        console.error(err);
        this.isUserAuthenticatedSubject.next(false);
      });
  }

  public async attemptLogin(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.mongo.login(username, password)
        .then(result => {
          if (result.status === 'ok') {
            this.ldapData = result;
            this.snackbar.showMessage(`Logged in as ${result.fullname}`);
            this.loginData = {
              username, password,
              isCached: true,
            };
            this.isUserAuthenticatedSubject.next(true);
            resolve(true);
          } else {
            this.isUserAuthenticatedSubject.next(false);
            resolve(false);
          }
        })
        .catch(err => {
          console.error(err);
          this.isUserAuthenticatedSubject.next(false);
          reject(false);
        });
    });
  }

  public logout() {
    this.mongo.logout()
      .then(() => {})
      .catch(err => console.error(err));
    this.loginData = {
      username: '',
      password: '',
      isCached: false,
    };
    this.isUserAuthenticatedSubject.next(false);
  }
}