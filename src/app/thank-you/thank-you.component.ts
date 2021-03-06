import { Component, OnDestroy, LOCALE_ID, Inject } from '@angular/core';
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
  twitterSharing: string | SafeUrl;
  mailSharing: string | SafeUrl;
  pinterestSharing: string | SafeUrl;
  linkedinSharing: string | SafeUrl;

  get isMobileOrTablet(): boolean {
    return this._isMobile || this._isTablet;
  }

  constructor(
    route: ActivatedRoute,
    deviceService: DeviceDetectorService,
    private store: Store<fromStore.State>,
    private sanitizer: DomSanitizer,
    @Inject(LOCALE_ID) private language: string,) {
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
    this.contributionUrl = `${environment.MAP_URL}${this.language}?c=${this.contribution._id}`;
    this.setupFacebookSharing();
    this.setupWhatsappSharing();
    this.setupTwitterSharing();
    this.setupMailSharing();
    this.setupPinterestSharing();
    this.setupLinkedinSharing();
  }

  private setupFacebookSharing() {
    const quote = $localize`:@@fb_share_quote:Hola, acabo de recorrer ${this.contribution.distance} km con Ousman Umar, lo puedes ver en:`;
    this.facebookSharing = `//www.facebook.com/sharer.php?u=${this.contributionUrl}&quote=${quote}`;
  }

  private setupWhatsappSharing() {
    const text = $localize`:@@wp_share_quote:Hola, acabo de recorrer ${this.contribution.distance} km con Ousman Umar, lo puedes ver en: ${this.contributionUrl}`;
    if (this.isMobileOrTablet) {
      const encodedText = encodeURIComponent(text);
      const shareUrl = `whatsapp://send?text=${encodedText}`;
      this.whatsappSharing = this.sanitizer.bypassSecurityTrustUrl(shareUrl);
    }
    else {
      this.whatsappSharing = `https://web.whatsapp.com/send?text=${text}`;
    }
  }

  private setupTwitterSharing() {
    const quote = $localize`:@@fb_share_quote:Hola, acabo de recorrer ${this.contribution.distance} km con Ousman Umar, lo puedes ver en:`;
    this.twitterSharing = `//twitter.com/share?url=${this.contributionUrl}&text=${quote}`;
  }

  private setupMailSharing() {
    const subject = $localize`:@@email_share_subject:Corre al país de los blancos`;
    const body = $localize`:@@wp_share_quote:Hola, acabo de recorrer ${this.contribution.distance} km con Ousman Umar, lo puedes ver en: ${this.contributionUrl}`;
    this.mailSharing = `mailto:?subject=${subject}&body=${body}`;
  }

  private setupPinterestSharing() {
    const quote = $localize`:@@fb_share_quote:Hola, acabo de recorrer ${this.contribution.distance} km con Ousman Umar, lo puedes ver en:`;
    this.pinterestSharing = `//pinterest.com/pin/create/button/?url=${this.contributionUrl}&media=&description=${quote}`;
  }

  private setupLinkedinSharing() {
    const title = $localize`:@@email_share_subject:Corre al país de los blancos`;
    this.linkedinSharing = `//www.linkedin.com/shareArticle?mini=true&url=${this.contributionUrl}&title=${title}`;
  }

}
