import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";

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
        path: '/type',
        page: TypeProductPage,
        isShowHeader: true
    },
    { 
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: true
    },
    { 
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: true
    },
    { 
        path: '/product-details',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    { 
        path: '*',
        page: NotFoundPage
    }
]