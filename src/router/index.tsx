import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Stok from '../pages/Stok';
import Penjualan from '../pages/penjualan/Penjualan';
import StokIn from '../pages/penjualan/stockIn';
import History from '../pages/History';
export const routes = [
    {
        path: '/login',
        exact: true,
        component: Login
    },
    {
        path: '/home',
        exact: true,
        component: Home
    },
    {
        path: '/stok',
        exact: true,
        component: Stok
    },
    {
        path: '/penjualan',
        exact: true,
        component: Penjualan
    },
    {
        path: '/penjualan/stock-in',
        component: StokIn
    },
    {
        path: '/history',
        exact: true,
        component: History
    }
];
