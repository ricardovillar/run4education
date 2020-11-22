import { createReducer, on } from '@ngrx/store';
import { RoutePoint } from '@model/route-point';
import { JourneyContribution } from '@app/model/journey-contribution';
import { cloneDeep } from 'lodash';

import * as mapActions from '@store/actions/map/map.actions';

export const mapFeatureKey = 'map';

export interface State {
  fullRoute: RoutePoint[],
  journeyContributions: JourneyContribution[]
}

export const initialState: State = {
  fullRoute: [],
  journeyContributions: []
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
    mapActions.loadJourneyContributionsSuccess,
    (state, { contributions: contributions }) => ({ ...state, journeyContributions: contributions })
  ),
  on(
    mapActions.addJourneyContribution,
    (state, { contribution: contribution }) => {
      let contributions = state.journeyContributions.map(x => cloneDeep(x));
      contributions.push(contribution);
      return ({ ...state, journeyContributions: contributions });
    }
  )
);

export const getFullRoute = (state: State) => {
  return state.fullRoute;
}

export const getJourneyContributions = (state: State) => {
  return state.journeyContributions;
}