import { createRouter, createWebHistory } from 'vue-router'
import SideMenu from '../layouts/side-menu/Main.vue'
import ListUser from '../views/user/List.vue'
import CreateUser from '../views/user/Create.vue'
import ListBrand from '../views/brand/List.vue'
import CreateBrand from '../views/brand/Create.vue'
import ListProduct from '../views/product/List.vue'
import CreateCategoryProduct from '../views/category-products/Create.vue'
import ListCategoryProduct from '../views/category-products/List.vue'
import CreateProduct from '../views/product/Create.vue'
import CreateCategoryBlog from '../views/category-blog/Create.vue'
import ListCategoryBlog from '../views/category-blog/List.vue'
import CreateBlog from '../views/blog/Create.vue'
import ListBlog from '../views/blog/List.vue'
import DetailBlog from '../views/blog/Detail.vue'
import ListOrder from '../views/orders/List.vue'
import ListCoupons from '../views/coupons/List.vue'
import CreateCoupons from '../views/coupons/Create.vue'
import ApplyCoupons from '../views/coupons/ApplyCoupons.vue'
import OrderDetail from '../views/orders/OrderDetail.vue'
import Invoice from '../views/orders/Invoice.vue'
import DashboardOverview from '../views/dashboard-overview/Main.vue'
import Login from '../views/auth/Login.vue'
import ErrorPage from '../views/error-page/Main.vue'
import store from '../stores'
import { isEmpty } from 'lodash'
const routes = [
    {
        path: '/',
        component: SideMenu,
        children: [
            {
                path: '/',
                name: 'dashboard-overview',
                component: DashboardOverview
            },
            {
                path: '/user/list',
                name: 'user-list',
                component: ListUser
            },
            {
                path: '/user/create',
                name: 'user-create',
                component: CreateUser
            },
            {
                path: '/brand/list',
                name: 'brand-list',
                component: ListBrand
            },
            {
                path: '/brand/create',
                name: 'brand-create',
                component: CreateBrand
            },
            {
                path: '/product/list',
                name: 'product-list',
                component: ListProduct
            },
            {
                path: '/product/create',
                name: 'product-create',
                component: CreateProduct
            },
            {
                path: '/category-product/list',
                name: 'category-product-list',
                component: ListCategoryProduct
            },
            {
                path: '/category-product/create',
                name: 'category-product-create',
                component: CreateCategoryProduct
            },
            {
                path: '/category-blog/list',
                name: 'category-blog-list',
                component: ListCategoryBlog
            },
            {
                path: '/category-blog/create',
                name: 'category-blog-create',
                component: CreateCategoryBlog
            },
            {
                path: '/blog/list',
                name: 'blog-list',
                component: ListBlog
            },
            {
                path: '/blog/create',
                name: 'blog-create',
                component: CreateBlog
            },
            {
                path: '/blog/detail',
                name: 'blog-detail',
                component: DetailBlog
            },
            {
                path: '/order/list',
                name: 'order-list',
                component: ListOrder
            },
            {
                path: '/order/detail',
                name: 'order-detail',
                component: OrderDetail
            },
            {
                path: '/coupons/list',
                name: 'coupons-list',
                component: ListCoupons
            },
            {
                path: '/coupons/create',
                name: 'coupons-create',
                component: CreateCoupons
            },
            {
                path: '/coupons/apply-coupons',
                name: 'apply-coupons',
                component: ApplyCoupons
            },
            {
                path: '/order/invoice',
                name: 'invoice',
                component: Invoice
            }
        ]
    },

    {
        path: '/error-page',
        name: 'error-page',
        component: ErrorPage
    },
    {
        path: '/:pathMatch(.*)*',
        component: ErrorPage
    },

    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    }
})
router.beforeEach(async (to, from, next) => {
    let { access_token, user } = store.state.auth
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    if (access_token && isEmpty(user)) {
        user = store.state.auth.user
    }

    if (access_token && (to.path === '/admin/login' || to.path === '/') && !isEmpty(user)) {
        next()
    } else if (!access_token && requiresAuth) {
        next({
            path: '/admin/login'
        })
    } else {
        next()
    }
})
export default router
