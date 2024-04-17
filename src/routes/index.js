import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const routes =  [
    { 
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    { 
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    { 
        path: '/product',
        page: ProductPage,
        isShowHeader: true
    },
    { 
        path: '*',
        page: NotFoundPage
    }
]