import { defineStore } from 'pinia'

export const useSideMenuStore = defineStore('sideMenu', {
    state: () => ({
        menu: [
            {
                icon: 'HomeIcon',
                pageName: 'dashboard-overview',
                title: 'DashBoard',
                subMenu: [
                    {
                        icon: 'ListIcon',
                        pageName: 'dashboard-overview',
                        title: 'Overview'
                    }
                ]
            },
            {
                icon: 'UserIcon',
                pageName: 'user',
                title: 'User',
                subMenu: [
                    {
                        icon: 'ListIcon',
                        pageName: 'user-list',
                        title: 'List User'
                    },
                    {
                        icon: 'PlusSquareIcon',
                        pageName: 'user-create',
                        title: 'Create User'
                    }
                ]
            },
            {
                icon: 'SlackIcon',
                pageName: 'brand',
                title: 'Brand',
                subMenu: [
                    {
                        icon: 'ListIcon',
                        pageName: 'brand-list',
                        title: 'List Brand'
                    },
                    {
                        icon: 'PlusSquareIcon',
                        pageName: 'brand-create',
                        title: 'Create Brand'
                    }
                ]
            },
            {
                icon: 'ShoppingBagIcon',
                pageName: 'product',
                title: 'Product',
                subMenu: [
                    {
                        icon: 'ListIcon',
                        pageName: 'product-list',
                        title: 'List Product'
                    },
                    {
                        icon: 'PlusSquareIcon',
                        pageName: 'product-create',
                        title: 'Create Product'
                    }
                ]
            },
            {
                icon: 'FolderIcon',
                pageName: 'category-product',
                title: 'Category Product',
                subMenu: [
                    {
                        icon: 'ListIcon',
                        pageName: 'category-product-list',
                        title: 'List Category Product'
                    },
                    {
                        icon: 'PlusSquareIcon',
                        pageName: 'category-product-create',
                        title: 'Create Category Product'
                    }
                ]
            },
            {
                icon: 'BriefcaseIcon',
                pageName: 'category-blog',
                title: 'Category Blog',
                subMenu: [
                    {
                        icon: 'ListIcon',
                        pageName: 'category-blog-list',
                        title: 'List Category Blog'
                    },
                    {
                        icon: 'PlusSquareIcon',
                        pageName: 'category-blog-create',
                        title: 'Create Category Blog'
                    }
                ]
            },
            {
                icon: 'BookOpenIcon',
                pageName: 'blog',
                title: 'Blog',
                subMenu: [
                    {
                        icon: 'ListIcon',
                        pageName: 'blog-list',
                        title: 'List Blog'
                    },
                    {
                        icon: 'PlusSquareIcon',
                        pageName: 'blog-create',
                        title: 'Create Blog'
                    }
                ]
            },
            {
                icon: 'ShoppingCartIcon',
                pageName: 'orders',
                title: 'Order',
                subMenu: [
                    {
                        icon: 'ListIcon',
                        pageName: 'order-list',
                        title: 'List Order'
                    },
                    {
                        icon: 'PlusSquareIcon',
                        pageName: 'product-list',
                        title: 'Create Order'
                    }
                ]
            },
            {
                icon: 'ArchiveIcon',
                pageName: 'coupons',
                title: 'Coupons',
                subMenu: [
                    {
                        icon: 'ListIcon',
                        pageName: 'coupons-list',
                        title: 'List Coupons'
                    },
                    {
                        icon: 'PlusSquareIcon',
                        pageName: 'coupons-create',
                        title: 'Create Coupons'
                    }
                ]
            }
        ]
    })
})
