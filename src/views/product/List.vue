<template>
    <div>
        <h2 class="intro-y text-lg font-medium mt-4 mb-5">Danh sách thương hiệu</h2>
        <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
            <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
        </div>
        <div class="grid grid-cols-12 gap-6 mt-5" v-if="!loadingIconAction">
            <div class="col-span-12 flex">
                <div class="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
                    <button class="btn btn-primary shadow-md mr-2" @click="createProduct">Thêm</button>
                </div>
                <div class="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
                    <button class="btn btn-primary shadow-md mr-2" @click="createOrder">Tạo đơn hàng</button>
                </div>
            </div>
            <div v-for="(item, index) in dataPage" :key="index" class="intro-y col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                <div class="box">
                    <div class="flex justify-end">
                        <input
                            class="form-check-input mt-2 mr-2"
                            type="checkbox"
                            @click="selectProducts(item._id, item.title, item.image, item.price)"
                        />
                    </div>
                    <div class="p-5 pt-2">
                        <div
                            class="h-40 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10"
                        >
                            <img alt="Midone - HTML Admin Template" class="rounded-md" :src="item.image" />
                            <span class="absolute top-0 bg-pending/80 text-white text-xs m-5 px-2 py-1 rounded z-10">{{item.brand}}</span>
                            <div class="absolute bottom-0 text-white px-5 pb-6 z-10">
                                <a href="" class="block font-medium text-base">{{item.title}}</a>
                            </div>
                        </div>
                        <div class="text-slate-600 dark:text-slate-500 mt-2">
                            <div class="flex items-center text-sm"><LinkIcon class="w-4 h-4 mr-2" /> Giá: {{item.price}}</div>
                            <div class="flex items-center mt-2 text-sm"><LayersIcon class="w-4 h-4 mr-2" /> Số lượng: {{item.quantity}}</div>
                        </div>
                    </div>
                    <div class="flex justify-center lg:justify-end items-center p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                        <a class="flex items-center text-primary mr-auto" href="javascript:;"> <EyeIcon class="w-4 h-4 mr-1" /> Preview </a>
                        <a class="flex items-center mr-3" href="javascript:;" @click="updateProduct(item._id)">
                            <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                        </a>
                        <a class="flex items-center text-danger" href="javascript:;" @click="onToggle(item._id)">
                            <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div id="false-delete" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-danger" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">Có lỗi trong quá trình xóa !</div>
            </div>
        </div>
        <div id="success-notification-delete" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-success" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">Xóa thành công !</div>
            </div>
        </div>
        <div id="false-create" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-danger" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">Có lỗi trong quá trình tạo đơn hàng !</div>
            </div>
        </div>
        <div id="success-notification-create" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-success" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">Tạo đơn hàng thành công !</div>
            </div>
        </div>
    </div>
    <!-- BEGIN: Pagination -->
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap justify-between mt-3" v-if="totalPages > 1">
        <pagination :totalPages="totalPages" :perPage="perPage" :currentPage="currentPage" @pagechanged="onPageChange" />
        <div class="hidden md:block mx-auto lg:col-span-4 text-slate-500">
            Hiển thị {{ currentPage }} trong {{ perPage }} trang của {{ totalReviewGroup }} phần tử
        </div>
        <select v-model="perPage" class="lg:col-span-4 w-20 form-select box mt-3 sm:mt-0">
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="64">64</option>
        </select>
    </div>
    <!-- END: Pagination -->
    <transition name="fade">
        <div id="headlessui-portal-root" v-if="isOpen == true">
            <div data-headlessui-portal="">
                <button
                    aria-hidden="true"
                    type="button"
                    style="
                        position: fixed;
                        height: 0px;
                        padding: 0px;
                        overflow: hidden;
                        clip: rect(0px, 0px, 0px, 0px);
                        white-space: nowrap;
                        border-width: 0px;
                    "
                ></button>
                <div>
                    <div class="relative z-[60]" id="headlessui-dialog-84" role="dialog" aria-modal="true" data-headlessui-state="open">
                        <div class="fixed -inset-24 bg-black/60" aria-hidden="true"></div>
                        <div class="fixed inset-0 opacity-100 mt-16">
                            <div
                                class="intro-y w-[90%] mx-auto bg-white relative rounded-md shadow-md transition-transform dark:bg-darkmode-600 sm:w-[460px]"
                                id="headlessui-dialog-panel-87"
                                data-headlessui-state="open"
                            >
                                <div class="p-5 text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="stroke-1.5 w-16 h-16 mx-auto mt-3 text-danger"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="15" y1="9" x2="9" y2="15"></line>
                                        <line x1="9" y1="9" x2="15" y2="15"></line>
                                    </svg>
                                    <div class="mt-5 text-3xl">Bạn chắc chắn?</div>
                                    <div class="mt-2 text-slate-500">Bạn có thực sự muốn xóa mục này?</div>
                                </div>
                                <div class="px-5 pb-8 text-center">
                                    <button
                                        class="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed border-secondary text-slate-500 dark:border-darkmode-100/40 dark:text-slate-300 [&amp;:hover:not(:disabled)]:bg-secondary/20 [&amp;:hover:not(:disabled)]:dark:bg-darkmode-100/10 w-24 mr-1"
                                        type="button"
                                        fdprocessedid="171j3s"
                                        @click="closeModal"
                                    >
                                        Hủy</button
                                    ><button
                                        class="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-danger border-danger text-white dark:border-danger w-24"
                                        type="button"
                                        fdprocessedid="ujsyd"
                                        @click="deleteProduct"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    aria-hidden="true"
                    type="button"
                    style="
                        position: fixed;
                        height: 0px;
                        padding: 0px;
                        overflow: hidden;
                        clip: rect(0px, 0px, 0px, 0px);
                        white-space: nowrap;
                        border-width: 0px;
                    "
                ></button>
            </div>
        </div>
    </transition>
    <Modal :show="isOpenModal" @hidden="isOpenModal = false" class="closeModal">
        <ModalHeader>
            <div>Name: Admin</div>
        </ModalHeader>
        <ModalBody class="p-0">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th class="whitespace-nowrap !py-5">Product</th>
                        <th class="whitespace-nowrap text-right">Unit Price</th>
                        <th class="whitespace-nowrap text-right">Qty</th>
                        <th class="whitespace-nowrap text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in order" :key="index">
                        <td class="!py-4">
                            <div class="flex items-center">
                                <div class="w-10 h-10 image-fit zoom-in">
                                    <Tippy
                                        tag="img"
                                        alt="Midone - HTML Admin Template"
                                        class="rounded-lg border-2 border-white shadow-md tooltip"
                                        :src="item.image"
                                    />
                                </div>
                                <Tippy
                                    tag="a"
                                    href="javascript:;"
                                    class="tooltip block flex justify-left font-medium w-60 whitespace-nowrap truncate ml-2"
                                    :content="item.title"
                                    >{{ item.title }}</Tippy
                                >
                            </div>
                        </td>
                        <td class="text-right">{{ formatPrice(item.price)}}</td>
                        <td class="text-right w-16">
                            <input
                                class="w-28 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 w-full"
                                type="number"
                                v-model="item.quatity"
                                @change="handleChange($event, item.price)"
                            />
                        </td>
                        <td class="text-right">{{ formatPrice(Number(item.price) * Number(item.quatity))}}</td>
                    </tr>
                </tbody>
            </table>
            <ModalFooter class="w-full">
                <div class="flex justify-end items-center">
                    <div class="text-right mr-5 mt-5 text-lg flex justify-end"></div>
                    <div class="text-right mr-5 mt-5 font-bold text-lg">Total: {{ formatPrice(totalPrice) }}</div>
                </div>
                <div class="flex justify-end items-center">
                    <div class="text-right mr-5 mt-5 text-lg flex justify-end">
                        <div class="bg-danger/20 text-danger rounded px-4 ml-1 py-2 cursor-pointer" @click="isOpenModal = false">Hủy</div>
                        <div class="bg-success/20 text-success rounded px-4 ml-1 py-2 cursor-pointer" @click="createOrderNew()">Tạo đơn hàng</div>
                    </div>
                </div>
            </ModalFooter>
        </ModalBody>
    </Modal>
