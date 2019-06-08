import { Injectable } from '@angular/core';

@Injectable()
export class UIContext {

  constructor() {
    this.setDefaultContext();
  }

  public title: string;

  public setDefaultContext() {
    this.title = 'Modelado y Simulacion';
  }

  public setTittle(tittle: string) {
    this.title = tittle;
  }
}