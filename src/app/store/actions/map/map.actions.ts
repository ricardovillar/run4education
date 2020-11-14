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
