import { RoutesService } from './services/routes.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@app/app.component';
import { MapComponent } from '@app/map/map.component';
import { ContributionComponent } from '@app/contribution/contribution.component';
import { ThankYouComponent } from '@app/thank-you/thank-you.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '@store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from '@store/effects/app.effects';
import { MapEffects } from '@store/effects/map/map.effects';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ContributionComponent,
    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    LeafletModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects, MapEffects])
  ],
  providers: [RoutesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
