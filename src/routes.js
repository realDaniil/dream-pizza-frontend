import AboutPage from "./pages/about/AboutPage"
import AuthPage from "./pages/auth/AuthPage"
import BasketPage from "./pages/BasketPage"
import CreateProduct from "./pages/createProduct/CreateProduct"
import CreateReview from "./pages/createReview/CreateReview"
import DeliveryPage from "./pages/DeliveryPage"
import ContactsPage from "./pages/ContactsPage"
import AllReviewsPage from "./pages/allReviews/AllReviewsPage"
import CabinetPage from "./pages/cabinet/CabinetPage"

import {
  BASKET_ROUTE,
  DELIVERY_ROUTE,
  ABOUT_ROUTE,
  CONTACTS_ROUTE,
  ALL_REVIEWS_ROUTE,
  CREATE_PRODUCT_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  CREATE_REVIEW_ROUTE,
  EDIT_PRODUCT_ROUTE,
  EDIT_REVIEW_ROUTE,
  CABINET_ROUTE
} from "./utils/constants"

export const publicRoutes = [
  {
    path: BASKET_ROUTE,
    Element: BasketPage
  },
  // {
  //   path: ONE_PRODUCT_ROUTE + '/:id',
  //   Element: OnePostPage
  // },
  {
    path: LOGIN_ROUTE,
    Element: AuthPage
  },
  {
    path: REGISTRATION_ROUTE,
    Element: AuthPage
  },
  // {
  //   path: USER_ROUTE,
  //   Element: UserPage
  // },
  {
    path: DELIVERY_ROUTE,
    Element: DeliveryPage
  },
  {
    path: ABOUT_ROUTE,
    Element: AboutPage
  },
  {
    path: CONTACTS_ROUTE,
    Element: ContactsPage
  },
  {
    path: ALL_REVIEWS_ROUTE,
    Element: AllReviewsPage
  }
]

export const authRoutes = [
  {
    path: CREATE_REVIEW_ROUTE,
    Element: CreateReview
  },
  {
    path: EDIT_REVIEW_ROUTE + '/:id',
    Element: CreateReview
  },
  {
    path: CABINET_ROUTE,
    Element: CabinetPage
  }
]

export const adminRoutes = [
  {
    path: CREATE_PRODUCT_ROUTE,
    Element: CreateProduct
  },
  {
    path: EDIT_PRODUCT_ROUTE + '/:id',
    Element: CreateProduct
  }
]