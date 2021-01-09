import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { JourneyContribution } from '@model/journey-contribution';
import { Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SportEnum } from '@app/model/sport.enum';
import { environment } from '@environment';

import * as fromStore from "@store/reducers/index";
import * as fromRoot from "@store/reducers";

@Component({
  selector: 'thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnDestroy {
  private _subscriptions: Array<Subscription> = [];
  private _journeyContributions: JourneyContribution[] = [];
  private _isMobile: boolean;
  private _isTablet: boolean;

  contribution: JourneyContribution;
  id: any;
  whatsappSharing: string | SafeUrl;
  contributionUrl: string;
  facebookSharing: string | SafeUrl;

  constructor(
    route: ActivatedRoute,
    deviceService: DeviceDetectorService,
    private store: Store<fromStore.State>,
    private sanitizer: DomSanitizer) {
    this.subscribeJourneyContributions();
    route.queryParamMap.subscribe((params) => this.setContributionId(params.get('c')));
    this._isMobile = deviceService.isMobile();
    this._isTablet = deviceService.isTablet();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  private setContributionId(id: any) {
    this.id = id;
    this.setContribution();
  }

  private subscribeJourneyContributions() {
    let sub = this.store.select(fromRoot.getJourneyContributions)
      .subscribe((contributions: JourneyContribution[]) => {
        this._journeyContributions = contributions;
        this.setContribution();
      });
    this._subscriptions.push(sub);
  }

  private setContribution() {
    if (!this.id || !this._journeyContributions) {
      return;
    }
    this.contribution = this._journeyContributions.find(c => c._id == this.id);
    if (!this.contribution) {
      return;
    }
    this.contributionUrl = `${environment.MAP_URL}?c=${this.contribution._id}`;
    this.setupFacebookSharing();
    this.setupWhatsappSharing();
  }

  private setupFacebookSharing() {
    let quote = this.getFacebookShareQuote();
    this.facebookSharing = `//www.facebook.com/sharer.php?u=${this.contributionUrl}&quote=${quote}`;
  }

  private getFacebookShareQuote() {
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

  private setupWhatsappSharing() {
    const wpShareQuote = this.getWhatsappShareQuote();
    if (this._isMobile || this._isTablet) {
      const encodedText = encodeURIComponent(wpShareQuote);
      const shareUrl = `whatsapp://send?text=${encodedText}`;
      this.whatsappSharing = this.sanitizer.bypassSecurityTrustUrl(shareUrl);
    }
    else {
      this.whatsappSharing = `https://web.whatsapp.com/send?text=${wpShareQuote}`;
    }
  }

  private getWhatsappShareQuote() {
    switch (this.contribution.sport) {
      case SportEnum.Cycling:
        return `Hola, acabo de pedalear ${this.contribution.distance} km con Ousman, véalo en ${this.contributionUrl}`;
      case SportEnum.Swimming:
        return `Hola, acabo de nadar ${this.contribution.distance} km con Ousman, véalo en ${this.contributionUrl}`;
      case SportEnum.Trekking:
        return `Hola, acabo de caminar ${this.contribution.distance} km con Ousman, véalo en ${this.contributionUrl}`;
      case SportEnum.Running:
      default:
        return `Hola, acabo de correr ${this.contribution.distance} km con Ousman, véalo en ${this.contributionUrl}`;
    }
  }

}
