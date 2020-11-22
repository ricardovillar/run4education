import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from "@store/reducers/index";

import * as mapActions from '@store/actions/map/map.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'run4education';

  constructor(private store: Store<fromStore.State>) {
  }


  ngOnInit(): void {
    this.store.dispatch(mapActions.loadRoutes());
    this.store.dispatch(mapActions.loadJourneyContributions());
  }

}
