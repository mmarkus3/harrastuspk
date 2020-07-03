import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController, Platform } from '@ionic/angular';
import { cfaSignIn } from 'capacitor-firebase-auth';
import { auth, User } from 'firebase/app';

declare var SignInWithApple: any;

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login.dialog.html',
  styleUrls: ['login.dialog.scss'],
})
export class LoginDialogComponent {
  constructor(public fireAuth: AngularFireAuth, private modal: ModalController, private platform: Platform) {}

  login(type: string) {
    let provider: auth.AuthProvider;
    if (type === 'google') {
      provider = new auth.GoogleAuthProvider();
    } else if (type === 'ios') {
      this.loginIos();
      return;
    }
    if (this.platform.is('capacitor')) {
      this.loginMobile(provider);
    } else {
      this.loginWeb(provider);
    }
  }

  private loginMobile(provider: auth.AuthProvider) {
    cfaSignIn(provider.providerId).subscribe((user: User) => {
      this.fireAuth.updateCurrentUser(user).then((_) => {
        this.modal.dismiss();
      });
    });
  }

  private loginWeb(provider: auth.AuthProvider) {
    this.fireAuth.signInWithPopup(provider).then((data) => {
      this.modal.dismiss();
    });
  }

  private loginIos() {
    SignInWithApple.request({ requestedScopes: [SignInWithApple.Scope.Email, SignInWithApple.Scope.FullName] }).then(
      (appleCredential) => {
        const credential = new auth.OAuthProvider('apple.com').credential(appleCredential.identityToken);
        this.fireAuth
          .signInWithCredential(credential)
          .then((_) => {
            this.modal.dismiss();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  }

  dismiss() {
    this.modal.dismiss();
  }
}
