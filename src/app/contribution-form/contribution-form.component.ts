import { Component, ElementRef, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { SportEnum } from '@model/sport.enum';
import { Contribution } from '@model/contribution';
import { ContributionsService } from '@services/contributions.service';
import { addJourneyContribution } from '@store/actions/map/map.actions';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { ContributionTypeEnum } from '@model/contribution-type.enum';

import * as fromStore from "@store/reducers/index";

@Component({
  selector: 'contribution-form',
  templateUrl: './contribution-form.component.html',
  styleUrls: ['./contribution-form.component.css']
})
export class ContributionFormComponent implements OnDestroy, AfterViewInit {
  @ViewChild('cardInfo') cardInfo: ElementRef;

  REGULAR: ContributionTypeEnum = ContributionTypeEnum.Regular;
  GROUP: ContributionTypeEnum = ContributionTypeEnum.Group;

  faSpinner = faSpinner;

  firstName: string;
  lastName: string;
  distance: number = null;
  value: number = null;
  sport: SportEnum = null;
  country: string;
  city: string;
  picture: File;
  avatarPreview: any;
  futureCommunicationConsent: boolean;
  anonymous: boolean;
  email: string;
  termsAccepted: boolean = false;
  isProcessing: boolean = false;
  kms = Array.from({ length: 100 }, (_, i) => i + 1);
  valuesPerKm = [0.5, 1, 2, 3, 4, 5, 10, 20];
  contributionType: ContributionTypeEnum = ContributionTypeEnum.Regular;

  groupRepresentantName: string;
  groupName: string;
  groupParticipants: string;
  groupDonationValues = [200, 225, 250, 275, 300, 325, 350, 375, 400];
  groupDonation: number = null;

  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: boolean = false;
  cardErrorMessage: string;
  captcha: string;

  Running = SportEnum.Running;
  Trekking = SportEnum.Trekking;
  Cycling = SportEnum.Cycling;
  Swimming = SportEnum.Swimming;

  get amount(): number {
    if (this.isRegular && this.distance != null && this.value != null) {
      return this.distance * this.value;
    }
    if (this.isGroup && this.groupDonation != null) {
      return this.groupDonation;
    }
    return null;
  }

  get isRegular(): boolean {
    return this.contributionType == ContributionTypeEnum.Regular;
  }

  get isGroup(): boolean {
    return this.contributionType == ContributionTypeEnum.Group;
  }

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store<fromStore.State>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contributionsService: ContributionsService) {
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

  setContributionType(type: ContributionTypeEnum) {
    this.contributionType = type;
  }

  onPictureSelected(event) {
    this.picture = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.picture);
    reader.onload = (_event) => {
      this.avatarPreview = reader.result;
    }
  }

  onParticipateButtonClick(captchaRef: any) {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;
    captchaRef.execute();
  }

  onCaptchaError(errorDetails: RecaptchaErrorParameters): void {
    this.isProcessing = false;
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

  async onCaptchaResolved(captcha: string, submitBtn: any) {
    this.cardErrorMessage = null;
    this.captcha = captcha;
    submitBtn.click();
  }


  async contribute(form: any) {
    if (form.invalid) {
      this.isProcessing = false;
      return;
    }
    if (!this.termsAccepted) {
      this.isProcessing = false;
      return;
    }

    let contribution = this.getContribution();

    this.startContributionProcess(contribution);
  }

  private initiateCardElement() {
    // Giving a base style here, but most of the style is in scss file
    const style = {
      base: {
        color: '#000000',
        iconColor: '#000000',
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
    this.card = elements.create('card', { style });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  private onChange({ error }) {
    if (error) {
      this.cardError = true;
      this.cardErrorMessage = error.message;
    } else {
      this.cardError = false;
      this.cardErrorMessage = null;
    }
    this.cd.detectChanges();
  }

  private startContributionProcess(contribution: Contribution) {
    this.contributionsService.startContributionProcess(contribution, this.captcha)
      .subscribe(
        paymentIntent => {
          if (paymentIntent && paymentIntent.client_secret) {
            this.confirmePaymentAndCompleteContributionProcess(contribution, paymentIntent.client_secret);
          }
          else {
            this.isProcessing = false;
            this.onError({ message: 'Something went wrong, please try again.' });
          }
        },
        _ => {
          this.isProcessing = false;
        }
      );
  }

  async confirmePaymentAndCompleteContributionProcess(contribution: Contribution, clientSecret: string) {
    const payload = {
      payment_method: {
        card: this.card,
        billing_details: {
          name: contribution.anonymous ? 'correalpaisdelosblancos - Anónimo' : `correalpaisdelosblancos - ${contribution.firstName} ${contribution.lastName}`
        }
      }
    };
    const result = await stripe.confirmCardPayment(clientSecret, payload);
    if (result.error) {
      this.isProcessing = false;
      this.onError(result.error);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        this.contributionsService.completeContributionProcess(contribution)
          .subscribe(
            contribution => {
              if (contribution) {
                this.store.dispatch(addJourneyContribution({ contribution }));
                this.router.navigate(['./gracias'], { relativeTo: this.activatedRoute, queryParams: { c: contribution._id } });
              }
            },
            _ => {
              this.isProcessing = false;
            }
          );
      }
    }
  }

  private getContribution() {
    let contribution = new Contribution(this.firstName, this.lastName, this.email, this.distance, this.value, this.sport, this.picture);
    contribution.city = this.city;
    contribution.country = this.country;
    contribution.futureCommunicationConsent = this.futureCommunicationConsent;
    contribution.anonymous = this.anonymous;
    if (this.isGroup) {
      contribution.isGroup = true;
      contribution.groupName = this.groupName;
      contribution.groupParticipants = this.groupParticipants;
      contribution.distance = 150;
      contribution.valuePerKm = this.groupDonation / 150;
    }
    return contribution;
  }

  private onError(error) {
    if (error.message) {
      this.cardError = true;
      this.cardErrorMessage = error.message;
    }
  }

}