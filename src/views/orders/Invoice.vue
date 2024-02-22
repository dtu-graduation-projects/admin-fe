<template>
    <!-- BEGIN: Invoice -->
    <div class="intro-y box overflow-hidden mt-5">
        <div class="border-b border-slate-200/60 dark:border-darkmode-400 text-center sm:text-left">
            <div class="px-5 py-2 sm:px-20">
                <div class="text-primary font-semibold text-3xl">INVOICE</div>
                <div class="mt-2">Receipt <span class="font-medium">#1923195</span></div>
                <div class="mt-1">{{getCurrentDateFormatted()}}</div>
            </div>
            <div class="flex flex-col lg:flex-row px-5 sm:px-20 pt-10 pb-10 sm:pb-20">
                <div>
                    <div class="text-base text-slate-500">Client Details</div>
                    <div class="text-lg font-medium text-primary mt-2">{{order?.orderBy?.firstname + " " + order?.orderBy?.lastname }}</div>
                    <div class="mt-1">{{order?.orderBy?.email }}</div>
                    <div class="mt-1">{{order?.orderBy?.phone }}</div>
                </div>
                <div class="lg:text-right mt-10 lg:mt-0 lg:ml-auto">
                    <div class="text-base text-slate-500">Payment to</div>
                    <div class="text-lg font-medium text-primary mt-2">Lê Chỉ Mạnh</div>
                    <div class="mt-1">manhchile2001@gmail.com</div>
                </div>
            </div>
        </div>
        <div class="px-5 sm:px-16 py-10 sm:py-20">
            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="border-b-2 dark:border-darkmode-400 whitespace-nowrap">DESCRIPTION</th>
                            <th class="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">QTY</th>
                            <th class="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">PRICE</th>
                            <th class="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">SUBTOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in order.products" :key="index">
                            <td class="border-b dark:border-darkmode-400">
                                <div class="font-medium ">{{item.product.title}}</div>
                            </td>
                            <td class="text-right border-b dark:border-darkmode-400 w-32">{{item.quatity}}</td>
                            <td class="text-right border-b dark:border-darkmode-400 w-32">{{formatPrice(item.product.price)}}</td>
                            <td class="text-right border-b dark:border-darkmode-400 w-32 font-medium">{{formatPrice(item.product.totalPrice)}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row">
            <div class="text-center sm:text-left mt-10 sm:mt-0">
                <div class="text-base text-slate-500">Bank Transfer</div>
                <div class="text-lg text-primary font-medium mt-2">Lê Chỉ Mạnh</div>
                <div class="mt-1">Bank Account : 4000101012001</div>
                <div class="mt-1">Code : {{order.codeBill}}</div>
            </div>
            <div class="text-center sm:text-right sm:ml-auto">
                <div class="text-base text-slate-500">Total Amount</div>
                <div class="text-xl text-primary font-medium mt-2">{{formatPrice(order.total)}}</div>
                <div class="mt-1">Taxes included</div>
            </div>
        </div>
    </div>
    <!-- END: Invoice -->
</template>
<script>
import OrderApi from '../../api-services/OrderApi'
export default {
    // props: {
    //     getIdOrder: String
    // },
    data() {
        return {
            order: []
        }
    },
    created() {
        this.getOrderById();
    },
    methods: {
        async getOrderById () {
            this.loadingIconAction = true
            this.getIdOrder = new URLSearchParams(window.location.search).get('id')
            const res = await OrderApi.getOrderById(this.getIdOrder)
            this.order = res.order
            this.order.products.map((item, index) => {
                this.totalProduct++
                let totalPrice = 0;
                totalPrice = item.product.price * item.quatity
                item.product.totalPrice = totalPrice
            })
            console.log(this.order);
            this.confirmationModal = false
            this.loadingIconAction = false
        },
        formatPrice(price) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        },
        getCurrentDateFormatted() {
            const months = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];

            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = months[currentDate.getMonth()];
            const year = currentDate.getFullYear();

            return `${month} ${day}, ${year}`;
        }
    }
}
</script>
