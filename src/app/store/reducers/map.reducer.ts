import { createReducer, on } from '@ngrx/store';
import { RoutePoint } from '@model/route-point';
import { Travel } from '@model/travel';
import { cloneDeep } from 'lodash';

import * as mapActions from '@store/actions/map/map.actions';

export const mapFeatureKey = 'map';

export interface State {
  fullRoute: RoutePoint[],
  travels: Travel[]
}

export const initialState: State = {
  fullRoute: [],
  travels: []
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
  ),
  on(
    mapActions.loadTravelsSuccess,
    (state, { travels }) => ({ ...state, travels })
  ),
  on(
    mapActions.addTravel,
    (state, { travel }) => {
      let travels = state.travels.map(x => cloneDeep(x));
      travels.push(travel);
      return ({ ...state, travels });
    }
  )
);

export const getFullRoute = (state: State) => {
  return state.fullRoute;
}

export const getTravels = (state: State) => {
  return state.travels;
}