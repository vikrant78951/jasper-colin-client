import { NavType } from "./definitions";


export const NAV: NavType[] = [
    {
        id: 1,
        title: 'Home',
        url: '/',
    },
    {
        id: 2,
        title: 'Products',
        url: '/products',
    },
    {
        id: 3,
        title: 'Doc',
        url: '/doc',
    },
    
];

export const API: { [key: string]: string } = {
  products: "/api/products",
  login: "/api/auth/login",
  register: "/api/auth/register",
  logout: "/api/auth/logout",
  refresh: "/api/auth/refresh",
  session: "/api/auth/session",
};