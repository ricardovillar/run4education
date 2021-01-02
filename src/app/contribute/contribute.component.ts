import { OnInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { JourneyContribution } from '@model/journey-contribution';
import { SportEnum } from '@model/sport.enum';
import { Contribution } from '@model/contribution';
import { ContributionsService } from '@services/contributions.service';
import { addJourneyContribution } from '@store/actions/map/map.actions';
import { environment } from '@environment';

import * as fromStore from "@store/reducers/index";

const URL = 'http://localhost:8080/api/upload';

@Component({
  selector: 'contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {
  firstName: string;
  lastName: string;
  distance: number;
  sport: SportEnum;
  picture: File;
  avatarPreview: any;
  termsAccepted: boolean = false;

  Running = SportEnum.Running;
  Trekking = SportEnum.Trekking;
  Cycling = SportEnum.Cycling;
  Swimming = SportEnum.Swimming;

  contributionUrl = environment.API_URL + '/contribution';

  constructor(
    private store: Store<fromStore.State>,
    private router: Router,
    private contributionsService: ContributionsService) {
  }

  ngOnInit() {
  }

  add() {
    if (this.firstName && this.distance) {
      let journeyContribution = new JourneyContribution(this.firstName, this.lastName, this.distance);
      journeyContribution.sport = this.sport;
      this.store.dispatch(addJourneyContribution({ contribution: journeyContribution }));
      this.router.navigate(['thank-you']);
    }
  }

  onPictureSelected(event) {
    this.picture = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.picture);
    reader.onload = (_event) => {
      this.avatarPreview = reader.result;
    }
  }

  contribute() {
    let contribution = new Contribution(this.firstName, this.lastName, 'España', this.distance, 0.5, this.sport, this.picture);
    this.contributionsService.startContributionProcess(contribution)
      .subscribe(contribution => {
        if (contribution) {
          this.store.dispatch(addJourneyContribution({ contribution }));
          this.router.navigate(['thank-you', contribution._id]);
        }
      });
  }

}

