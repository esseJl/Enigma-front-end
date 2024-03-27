import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSortModule} from "@angular/material/sort";
import {MatStepperModule} from "@angular/material/stepper";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatCommonModule, MatNativeDateModule} from "@angular/material/core";
import {RouterModule} from "@angular/router";
import {CustomNgxDatetimeAdapter} from "./custom-ngx-date-time-adapter";
import {HomeComponent} from "./home/home.component";
import {OrderComponent} from "./order/order/order.component";
import {CandleProcessPickerComponent} from "./candle-process-picker/candle-process-picker.component";
import {UploadDxyComponent} from "./upload/upload-dxy/upload-dxy.component";
import {UploadMinRealComponent} from "./upload/upload-min-real/upload-min-real.component";
import {UploadWeekRealComponent} from "./upload/upload-week-real/upload-week-real.component";
import {UploadWeekPreComponent} from "./upload/upload-week-pre/upload-week-pre.component";
import {CandleDayHomeComponent} from "./day/candle-day-home/candle-day-home.component";
import {UploadOrderN1d1Component} from "./upload/upload-order/upload-order-n1d1/upload-order-n1d1.component";
import {UploadDayRealComponent} from "./upload/upload-day-real/upload-day-real.component";
import {UploadHourRealComponent} from "./upload/upload-hour-real/upload-hour-real/upload-hour-real.component";
import {UploadHourPreComponent} from "./upload/upload-hour-pre/upload-hour-pre/upload-hour-pre.component";
import {DxyWeekHomeComponent} from "./dxy/week/dxy-week-home/dxy-week-home.component";
import {UploadDayPreComponent} from "./upload/upload-day-pre/upload-day-pre.component";
import {CandleWeekHomeComponent} from "./week/candle-week-home/candle-week-home.component";
import {CandleDayHourlyComponent} from "./day/candle-day-hourly/candle-day-hourly.component";
import {UploadComponent} from "./upload/upload-hour/upload.component";
import {UploadCandleHourlyComponent} from "./upload/upload-candle-hourly/upload-candle-hourly.component";
import {DxyDayHomeComponent} from "./dxy/day/dxy-day-home/dxy-day-home.component";
import {ConditionHomeComponent} from "./condition/condition-home/condition-home.component";
import {CandleHourHomeComponent} from "./hour/candle-hour-home/candle-hour-home.component";
import {ConditionListComponent} from "./condition/condition-list/condition-list.component";
import {ConditionModificationComponent} from "./condition/condition-modification/condition-modification.component";
import {ConditionTableComponent} from "./condition/condition-table/condition-table.component";
import {CandleTempComponent} from "./candle-temp/candle-temp.component";
import {OrderModificationComponent} from "./order/order-modification/order-modification.component";
import {DxyWeekComponent} from "./dxy/week/dxy-week/dxy-week.component";
import {DxyDayComponent} from "./dxy/day/dxy-day/dxy-day.component";
import {OrderTableComponent} from "./order/order-table/order-table.component";
import {ChartComponent} from "./chart/chart.component";
import {CandleProcessComponent} from "./candle-process/candle-process.component";
import {CandleWeekModificationComponent} from "./week/candle-week-modification/candle-week-modification.component";
import {DeleteAlarmComponent} from "./delete-alarm/delete-alarm.component";
import {CandleHourComponent} from "./hour/candle-hour/candle-hour.component";
import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateAdapter,
  NgxMatDateFormats,
  NgxMatDatetimePickerModule, NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {CandleDayComponent} from "./day/candle-day/candle-day.component";
import {CandleWeekComponent} from "./week/candle-week/candle-week.component";
import {CandleDayListComponent} from "./day/candle-day-list/candle-day-list.component";
import {CandleHourModificationComponent} from "./hour/candle-hour-modification/candle-hour-modification.component";
import {CandleDayModificationComponent} from "./day/candle-day-modification/candle-day-modification.component";
import {NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS} from "@angular-material-components/moment-adapter";
import {MomentDateModule} from "@angular/material-moment-adapter";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {MatChipsModule} from "@angular/material/chips";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {EnigmaComponent} from "./enigma/enigma.component";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "./init/keycloak-init.factory";
import {AuthGuard} from "./guard/auth.guard";
import {TradeAccountTableComponent} from './trade-account/trade-account-table/trade-account-table.component';
import {
  TradeAccountModificationComponent
} from "./trade-account/trade-account-modification/trade-account-modification.component";

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

