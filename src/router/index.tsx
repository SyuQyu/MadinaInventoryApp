import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Stok from '../pages/Stok/Stok';
import DetailStok from '../pages/Stok/Detail';
import UpdateItem from '../pages/Stok/UpdateItem';
import Transaksi from '../pages/transaksi/Transaksi';
import History from '../pages/History/History';
import DetailHistory from '../pages/History/Detail';
import AddItem from '../pages/Stok/AddItem';
import ListItem from '../pages/transaksi/ListItem';
import ListItemHistory from '../pages/History/ListItem';
import EditHistory from '../pages/History/EditHistory';
import Settings from '../pages/Settings';
import BrandSettings from '../pages/Brand/Brand';
import AddBrand from '../pages/Brand/AddBrand';
import UpdateBrand from '../pages/Brand/UpdateBrand';
// import useAuthStore from '../context/auth';
// const { isLoggedIn, token, dataUser } = useAuthStore();

export const routesAdmin = [
    {
        path: '/home',
        exact: true,
        component: Home
    },
    {
        path: '/settings',
        exact: true,
        component: Settings
    },
    {
        path: '/settings/brands',
        exact: true,
        component: BrandSettings
    },
    {
        path: '/settings/brands/create',
        component: AddBrand
    },
    {
        path: '/settings/brands/update/:id',
        component: UpdateBrand
    },
    {
        path: '/stok',
        exact: true,
        component: Stok
    },
    {
        path: '/stok/detail/:id',
        component: DetailStok
    },
    {
        path: '/stok/update/:id',
        component: UpdateItem
    },
    {
        path: '/stok/create',
        component: AddItem
    },
    {
        path: '/transaksi',
        exact: true,
        component: Transaksi
    },
    {
        path: '/transaksi/list-item',
        component: ListItem
    },
    {
        path: '/history',
        exact: true,
        component: History
    },
    {
        path: '/history/detail/:id',
        exact: true,
        component: DetailHistory
    },
    {
        path: '/history/edit/:id',
        exact: true,
        component: EditHistory
    },
    {
        path: '/history/edit/list-item/:id',
        exact: true,
        component: ListItemHistory
    },
];
export const routesStaff = [
    {
        path: '/home',
        exact: true,
        component: Home
    },
    {
        path: '/settings',
        exact: true,
        component: Settings
    },
    {
        path: '/settings/brands',
        component: BrandSettings
    },
    {
        path: '/stok',
        exact: true,
        component: Stok
    },
    {
        path: '/stok/detail/:id',
        component: DetailStok
    },
    {
        path: '/stok/update/:id',
        component: UpdateItem
    },
    {
        path: '/transaksi',
        exact: true,
        component: Transaksi
    },
    {
        path: '/transaksi/list-item',
        component: ListItem
    },
    {
        path: '/history',
        exact: true,
        component: History
    },
    {
        path: '/history/detail/:id',
        exact: true,
        component: DetailHistory
    }
];
