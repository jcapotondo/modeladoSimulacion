import { Routes } from '@angular/router';
import { MontecarloComponent } from './components/montecarlo/montecarlo.component';
import { EulerComponent } from './components/euler/euler.component';


export const AppRouter: Routes = [
  {
    path: 'montecarlo',
    component: MontecarloComponent,
    pathMatch: 'full'
  },
  {
    path: 'euler',
    component: EulerComponent,
    pathMatch: 'full'
  },
];
