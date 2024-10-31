import { Component, inject } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@scandium-oy/ngx-scandium';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-login-icon',
  templateUrl: 'login-icon.component.html',
})
export class LoginIconComponent {
  private navigtionService = inject(NavigationService);

  constructor(
    public fireAuth: AuthService,
    private translate: TranslateService,
  ) { }

  async logout() {
    const translateValues = this.translate.instant(['general.logoutTitle', 'general.logoutText']);
    const confirmRet = await Dialog.confirm({
      title: translateValues['general.logoutTitle'],
      message: translateValues['general.logoutText'],
    });
    if (confirmRet.value === true) {
      this.fireAuth.signOut();
      this.navigtionService.navigateToHome();
    }
  }
}
