import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastType } from '../common/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public showToast = new Subject<ToastType>();

  constructor() {}

  emitToast(data: ToastType) {
    this.showToast.next(data);
  } 
}
