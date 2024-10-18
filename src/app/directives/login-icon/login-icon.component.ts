import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Dialog } from '@capacitor/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@scandium-oy/ngx-scandium';

@Component({
  selector: 'app-login-icon',
  templateUrl: 'login-icon.component.html',
})
export class LoginIconComponent {
  constructor(public fireAuth: AuthService, private translate: TranslateService, private router: Router) { }

  async logout() {
    const translateValues = this.translate.instant(['general.logoutTitle', 'general.logoutText']);
    const confirmRet = await Dialog.confirm({
      title: translateValues['general.logoutTitle'],
      message: translateValues['general.logoutText'],
    });
    if (confirmRet.value === true) {
      this.fireAuth.signOut();
      this.router.navigate(['/']);
    }
  }
}
