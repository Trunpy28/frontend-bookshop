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
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import MyOrderPage from "../pages/MyOrder/MyOrderPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import EmailInput from "../pages/ResetPassword/EmailInput";
import OTPInput from "../pages/ResetPassword/OTPInput";
import ResetPassword from "../pages/ResetPassword/ResetPassword";


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
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true,
        isPrivate: false
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    { 
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,
        isPrivate: false
    },
    { 
        path: '/order-success',
        page: OrderSuccess,
        isShowHeader: true,
        isPrivate: false
    },
    { 
        path: '/products',
        page: ProductPage,
        isShowHeader: true,
        isPrivate: false
    },
    { 
        path: '/product/:type',
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
        path: '/account/recovery',
        page: EmailInput,
        isShowHeader: true,
        isPrivate: false
    },
    { 
        path: '/account/recovery/otp/:email',
        page: OTPInput,
        isShowHeader: true,
        isPrivate: false
    },
    { 
        path: '/account/recovery/reset-password',
        page: ResetPassword,
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
        path: '/contact',
        page: ContactPage,
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