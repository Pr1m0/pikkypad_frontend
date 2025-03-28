import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

import { StatisticsComponent } from './pages/statistics/statistics.component';
import { HomePrivateComponent } from './pages/home-private/home-private.component';
import { ChildCardComponent } from './components/child-card/child-card.component';
import { ChildDashboardComponent } from './pages/child-dashboard/child-dashboard.component';
import { MemoryGameComponent } from './games/memory-game/memory-game.component';
import { ChildGamesComponent } from './pages/child-games/child-games.component';
import { ChildPlayComponent } from './pages/child-play/child-play.component';
// import { ChildrenDashboardComponent } from './dashboard/children-dashboard/children-dashboard.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
  
  { path: 'statistics', component: StatisticsComponent},
  { path: 'home-private', component:HomePrivateComponent },
  {path:'child-dashboard', component:ChildDashboardComponent},
  {path:'memorygame', component: MemoryGameComponent},
  {path: 'child/:childId/games', component:ChildGamesComponent},
  { path: 'child-games', component: ChildGamesComponent },
  { path: 'child-play', component: ChildPlayComponent },
//   {path:'children-dashboard', component: ChildrenDashboardComponent}

];
