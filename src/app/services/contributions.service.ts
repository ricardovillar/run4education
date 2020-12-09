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

    // let ousmanContribution = new JourneyContribution("Ousman", "Umar", 15);
    // ousmanContribution.sport = SportEnum.Trekking;
    // ousmanContribution.pictureUrl = 'https://correalpaisdelosblancos.com/avatars/image-1607261175396-AvatarPopeye.jpg';
    // contributions.push(ousmanContribution);

    // let ricardoContribution = new JourneyContribution("Ricardo", "Villar de Oliveira", 5);
    // ricardoContribution.sport = SportEnum.Cycling;
    // ricardoContribution.pictureUrl = 'https://pbs.twimg.com/profile_images/1020797974841102337/ZUynENmZ_400x400.jpg';
    // contributions.push(ricardoContribution);

    // let thaisContribution = new JourneyContribution("Thaís Naomi", "Seki", 35);
    // thaisContribution.sport = SportEnum.Running;
    // thaisContribution.pictureUrl = 'https://instagram.fbcn9-1.fna.fbcdn.net/v/t51.2885-19/s320x320/26065860_2039367192951737_5004053189545164800_n.jpg?_nc_ht=instagram.fbcn9-1.fna.fbcdn.net&_nc_ohc=3P4Vqu2Y9q8AX_jALzt&tp=1&oh=8b5980f32fcdcb53f987692343a35b47&oe=5FE42ABC';
    // contributions.push(thaisContribution);

    // let pukkasContribution = new JourneyContribution("Pukkas Webs design SL", "", 100);
    // pukkasContribution.isCompany = true;
    // pukkasContribution.pictureUrl = "https://media.designrush.com/agencies/5838/conversions/Pukkas-Webs-Design-logo-profile.jpg";
    // contributions.push(pukkasContribution);


    // let felixContribution = new JourneyContribution("Felix", "Capella", 8);
    // felixContribution.sport = SportEnum.Swimming;
    // contributions.push(felixContribution);

    // contributions.push(new JourneyContribution("Jordi", "Granell", 19));

    return of(contributions);
  }

  startContributionProcess(contribution: Contribution) {
    const formData = new FormData();

    formData.append('firstName', contribution.firstName);
    formData.append('lastName', contribution.lastName);
    formData.append('country', contribution.country);
    formData.append('distance', contribution.distance.toString());
    formData.append('valuePerKm', contribution.valuePerKm.toString());
    formData.append('sport', contribution.sport.toString());

    if (contribution.avatar) {
      formData.append('avatar', contribution.avatar);
    }

    const url = environment.API_URL + '/contribution'
    return this.http.post<any>(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}