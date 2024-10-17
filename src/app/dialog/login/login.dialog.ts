import { Component } from '@angular/core';
import { AuthCredential, OAuthProvider } from '@angular/fire/auth';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { ModalController, Platform } from '@ionic/angular';
import { AuthService } from '@scandium-oy/ngx-scandium';

declare var SignInWithApple: any;

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login.dialog.html',
  styleUrls: ['login.dialog.scss'],
})
export class LoginDialogComponent {
  constructor(public fireAuth: AuthService, private modal: ModalController, private platform: Platform) { }

  private loginWithCredential(credential: AuthCredential): void {
    this.fireAuth.signInWithCredential(credential)
      .then((_) => {
        this.modal.dismiss();
      }).catch((error) => {
        console.error(error);
      });
  }

  login(type: string) {
    if (type === 'ios') {
      this.loginIos();
      return;
    }
    this.loginGoogle();
  }

  private loginGoogle() {
    FirebaseAuthentication.signInWithGoogle({ customParameters: [{ key: 'prompt', value: 'select_account' }], skipNativeAuth: true }).then(
      (result) => {
        const credential = new OAuthProvider(result.credential.providerId).credential({
          idToken: result.credential.idToken,
        });
        return this.loginWithCredential(credential);
      },
      (err) => {
        console.error(err);
      },
    );
  }

  private loginIos() {
    FirebaseAuthentication.signInWithApple({ skipNativeAuth: true }).then(
      (result) => {
        const credential = new OAuthProvider('apple.com').credential({
          idToken: result.credential.idToken,
          rawNonce: result.credential.nonce,
        });
        return this.loginWithCredential(credential);
      },
      (err) => {
        console.error(err);
      },
    );
  }

  dismiss() {
    this.modal.dismiss();
  }
}
