import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { AuthGuard } from './auth/auth.guard';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const routes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'crisis-center',
    loadChildren: () => import('./crisis-center/crisis-center.module').then(m => m.CrisesModule),
    data: { preload: true }
  },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { enableTracing: true, preloadingStrategy: SelectivePreloadingStrategyService }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