// If using Moment
const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS'
  },
  display: {
    dateInput: 'YYYY-MM-DD HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@NgModule({
  declarations: [
    AppComponent,
    CandleHourComponent,
    CandleDayComponent,
    CandleWeekComponent,
    CandleDayHomeComponent,
    CandleHourHomeComponent,
    CandleWeekHomeComponent,
    DeleteAlarmComponent,
    CandleWeekModificationComponent,
    CandleDayListComponent,
    HomeComponent,
    CandleProcessComponent,
    ChartComponent,
    CandleHourModificationComponent,
    CandleDayModificationComponent,
    CandleProcessPickerComponent,
    UploadComponent,
    UploadDayPreComponent,
    UploadDayRealComponent,
    UploadWeekPreComponent,
    UploadWeekRealComponent,
    UploadMinRealComponent,
    UploadHourPreComponent,
    UploadHourRealComponent,
    OrderComponent,
    OrderTableComponent,
    UploadOrderN1d1Component,
    DxyDayHomeComponent,
    DxyWeekHomeComponent,
    DxyDayComponent,
    DxyWeekComponent,
    UploadDxyComponent,
    CandleDayHourlyComponent,
    UploadCandleHourlyComponent,
    OrderModificationComponent,
    CandleTempComponent,
    ConditionTableComponent,
    ConditionHomeComponent,
    ConditionModificationComponent,
    ConditionListComponent,
    EnigmaComponent,
    TradeAccountTableComponent,
    TradeAccountModificationComponent
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatChipsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSortModule,
    MomentDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatNativeDateModule,
    NgxMatNativeDateModule,
    MatStepperModule,
    MatSelectModule,
    MatCommonModule,

    RouterModule.forRoot([
      {path: 'trade-account', component: TradeAccountTableComponent, canActivate: [AuthGuard]},
      {path: 'dxy-week', component: DxyWeekHomeComponent, canActivate: [AuthGuard]},
      {path: 'dxy-day', component: DxyDayHomeComponent, canActivate: [AuthGuard]},
      {path: 'hour', component: CandleHourHomeComponent, canActivate: [AuthGuard]},
      {path: 'day', component: CandleDayHomeComponent, canActivate: [AuthGuard]},
      {path: 'day-hourly', component: CandleDayHourlyComponent, canActivate: [AuthGuard]},
      {path: 'week', component: CandleWeekHomeComponent, canActivate: [AuthGuard]},
      {path: 'upload-order-daily', component: UploadOrderN1d1Component, canActivate: [AuthGuard]},
      {path: 'upload-hour', component: UploadComponent, canActivate: [AuthGuard]},
      {path: 'upload-hour-predict', component: UploadHourPreComponent, canActivate: [AuthGuard]},
      {path: 'upload-hour-real', component: UploadHourRealComponent, canActivate: [AuthGuard]},
      {path: 'upload-hourly', component: UploadCandleHourlyComponent, canActivate: [AuthGuard]},
      {path: 'upload-day-pre', component: UploadDayPreComponent, canActivate: [AuthGuard]},
      {path: 'upload-day-real', component: UploadDayRealComponent, canActivate: [AuthGuard]},
      {path: 'upload-week-pre', component: UploadWeekPreComponent, canActivate: [AuthGuard]},
      {path: 'upload-week-real', component: UploadWeekRealComponent, canActivate: [AuthGuard]},
      {path: 'upload-min-real', component: UploadMinRealComponent, canActivate: [AuthGuard]},
      {path: 'upload-dxy', component: UploadDxyComponent, canActivate: [AuthGuard]},
      {path: 'reportage', component: CandleProcessPickerComponent, canActivate: [AuthGuard]},
      {path: 'orders', component: OrderComponent, canActivate: [AuthGuard]},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: '', component: EnigmaComponent, canActivate: [AuthGuard]},
    ]),
    MatCheckboxModule,
    MatSlideToggleModule,
    MatCardModule,
    MatChipsModule
  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS}
    ,
    {
      provide: NgxMatDateAdapter,
      useClass: CustomNgxDatetimeAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
