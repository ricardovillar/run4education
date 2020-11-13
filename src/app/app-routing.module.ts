import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: '', pathMatch: 'full', redirectTo: 'map' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
