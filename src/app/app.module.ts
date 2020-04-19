import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { HomeComponent } from './home/home.component';
import { HowToDownloadComponent } from './how-to-download/how-to-download.component';
import { MySessionsComponent } from './my-sessions/my-sessions.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HowToDownloadComponent,
    MySessionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    NgxBootstrapSliderModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
