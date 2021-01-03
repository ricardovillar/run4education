import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { SportEnum } from '@model/sport.enum';
import { Contribution } from '@model/contribution';
import { ContributionsService } from '@services/contributions.service';
import { addJourneyContribution } from '@store/actions/map/map.actions';
import { environment } from '@environment';

import * as fromStore from "@store/reducers/index";

@Component({
  selector: 'contribution-form',
  templateUrl: './contribution-form.component.html',
  styleUrls: ['./contribution-form.component.css']
})
export class ContributionFormComponent implements OnInit {
  firstName: string;
  lastName: string;
  distance: number;
  value: number;
  sport: SportEnum = null;
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
    private activatedRoute: ActivatedRoute,
    private contributionsService: ContributionsService) {
  }

  ngOnInit() {
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
    let contribution = new Contribution(this.firstName, this.lastName, 'España', this.distance, this.value, this.sport, this.picture);
    this.contributionsService.startContributionProcess(contribution)
      .subscribe(contribution => {
        if (contribution) {
          this.store.dispatch(addJourneyContribution({ contribution }));
          this.router.navigate(['./thank-you'], { relativeTo: this.activatedRoute, queryParams: { c: contribution._id } });
        }
      });
  }

}