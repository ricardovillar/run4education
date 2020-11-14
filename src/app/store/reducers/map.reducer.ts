import { RoutePoint } from '@model/route-point';
import { Action, createReducer, on } from '@ngrx/store';

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
    (state, { routes }) => ({ ...state, fullRoute: routes })
  )
);

export const getFullRoute = (state: State) => {
  return state.fullRoute;
}