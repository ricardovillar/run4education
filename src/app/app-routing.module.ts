import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { ContributionComponent } from '@app/contribution/contribution.component';
import { MapComponent } from '@app/map/map.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: 'contribute', component: ContributionComponent },
      { path: '', component: MapComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
