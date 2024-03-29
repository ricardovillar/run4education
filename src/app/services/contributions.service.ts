import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { JourneyContribution } from '@model/journey-contribution';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contribution } from '@model/contribution';
import { environment } from '@environment';

@Injectable({ providedIn: 'root' })
export class ContributionsService {

  constructor(
    @Inject(LOCALE_ID) private language: string,
    private http: HttpClient) {
  }

  getJourneyContributions(): Observable<JourneyContribution[]> {
    const url = environment.API_URL + '/contributions';
    return this.http.get<JourneyContribution[]>(url);
  }

  startContributionProcess(contribution: Contribution, captcha: string): Observable<{ client_secret: string }> {
    const formData = new FormData();

    let anonymous = contribution.anonymous || false;

    formData.append('firstName', contribution.firstName);
    formData.append('lastName', contribution.lastName);
    formData.append('email', contribution.email);
    formData.append('distance', contribution.distance.toString());
    formData.append('valuePerKm', contribution.valuePerKm.toString());
    formData.append('isGroup', (contribution.isGroup ?? false).toString());
    formData.append('groupName', contribution.groupName);
    formData.append('anonymous', anonymous.toString());
    formData.append('cpt', captcha);

    const url = environment.API_URL + '/start-contribution'
    return this.http.post<{ client_secret: string }>(url, formData);
  }

  completeContributionProcess(contribution: Contribution): Observable<JourneyContribution> {
    const formData = new FormData();

    let futureCommunicationConsent = contribution.futureCommunicationConsent || false;
    let anonymous = contribution.anonymous || false;

    formData.append('firstName', contribution.firstName);
    formData.append('lastName', contribution.lastName);
    formData.append('email', contribution.email);
    formData.append('distance', contribution.distance.toString());
    formData.append('valuePerKm', contribution.valuePerKm.toString());
    formData.append('sport', contribution.sport.toString());
    formData.append('city', contribution.city);
    formData.append('country', contribution.country);
    formData.append('isGroup', (contribution.isGroup ?? false).toString());
    formData.append('groupName', contribution.groupName);
    formData.append('groupParticipants', contribution.groupParticipants);
    formData.append('futureCommunicationConsent', futureCommunicationConsent.toString());
    formData.append('anonymous', anonymous.toString());
    formData.append('language', this.language);

    if (contribution.avatar) {
      formData.append('avatar', contribution.avatar);
    }

    const url = environment.API_URL + '/complete-contribution'
    return this.http.post<JourneyContribution>(url, formData);
  }
}