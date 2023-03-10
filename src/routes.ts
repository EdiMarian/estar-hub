import { RouteType } from '@multiversx/sdk-dapp/types';
// import { dAppName } from 'config';
// import { withPageTitle } from './components';

import { Home, Login, CreateAccount, Account } from './pages';

export const routeNames = {
  home: '/',
  login: '/login',
  createAccount: '/login/create',
  account: '/account'
};

export const routes: RouteType[] = [
  {
    path: routeNames.home,
    component: Home
  },
  {
    path: routeNames.login,
    component: Login
  },
  {
    path: routeNames.createAccount,
    component: CreateAccount
  },
  {
    path: routeNames.account,
    component: Account
  }
];

// export const mappedRoutes = routes.map((route) => {
//   const title = route.title ? `${route.title} • EstarGames` : `EstarGames`;

//   const requiresAuth = Boolean(route.authenticatedRoute);
//   const wrappedComponent = withPageTitle(title, route.component);

//   return {
//     path: route.path,
//     component: wrappedComponent,
//     authenticatedRoute: requiresAuth
//   };
// });
