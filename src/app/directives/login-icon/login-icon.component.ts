import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@scandium-oy/ngx-scandium';

const { Modals } = Plugins;

@Component({
  selector: 'app-login-icon',
  templateUrl: 'login-icon.component.html',
})
export class LoginIconComponent {
  constructor(public fireAuth: AuthService, private translate: TranslateService, private router: Router) { }

  async logout() {
    const translateValues = await this.translate.get(['general.logoutTitle', 'general.logoutText']).toPromise();
    const confirmRet = await Modals.confirm({
      title: translateValues['general.logoutTitle'],
      message: translateValues['general.logoutText'],
    });
    if (confirmRet.value === true) {
      this.fireAuth.signOut();
      this.router.navigate(['/']);
    }
  }
}
