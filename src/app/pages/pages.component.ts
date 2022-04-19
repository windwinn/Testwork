import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NbMenuItem, NbSidebarService, NbMenuService } from '@nebular/theme';
import { getToken, getUser, setAuthentication, getLanguage, setLanguage, getExpireBase, getAuthorizationDisplay } from 'src/shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { DataSharingService } from 'src/shared/services/dataSharing.service';
import { Devices } from 'src/shared/interfaces/common.interface';
import { UtilitiesService } from 'src/shared/services/utilities.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pages',
  template: `

  <nb-layout>
    <nb-layout-column style="padding: 0;">
        <router-outlet></router-outlet>
    </nb-layout-column>
  </nb-layout>

  `,
  styleUrls: ['./page.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(
  ) {

  }
  ngOnInit(): void {
  }

}
