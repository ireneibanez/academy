import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { GridModule, PagerModule } from '@syncfusion/ej2-angular-grids';
import { SharedModule } from './shared/shared.module';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { CommonModule } from '@angular/common';
import { DatePickerModule, MaskedDateTimeService } from '@syncfusion/ej2-angular-calendars';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule, 
    AppRoutingModule,
    SharedModule,
    GridModule, 
    PagerModule,
    ButtonModule,
    DatePickerModule,
    CheckBoxModule
  ],
  providers: [MaskedDateTimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
