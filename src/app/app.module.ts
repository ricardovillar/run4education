import { RoutesService } from './services/routes.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RECAPTCHA_V3_SITE_KEY, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaV3Module, RecaptchaModule } from "ng-recaptcha";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@app/app.component';
import { MapComponent } from '@app/map/map.component';
import { ContributeComponent } from '@app/contribute/contribute.component';
import { ThankYouComponent } from '@app/thank-you/thank-you.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '@store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from '@store/effects/app.effects';
import { MapEffects } from '@store/effects/map/map.effects';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ContributionFormComponent } from './contribution-form/contribution-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ContributeComponent,
    ThankYouComponent,
    ContributionFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LeafletModule,
    YouTubePlayerModule,
    RecaptchaModule,
    RecaptchaV3Module,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects, MapEffects]),
    FontAwesomeModule
  ],
  providers: [
    RoutesService,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.RECAPTCHA_SITE_KEY
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.RECAPTCHA_SITE_KEY, size: 'invisible' } as RecaptchaSettings,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
