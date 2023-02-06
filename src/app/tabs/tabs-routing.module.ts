import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '../guard/session.guard';
import { ToggleMenuGuard } from '../guard/toggle-menu.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2/:codigo',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'splash',
        loadChildren: () => import('../splash/splash.module').then(m => m.SplashPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'welcome',
        loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomePageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'sidebar-menu',
        loadChildren: () => import('../sidebar-menu/sidebar-menu.module').then(m => m.SidebarMenuPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'offert',
        loadChildren: () => import('../offert/offert.module').then(m => m.OffertPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'car',
        loadChildren: () => import('../car/car.module').then(m => m.CarPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'providers',
        loadChildren: () => import('../providers/providers.module').then(m => m.ProvidersPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'detail-providers/:nameProvider/:imgProvider/:idProvider',
        loadChildren: () => import('../detail-providers/detail-providers.module').then(m => m.DetailProvidersPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'category',
        loadChildren: () => import('../category/category.module').then(m => m.CategoryPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'detail-category/:nameCategory/:idCategory',
        loadChildren: () => import('../detail-category/detail-category.module').then(m => m.DetailCategoryPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'order-history',
        loadChildren: () => import('../order-history/order-history.module').then(m => m.OrderHistoryPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'update-credentials',
        loadChildren: () => import('../update-credentials/update-credentials.module').then(m => m.UpdateCredentialsPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'update-personal-data',
        loadChildren: () => import('../update-personal-data/update-personal-data.module').then(m => m.UpdatePersonalDataPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'poll',
        loadChildren: () => import('../poll/poll.module').then(m => m.PollPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'order-detail/:idPedido',
        loadChildren: () => import('../order-detail/order-detail.module').then(m => m.OrderDetailPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'favorite',
        loadChildren: () => import('../favorite/favorite.module').then(m => m.FavoritePageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'support',
        loadChildren: () => import('../support/support.module').then(m => m.SupportPageModule)
      },
      {
        path: 'detail-product/:idProduct',
        loadChildren: () => import('../detail-product/detail-product.module').then(m => m.DetailProductPageModule),
        canActivate: [ToggleMenuGuard]
      },
      {
        path: 'car-detail',
        loadChildren: () => import('../car-detail/car-detail.module').then(m => m.CarDetailPageModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('../forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
      },
      {
        path: 'updated-password',
        loadChildren: () => import('../updated-password/updated-password.module').then(m => m.UpdatedPasswordPageModule)
      },
      {
        path: 'detail-banner/:bannerId',
        loadChildren: () => import('../detail-banner/detail-banner.module').then(m => m.DetailBannerPageModule),
        canActivate: [ToggleMenuGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/splash',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/splash',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
