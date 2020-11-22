import { JourneyContribution } from '@app/model/journey-contribution';
import { RoutePoint } from '@model/route-point';
import { createAction, props } from '@ngrx/store';

export const loadRoutes = createAction(
  '[Route] Load Routes'
);

export const loadRoutesSuccess = createAction(
  '[Route] Load Routes Success',
  props<{ routes: RoutePoint[] }>()
);

export const loadRoutesFailure = createAction(
  '[Route] Load Routes Failure',
  props<{ error: any }>()
);

export const loadJourneyContributions = createAction(
  '[Journey Contribution] Load Journey Contributions'
);

export const loadJourneyContributionsSuccess = createAction(
  '[Journey Contribution] Load Journey Contributions Success',
  props<{ contributions: JourneyContribution[] }>()
);

export const loadJourneyContributionsFailure = createAction(
  '[Journey Contribution] Load Journey Contributions Failure',
  props<{ error: any }>()
);

export const addJourneyContribution = createAction(
  '[Journey Contribution] Add Journey Contribution',
  props<{ contribution: JourneyContribution }>()
);
