import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRouter } from './app.router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './modules/custom-material-modules';
import { MontecarloComponent } from './components/montecarlo/montecarlo.component';
import { UIContext } from './ui.context';
import { EulerComponent } from './components/euler/euler.component';


@NgModule({
  declarations: [
    AppComponent,
    MontecarloComponent,
    EulerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRouter),
  ],
  providers: [ UIContext],
  bootstrap: [AppComponent]
})
export class AppModule { }
