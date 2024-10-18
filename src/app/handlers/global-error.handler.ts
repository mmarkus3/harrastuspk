import { inject, Injectable } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class GlobalErrorHandler {
  private translateService = inject(TranslateService);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(err: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    if (chunkFailedMessage.test(err.message)) {
      const title = this.translateService.instant('update.title');
      const message = this.translateService.instant('update.message');

      Dialog.confirm({ title, message }).then((dialog) => {
        if (dialog.value) {
          window.location.reload();
        }
      });
    }
  }
}
