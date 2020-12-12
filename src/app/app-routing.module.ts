import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { ContributionComponent } from '@app/contribution/contribution.component';
import { ContributeComponent } from '@app/contribute/contribute.component';
import { MapComponent } from '@app/map/map.component';
import { ThankYouComponent } from '@app/thank-you/thank-you.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: 'contribution', component: ContributionComponent },
      { path: 'inscripcion', component: ContributeComponent },
      { path: 'thank-you', component: ThankYouComponent },
      { path: '', component: MapComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
