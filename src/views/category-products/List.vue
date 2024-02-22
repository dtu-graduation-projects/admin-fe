<template>
    <div>
        <h2 class="intro-y text-lg font-medium mt-4 mb-5">Danh sách danh mục</h2>
        <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
            <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
        </div>
        <div class="grid grid-cols-12 gap-6 mt-5" v-if="!loadingIconAction">
            <div class="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
                <button class="btn btn-primary shadow-md mr-2" @click="createCategoryProduct">Thêm</button>
            </div>
            <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
                <table class="table table-report -mt-2">
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap">STT</th>
                            <th class="whitespace-nowrap">Tên danh mục</th>
                            <th class="whitespace-nowrap">Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="intro-x" v-for="(item, index) in dataPage" :key="index" :value="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.createdAt.substring(0, 10) }}</td>
                            <td class="table-report__action w-30">
                                <div class="flex justify-center items-center">
                                    <a class="flex items-center mr-3 text-primary" href="javascript:;" @click="updateCategoryProduct(item._id)">
                                        <EditIcon class="w-cutom-icon mr-1" />
                                    </a>
                                    <a class="flex items-center text-danger" href="javascript:;" @click="onToggle(item._id)">
                                        <Trash2Icon class="w-cutom-icon mr-1" />
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
    </div>
    <!-- BEGIN: Pagination -->
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap justify-between mt-3" v-if="totalPages > 1">
        <pagination :totalPages="totalPages" :perPage="perPage" :currentPage="currentPage" @pagechanged="onPageChange" />
        <div class="hidden md:block mx-auto lg:col-span-4 text-slate-500">
            Hiển thị {{ currentPage }} trong {{ perPage }} trang của {{ totalReviewGroup }} phần tử
        </div>
        <select v-model="perPage" class="lg:col-span-4 w-20 form-select box mt-3 sm:mt-0">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="35">35</option>
            <option value="50">50</option>
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
                                        @click="deleteCategoryProduct"
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
</template>
<script>
import Toastify from 'toastify-js'
import Pagination from '../../components/pagination/pagination.vue'
import CategoryProductApi from '../../api-services/CategoryProductApi'

export default {
    components: {
        Pagination
    },
    data() {
        return {
            listCategoryProduct: [],
            loadingIconAction: true,
            isOpen: false,
            idDel: null,
            perPage: 10,
            currentPage: 1,
            totalPages: 0,
            result: {},
            dataPage: {},
        }
    },
    created() {
        this.getListCategoryProduct()
    },
    watch: {
        perPage: function () {
            this.dataPage = this.paginate(this.result, this.perPage, this.currentPage)
        }
    },
    methods: {
        onPageChange(page) {
            this.dataPage = this.paginate(this.result, this.perPage, page)
            this.currentPage = page
        },
        paginate(array, page_size, page_number) {
            return array.slice((page_number - 1) * page_size, page_number * page_size)
        },
        async getListCategoryProduct() {
            this.loadingIconAction = true
            const res = await CategoryProductApi.getAllCategoryProduct()
            this.result = res.category
            this.totalPages = Math.ceil(this.result.length / this.perPage)
            this.dataPage = this.paginate(this.result, this.perPage, 1)
            this.listCategoryProduct = res.category
            this.loadingIconAction = false
        },
        onToggle(id) {
            this.idDel = id
            this.isOpen = !this.isOpen
        },
        closeModal() {
            this.isOpen = !this.isOpen
        },
        async deleteCategoryProduct() {
            this.loadingIconAction = true
            const res = await CategoryProductApi.deleteCategoryProduct(this.idDel)
            if (res.mess !== 'Delete successfully') {
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
                await this.getListCategoryProduct()
            }
            this.isOpen = !this.isOpen
        },
        createCategoryProduct() {
            this.$router.push({ path: '/category-product/create' })
        },

        updateCategoryProduct(id) {
            this.$router.push({ path: '/category-product/create', query: { id: id } })
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
</style>
