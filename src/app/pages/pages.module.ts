import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { NbThemeModule, NbToastrModule, NbLayoutModule, NbPopoverModule, NbButtonModule, NbCardModule, NbIconModule, NbSidebarModule, NbMenuModule, NbUserModule, NbActionsModule, NbContextMenuModule, NbInputModule, NbDatepickerModule, NbSelectModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbSidebarModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbContextMenuModule,
    NbPopoverModule,
    NbToastrModule,
    NbInputModule,
    NbDatepickerModule.forRoot(),
    NbSelectModule,
    NbDateFnsDateModule.forChild({ format: 'dd/MM/yyyy' }),

    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatCheckboxModule,
    TranslateModule,
    NgbModule,

    HttpClientModule,
  ],
  providers: [],
})
export class PagesModule { }
