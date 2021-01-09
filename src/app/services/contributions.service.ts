import { Injectable } from '@angular/core';
import { JourneyContribution } from '@model/journey-contribution';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contribution } from '@model/contribution';
import { environment } from '@environment';

@Injectable({ providedIn: 'root' })
export class ContributionsService {

  constructor(private http: HttpClient) {
  }

  getJourneyContributions(): Observable<JourneyContribution[]> {
    let contributions: JourneyContribution[] = [];

    const url = environment.API_URL + '/contributions';
    return this.http.get<JourneyContribution[]>(url);
  }

  startContributionProcess(contribution: Contribution): Observable<JourneyContribution> {
    const formData = new FormData();

    let futureCommunicationConsent = contribution.futureCommunicationConsent || false;

    formData.append('firstName', contribution.firstName);
    formData.append('lastName', contribution.lastName);
    formData.append('country', contribution.country);
    formData.append('distance', contribution.distance.toString());
    formData.append('valuePerKm', contribution.valuePerKm.toString());
    formData.append('sport', contribution.sport.toString());
    formData.append('futureCommunicationConsent', futureCommunicationConsent.toString());
    formData.append('email', contribution.email);

    if (contribution.avatar) {
      formData.append('avatar', contribution.avatar);
    }

    const url = environment.API_URL + '/contribution'
    return this.http.post<JourneyContribution>(url, formData);
  }
}