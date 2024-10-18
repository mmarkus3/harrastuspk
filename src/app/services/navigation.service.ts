import { Location as AngularLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { INavigationService } from '@scandium-oy/ngx-scandium';

@Injectable({
  providedIn: 'root',
})
export class NavigationService extends INavigationService {

  constructor(
    private route: ActivatedRoute,
    private location: AngularLocation,
    router: Router,
  ) {
    super(router);
  }

  public async navigate(commands: string[], extras?: NavigationExtras) {
    return this.router.navigate(commands, extras);
  }

  public async navigateToHome() {
    return this.router.navigate([`/`]);
  }

  public async navigateIfSame(url: string, guid: string, extras?: NavigationExtras) {
    const currentUrl = window.location.href;
    if (currentUrl.includes(url)) {
      return this.router.navigate([url, guid], extras);
    }
  }

  public updateQueryParams(queryParams: Params) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
      });
  }

  public async navigateToLogin(redirectUrlParam?: string) {
    const redirectUrl = ['/profile', '/waiting'].includes(redirectUrlParam) ? null : redirectUrlParam;
    return this.router.navigate(['/login'], { replaceUrl: true, queryParams: { redirectUrl } });
  }

  public back() {
    return this.location.back();
  }
}
