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
export const routes = [
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
