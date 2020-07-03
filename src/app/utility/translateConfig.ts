import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class CoreTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<object> {
    return this.http.get('../assets/i18n/' + lang + '.json').pipe(
      map((langFile) => {
        return langFile;
      }),
      catchError((err) => {
        console.warn(err);
        return of(null);
      })
    );
  }
}

export function createTranslateLoader(http): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const translateConfig = {
  loader: {
    provide: TranslateLoader,
    useClass: CoreTranslateLoader,
    deps: [HttpClient],
  },
};
