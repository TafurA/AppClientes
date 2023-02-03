import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },


  // {
  //   path: 'support',
  //   loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  // },
  // {
  //   path: 'favorite',
  //   loadChildren: () => import('./favorite/favorite.module').then( m => m.FavoritePageModule)
  // },
  // {
  //   path: 'order-history',
  //   loadChildren: () => import('./order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  // },
  // {
  //   path: 'detail-category',
  //   loadChildren: () => import('./detail-category/detail-category.module').then( m => m.DetailCategoryPageModule)
  // },
  // {
  //   path: 'detail-providers',
  //   loadChildren: () => import('./detail-providers/detail-providers.module').then( m => m.DetailProvidersPageModule)
  // },
  // {
  //   path: 'providers',
  //   loadChildren: () => import('./providers/providers.module').then( m => m.ProvidersPageModule)
  // },
  // {
  //   path: 'category',
  //   loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  // },
  // {
  //   path: 'offert',
  //   loadChildren: () => import('./offert/offert.module').then( m => m.OffertPageModule)
  // },
  // {
  //   path: 'welcome',
  //   loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  // },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  // },
  // {
  //   path: 'splash',
  //   loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  // },
  // {
  //   path: 'car',
  //   loadChildren: () => import('./car/car.module').then( m => m.CarPageModule)
  // },
  // {
  //   path: 'sidebar-menu',
  //   loadChildren: () => import('./sidebar-menu/sidebar-menu.module').then( m => m.SidebarMenuPageModule)
  // }
  /*{
    path: 'category:id',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
