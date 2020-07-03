import { Component } from '@angular/core';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.initializeApp();
  }

  initializeApp() {
    this.setupLang();
    SplashScreen.hide().catch((err) => {
      console.warn(err);
    });
    StatusBar.setStyle({
      style: StatusBarStyle.Light,
    }).catch((err) => {
      console.warn(err);
    });
  }

  private setupLang() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(environment.languages[0]);
    this.translate.addLangs(environment.languages);
    this.translate.use(environment.languages[0]);
  }
}
