import Home from '../pages/Home';
import Stok from '../pages/Stock/Stock';
import DetailStok from '../pages/Stock/Detail';
import UpdateItem from '../pages/Stock/UpdateItem';
import Transaction from '../pages/Transaction/Transaction';
import History from '../pages/History/History';
import DetailHistory from '../pages/History/Detail';
import AddItem from '../pages/Stock/AddItem';
import ListItem from '../pages/Transaction/ListItem';
import ListItemHistory from '../pages/History/ListItem';
import EditHistory from '../pages/History/EditHistory';
import Settings from '../pages/Settings';
import BrandSettings from '../pages/Brand/Brand';
import AddBrand from '../pages/Brand/AddBrand';
import UpdateBrand from '../pages/Brand/UpdateBrand';
import TypeSettings from '../pages/Type/Type';
import AddType from '../pages/Type/AddType';
import UpdateType from '../pages/Type/UpdateType';
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
        path: '/settings/types',
        exact: true,
        component: TypeSettings
    },
    {
        path: '/settings/types/create',
        component: AddType
    },
    {
        path: '/settings/types/update/:id',
        component: UpdateType
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
        component: Transaction
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
        path: '/settings/types',
        exact: true,
        component: TypeSettings
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
        component: Transaction
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
