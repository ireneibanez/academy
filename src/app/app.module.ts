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
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
    CheckBoxModule,
    MultiSelectModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
