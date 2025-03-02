import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

let requestCount = 0; // عداد للطلبات النشطة

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _NgxSpinnerService = inject(NgxSpinnerService);

  // تشغيل الـ spinner فقط عند أول طلب HTTP
  if (requestCount === 0) {
    _NgxSpinnerService.show();
  }
  requestCount++;

  return next(req).pipe(
    finalize(() => {
      requestCount--;
      if (requestCount === 0) {
        _NgxSpinnerService.hide(); // إخفاء الـ spinner عند انتهاء كل الطلبات
      }
    })
  );
};
