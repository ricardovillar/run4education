import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { JourneyContribution } from '@model/journey-contribution';
import { Subscription } from 'rxjs';

import * as fromStore from "@store/reducers/index";
import * as fromRoot from "@store/reducers";
import { SportEnum } from '@app/model/sport.enum';

@Component({
  selector: 'thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnDestroy {
  private _subscriptions: Array<Subscription> = [];
  private _journeyContributions: JourneyContribution[] = [];

  contribution: JourneyContribution;
  FB: any;
  id: any;

  constructor(
    route: ActivatedRoute,
    private store: Store<fromStore.State>,) {
    this.subscribeJourneyContributions();
    this.initFacebook();
    route.queryParamMap.subscribe((params) => this.setContributionId(params.get('c')));
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  shareOnFacebook() {
    const href = 'https://correalpaisdelosblancos.com/';
    const quote = this.getFacebookShareQuote();
    this.FB.ui({
      method: 'share',
      quote: quote,
      href: href
    }, function (response) { });
  }

  private getFacebookShareQuote() {
    if (!this.contribution) {
      return 'Corre con Ousman tu también ...';
    }
    switch (this.contribution.sport) {
      case SportEnum.Cycling:
        return `${this.contribution.firstName} acaba de pedalear ${this.contribution.distance} km con Ousman`;
      case SportEnum.Swimming:
        return `${this.contribution.firstName} acaba de nadar ${this.contribution.distance} km con Ousman`;
      case SportEnum.Trekking:
        return `${this.contribution.firstName} acaba de caminar ${this.contribution.distance} km con Ousman`;
      case SportEnum.Running:
      default:
        return `${this.contribution.firstName} acaba de correr ${this.contribution.distance} km con Ousman`;
    }
  }

  private setContributionId(id: any) {
    this.id = id;
    this.setContribution();
  }

  private setContribution() {
    if (this.id && this._journeyContributions) {
      this.contribution = this._journeyContributions.find(c => c._id == this.id);
    }
  }

  private initFacebook() {
    this.FB = top['FB'];

    let options = {
      appId: '410894056609523',
      version: 'v3.2',
      cookie: true,
      status: true,
      frictionlessRequests: true
    };

    this.FB.init(options);
  }

  private subscribeJourneyContributions() {
    let sub = this.store.select(fromRoot.getJourneyContributions)
      .subscribe((contributions: JourneyContribution[]) => {
        this._journeyContributions = contributions;
        this.setContribution();
      });
    this._subscriptions.push(sub);
  }

}
