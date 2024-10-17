import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import localeFI from '@angular/common/locales/fi';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'ion2-calendar';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { translateConfig } from './utility/translateConfig';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

registerLocaleData(localeFI);

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AppRoutingModule,
        BrowserModule,
        CalendarModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot(translateConfig)], providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: LOCALE_ID, useValue: 'fi-FI' },
        provideHttpClient(withInterceptorsFromDi()),
        provideFirebaseApp(() => initializeApp({"projectId":"harjoituspk-1cfe6","appId":"1:180791120123:web:081769af95a4cc6ca9605e","databaseURL":"https://harjoituspk-1cfe6.firebaseio.com","storageBucket":"harjoituspk-1cfe6.appspot.com","locationId":"europe-west","apiKey":"AIzaSyD8z52gO9hKcFLFxRHYKLk7FSYONE-HIJM","authDomain":"harjoituspk-1cfe6.firebaseapp.com","messagingSenderId":"180791120123","measurementId":"G-L0TG50Y35P"})),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
    ] })
export class AppModule {}
