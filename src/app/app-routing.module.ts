import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { ContributionFormComponent } from '@app/contribution-form/contribution-form.component';
import { ContributeComponent } from '@app/contribute/contribute.component';
import { MapComponent } from '@app/map/map.component';
import { ThankYouComponent } from '@app/thank-you/thank-you.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'inscripcion',
        component: ContributeComponent,
        children: [
          { path: 'thank-you', component: ThankYouComponent },
          { path: '', component: ContributionFormComponent }
        ]
      },
      { path: '', component: MapComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
