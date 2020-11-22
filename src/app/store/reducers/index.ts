import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '@environment';

import * as fromMap from '@store/reducers/map.reducer';

export interface State {
  [fromMap.mapFeatureKey]: fromMap.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromMap.mapFeatureKey]: fromMap.reducer,
};

// Map state
export const selectMapState = createFeatureSelector<fromMap.State>(fromMap.mapFeatureKey);
export const getFullRoute = createSelector(selectMapState, fromMap.getFullRoute);
export const getJourneyContributions = createSelector(selectMapState, fromMap.getJourneyContributions);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];