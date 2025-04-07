import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LandingComponent } from './pages/landing/landing.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { HomePrivateComponent } from './pages/home-private/home-private.component';
import { ChildDashboardComponent } from './pages/child-dashboard/child-dashboard.component';
import { ChildGamesComponent } from './components/child-games/child-games.component';
import { ChildPlayComponent } from './pages/child-play/child-play.component';
import { RoleGuard } from './services/role.guard';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminGameComponent } from './admin/admin-game/admin-game.component';
import { AdminChildrenComponent } from './admin/admin-children/admin-children.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },  
  { path: 'statistics', component: StatisticsComponent,canActivate: [AuthGuard] },
  { path: 'home-private', component:HomePrivateComponent,canActivate: [AuthGuard]  },
  {path:'child-dashboard', component:ChildDashboardComponent,canActivate: [AuthGuard] },
  {path: 'child/:childId/games', component:ChildGamesComponent,canActivate: [AuthGuard] },
  { path: 'child-games', component: ChildGamesComponent,canActivate: [AuthGuard]  },
  { path: 'child-play', component: ChildPlayComponent,canActivate: [AuthGuard]  },
  
  
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [RoleGuard],
    children: [
      { path: 'users', component: AdminUserComponent },
      { path: 'games', component: AdminGameComponent },
      { path: 'children', component: AdminChildrenComponent }
    ]
  }  

];