</template>
<script>
import Toastify from 'toastify-js'
import ProductApi from '../../api-services/ProductApi'
import Pagination from '../../components/pagination/pagination.vue'
import OrderApi from '../../api-services/OrderApi'

export default {
    components: {
        Pagination
    },
    data() {
        return {
            listProduct: [],
            loadingIconAction: true,
            isOpen: false,
            idDel: null,
            perPage: 8,
            currentPage: 1,
            totalPages: 0,
            result: {},
            dataPage: {},
            order: [],
            isOpenModal: false,
            totalPrice: 0
        }
    },
    created() {
        this.getListProduct()
    },
    watch: {
        perPage: function () {
            this.dataPage = this.paginate(this.result, this.perPage, this.currentPage)
        }
    },
    methods: {
        async getListProduct() {
            this.loadingIconAction = true
            const res = await ProductApi.getAllProduct()
            this.listProduct = res.mess
            this.result = res.mess
            this.totalPages = Math.ceil(this.result.length / this.perPage)
            this.dataPage = this.paginate(this.result, this.perPage, 1)
            this.loadingIconAction = false
        },
        onPageChange(page) {
            this.dataPage = this.paginate(this.result, this.perPage, page)
            this.currentPage = page
        },
        paginate(array, page_size, page_number) {
            return array.slice((page_number - 1) * page_size, page_number * page_size)
        },
        onToggle(id) {
            this.idDel = id
            this.isOpen = !this.isOpen
        },
        closeModal() {
            this.isOpen = !this.isOpen
        },
        closeModalCreate() {
            this.isOpenModal = !this.isOpenModal
        },
        createOrder() {
            this.isOpenModal = !this.isOpenModal
        },
        handleChange(event, price) {
            this.totalPrice += price
        },
        selectProducts(id, title, image, price) {
            const obj = {
                pid: id,
                title: title,
                image: image,
                price: price,
                quatity: 1,
                total: price
            }
            this.order.push(obj)
            this.order.map((item, index) => {
                this.totalPrice += price
            })

        },
        async createOrderNew () {
            let params = []
            this.order.map((item, index) => {
                const obj = {
                    pid: item.pid,
                    quatity: item.quatity
                }
                params.push(obj)
            })
            const res = await OrderApi.createOrder(params)
            if (res.mess !== 'Create successfully') {
                Toastify({
                    node: dom('#false-create').clone().removeClass('hidden')[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true
                }).showToast()
            } else {
                this.loadingIconAction = false
                Toastify({
                    node: dom('#success-notification-create').clone().removeClass('hidden')[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true
                }).showToast()
                this.getListProduct()
            }
            this.isOpenModal = !this.isOpenModal
        },
        formatPrice(price) {
            console.log();
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        },
        async deleteProduct() {
            this.loadingIconAction = true
            const res = await ProductApi.deleteProduct(this.idDel)
            if (res.mess !== 'delete successfully') {
                Toastify({
                    node: dom('#false-delete').clone().removeClass('hidden')[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true
                }).showToast()
            } else {
                this.loadingIconAction = false
                Toastify({
                    node: dom('#success-notification-delete').clone().removeClass('hidden')[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true
                }).showToast()
                this.getListProduct()
            }
            this.isOpen = !this.isOpen
        },
        createProduct() {
            this.$router.push({ path: '/product/create' })
        },

        updateProduct(id) {
            this.$router.push({ path: '/product/create', query: { id: id } })
        }
    }
}
</script>
<style scoped>
.image-category {
    height: 100px;
    width: 100px;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 500ms ease-out;
}
</style>
<style>
.toastify .toastify-content {
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 2.5rem;
    padding-left: 0px;
}

.toastify .toastify-content .text-success,
.toastify .toastify-content .text-danger {
    margin-right: -10px;
    width: 65px;
}
.closeModal .modal-dialog {
    width: 800px !important;
}
</style>
