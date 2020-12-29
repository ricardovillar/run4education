import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
  FB: any;

  id: any;

  constructor(route: ActivatedRoute) {
    this.initFacebook();
    route.queryParamMap.subscribe((params) => this.id = params.get('c'));
  }

  ngOnInit(): void {
  }

  shareOnFacebook() {
    this.FB.ui({
      method: 'share',
      quote: 'Ran with Ousman you too ...',
      href: 'https://correalpaisdelosblancos.com/',
    }, function (response) { });
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

}
