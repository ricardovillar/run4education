import { Component, ElementRef, OnInit, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
export class ContributionFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('cardInfo') cardInfo: ElementRef;

  firstName: string;
  lastName: string;
  distance: number;
  value: number;
  sport: SportEnum = null;
  country: string;
  city: string;
  picture: File;
  avatarPreview: any;
  futureCommunicationConsent: boolean;
  email: string;
  termsAccepted: boolean = false;

  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: string;

  Running = SportEnum.Running;
  Trekking = SportEnum.Trekking;
  Cycling = SportEnum.Cycling;
  Swimming = SportEnum.Swimming;

  contributionUrl = environment.API_URL + '/contribution';

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store<fromStore.State>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contributionsService: ContributionsService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.card) {
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  ngAfterViewInit() {
    this.initiateCardElement();
  }

  onPictureSelected(event) {
    this.picture = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.picture);
    reader.onload = (_event) => {
      this.avatarPreview = reader.result;
    }
  }

  async contribute() {
    const { token, error } = await stripe.createToken(this.card);
    if (token && token.id) {
      this.startContributionProcess(token);
    } else {
      this.onError(error);
    }
  }

  private initiateCardElement() {
    // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        color: '#000000',
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 600,
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#000000',
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 600
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    this.card = elements.create('card', { cardStyle });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  private onChange({ error }) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
    this.cd.detectChanges();
  }

  private startContributionProcess(token: { id: string }) {
    let contribution = new Contribution(this.firstName, this.lastName, this.email, this.distance, this.value, this.sport, this.picture);
    contribution.city = this.city;
    contribution.country = this.country;
    if (this.futureCommunicationConsent) {
      contribution.futureCommunicationConsent = true;
    }
    this.contributionsService.startContributionProcess(contribution, token.id)
      .subscribe(contribution => {
        if (contribution) {
          this.store.dispatch(addJourneyContribution({ contribution }));
          this.router.navigate(['./gracias'], { relativeTo: this.activatedRoute, queryParams: { c: contribution._id } });
        }
      });
  }

  private onError(error) {
    if (error.message) {
      this.cardError = error.message;
    }
  }

}