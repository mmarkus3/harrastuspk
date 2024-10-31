import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    this.initializeApp();
  }

  private setupLang() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(environment.languages[0]);
    this.translate.addLangs(environment.languages);
    this.translate.use(environment.languages[0]);
  }

  initializeApp() {
    this.setupLang();
    SplashScreen.hide().catch((err) => {
      console.warn(err);
    });
    StatusBar.setStyle({
      style: Style.Light,
    }).catch((err) => {
      console.warn(err);
    });
  }
}
