import { OnInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { JourneyContribution } from '@app/model/journey-contribution';
import { addJourneyContribution } from '@store/actions/map/map.actions';
import { Router } from '@angular/router';
import { SportEnum } from '@app/model/sport.enum';

import * as fromStore from "@store/reducers/index";

@Component({
  selector: 'contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.css']
})
export class ContributionComponent implements OnInit {
  firstName: string;
  lastName: string;
  distance: number;
  sport: SportEnum;

  Running = SportEnum.Running;
  Trekking = SportEnum.Trekking;
  Cycling = SportEnum.Cycling;
  Swimming = SportEnum.Swimming;

  constructor(
    private store: Store<fromStore.State>,
    private router: Router) {
  }

  ngOnInit(): void {
  }


  add() {
    if (this.firstName && this.distance) {
      let journeyContribution = new JourneyContribution(this.firstName, this.lastName, this.distance);
      journeyContribution.sport = this.sport;
      this.store.dispatch(addJourneyContribution({ contribution: journeyContribution }));
      this.router.navigate(['gracias']);
    }
  }


}
