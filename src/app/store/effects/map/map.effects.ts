import { RoutePoint } from '@model/route-point';
import { Injectable, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { switchMap, map, tap, catchError, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RoutesService } from '@services/routes.service';

import * as mapActions from '@store/actions/map/map.actions';
import { ContributionsService } from '@app/services/contributions.service';
import { JourneyContribution } from '@app/model/journey-contribution';

@Injectable()
export class MapEffects {


  constructor(
    private actions$: Actions,
    private routesService: RoutesService,
    private contributionsService: ContributionsService) { }

  @Effect()
  loadFullRoute$: Observable<Action> = this.actions$.pipe(
    ofType(mapActions.loadRoutes.type),
    switchMap(() => this.routesService.getFullRoute()
      .pipe(
        map((routes) => mapActions.loadRoutesSuccess({ routes }))
      ))
  );

  @Effect()
  loadJourneyContributions$: Observable<Action> = this.actions$.pipe(
    ofType(mapActions.loadJourneyContributions.type),
    switchMap(() => this.contributionsService.getJourneyContributions()
      .pipe(
        map((contributions) => mapActions.loadJourneyContributionsSuccess({ contributions: contributions }))
      ))
  );

}
