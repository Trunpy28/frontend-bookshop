import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";

export const routes =  [
    { 
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isPrivate: false
    },
    { 
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
        isPrivate: false
    },
    { 
        path: '/product',
        page: ProductPage,
        isShowHeader: true,
        isPrivate: false
    },
    { 
        path: '/type',
        page: TypeProductPage,
        isShowHeader: true,
        isPrivate: false
    },
    { 
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: true,
        isPrivate: false
    },
    { 
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: true,
        isPrivate: false
    },
    { 
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true,
        isPrivate: false
    },
    { 
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true,
        isPrivate: false
    },
    { 
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    { 
        path: '*',
        page: NotFoundPage
    }
]