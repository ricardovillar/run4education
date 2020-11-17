import { Travel } from '@app/model/travel';
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

export const loadTravels = createAction(
  '[Travel] Load Travels'
);

export const loadTravelsSuccess = createAction(
  '[Travel] Load Travels Success',
  props<{ travels: Travel[] }>()
);

export const loadTravelsFailure = createAction(
  '[Travel] Load Travels Failure',
  props<{ error: any }>()
);

export const addTravel = createAction(
  '[Travel] Add Travel',
  props<{ travel: Travel }>()
);
