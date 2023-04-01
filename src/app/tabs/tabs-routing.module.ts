import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatBotGuard } from '../guard/chat-bot.guard';
import { SessionGuard } from '../guard/session.guard';
import { ToggleMenuGuard } from '../guard/toggle-menu.guard';
import { TabsPage } from './tabs.page';
import { RecoverPasswordGuard } from '../guard/recover-password.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule),
        canActivate: [ToggleMenuGuard, ChatBotGuard],
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule),
        canActivate: [ToggleMenuGuard],
      },
      {
        path: 'splash',
        loadChildren: () => import('../splash/splash.module').then(m => m.SplashPageModule),
        canActivate: [ToggleMenuGuard, RecoverPasswordGuard],
      },
      {
        path: 'welcome',
        loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomePageModule),
        canActivate: [ToggleMenuGuard, ChatBotGuard],
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [ToggleMenuGuard, ChatBotGuard],
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
        canActivate: [ToggleMenuGuard, ChatBotGuard],
        data: { cache: false }
      },
      {
        path: 'sidebar-menu',
        loadChildren: () => import('../sidebar-menu/sidebar-menu.module').then(m => m.SidebarMenuPageModule),
        canActivate: [ToggleMenuGuard, ChatBotGuard],
      },
      {
        path: 'offert',
        loadChildren: () => import('../offert/offert.module').then(m => m.OffertPageModule),
        canActivate: [ToggleMenuGuard, ChatBotGuard],
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
        canActivate: [ToggleMenuGuard, ChatBotGuard],
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
        canActivate: [ToggleMenuGuard, ChatBotGuard],
      },
      {
        path: 'support',
        loadChildren: () => import('../support/support.module').then(m => m.SupportPageModule),
        canActivate: [ChatBotGuard]
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
