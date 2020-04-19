import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HowToDownloadComponent } from './how-to-download/how-to-download.component';
import { MySessionsComponent } from './my-sessions/my-sessions.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'home',   redirectTo: '/', pathMatch: 'full' },
  { path: 'download', component: HowToDownloadComponent },
  { path: 'sessions', component: MySessionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
