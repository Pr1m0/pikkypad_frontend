import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

import { StatisticsComponent } from './pages/statistics/statistics.component';
import { HomePrivateComponent } from './pages/home-private/home-private.component';
import { ChildCardComponent } from './components/child-card/child-card.component';
import { ChildDashboardComponent } from './pages/child-dashboard/child-dashboard.component';
// import { ChildrenDashboardComponent } from './dashboard/children-dashboard/children-dashboard.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
  
  { path: 'statistics', component: StatisticsComponent},
  { path: 'home-private', component:HomePrivateComponent },
  {path:'child-dashboard', component:ChildDashboardComponent},
//   {path:'children-dashboard', component: ChildrenDashboardComponent}

];
