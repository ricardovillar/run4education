import { RoutePoint } from '@model/route-point';
import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

import * as mapActions from '@store/actions/map/map.actions';

export const mapFeatureKey = 'map';

export interface State {
  fullRoute: RoutePoint[]
}

export const initialState: State = {
  fullRoute: []
};

export const reducer = createReducer(
  initialState,
  on(
    mapActions.loadRoutesSuccess,
    (state, { routes }) => {
      let clonedRoutes: RoutePoint[] = [];
      if (routes) {
        let previous: RoutePoint;
        routes.forEach(x => {
          const routePoint: RoutePoint = cloneDeep(x);
          if (previous) {
            routePoint.previousRoutePoint = previous;
          }
          previous = routePoint;
          clonedRoutes.push(routePoint);
        })
      }
      return ({ ...state, fullRoute: clonedRoutes });
    }
  )
);

export const getFullRoute = (state: State) => {
  return state.fullRoute;
}