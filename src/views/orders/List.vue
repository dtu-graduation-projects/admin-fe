<template>
    <h2 class="intro-y text-lg font-medium mt-10">Transaction List</h2>
    <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
        <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5" v-else>
        <div class="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
            <div class="flex w-full sm:w-auto">
                <div class="w-48 relative text-slate-500">
                    <input
                        v-model="searchName"
                        type="text"
                        class="form-control w-48 box pr-10"
                        placeholder="Search by name..."
                        @keydown="handleChange"
                    />
                    <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
                </div>
                <select class="form-select box ml-2" v-model="selectStatus">
                    <option v-for="item in status" :key="item" :value="item" :selected="item === 'All'">{{item}}</option>
                </select>
            </div>
            <div class="hidden xl:block mx-auto text-slate-500"></div>
            <div class="w-full xl:w-auto flex items-center mt-3 xl:mt-0">
                <button class="btn btn-primary shadow-md mr-2"><FileTextIcon class="w-4 h-4 mr-2" /> Export to Excel</button>
                <button class="btn btn-primary shadow-md mr-2"><FileTextIcon class="w-4 h-4 mr-2" /> Export to PDF</button>
                <Dropdown>
                    <DropdownToggle class="dropdown-toggle btn px-2 box">
                        <span class="w-5 h-5 flex items-center justify-center">
                            <PlusIcon class="w-4 h-4" />
                        </span>
                    </DropdownToggle>
                    <DropdownMenu class="w-40">
                        <DropdownContent>
                            <DropdownItem>
                                <ArrowLeftRightIcon class="w-4 h-4 mr-2" />
                                Change Status
                            </DropdownItem>
                            <DropdownItem> <BookmarkIcon class="w-4 h-4 mr-2" /> Bookmark </DropdownItem>
                        </DropdownContent>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <!-- BEGIN: Data List -->
        <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
            <table class="table table-report -mt-2">
                <thead>
                    <tr>
                        <th class="whitespace-nowrap">
                            <input class="form-check-input" type="checkbox" />
                        </th>
                        <th class="whitespace-nowrap">INVOICE</th>
                        <th class="whitespace-nowrap">BUYER NAME</th>
                        <th class="text-center whitespace-nowrap">STATUS</th>
                        <th class="whitespace-nowrap">PAYMENT</th>
                        <th class="text-right whitespace-nowrap">
                            <div class="pr-16">TOTAL TRANSACTION</div>
                        </th>
                        <th class="text-center whitespace-nowrap">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in dataPage" :key="index" class="intro-x">
                        <td class="w-10">
                            <input class="form-check-input" type="checkbox" />
                        </td>
                        <td class="w-40 !py-4">
                            <a href="" class="underline decoration-dotted whitespace-nowrap">#{{ item?.codeBill }}</a>
                        </td>
                        <td class="w-40">
                            <a href="" class="font-medium whitespace-nowrap">{{
                                item?.orderBy?.firstname + " " + item?.orderBy?.lastname
                            }}</a>
                            <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">{{item?.orderBy?.email}}</div>
                        </td>
                        <td class="text-center">
                            <div
                                class="flex items-center justify-center whitespace-nowrap"
                                :class="{
                                    'text-success': item?.status == 'Succeeded',
                                    'text-danger': item?.status == 'Cancelled',
                                    'text-amber-500': item?.status == 'Processing',
                                    }"
                            >
                                <CheckSquareIcon class="w-4 h-4 mr-2" />
                                <p v-if="item.status == 'Succeeded'">Succeeded</p>
                                <p v-if="item.status == 'Cancelled'">Cancelled</p>
                                <p v-if="item.status == 'Processing'">Processing</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <div class="whitespace-nowrap">{{item?.payments}}</div>
                                <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">{{formatDateTime (item?.createdAt)}}</div>
                            </div>
                        </td>
                        <td class="w-40 text-center">
                            <div class="pr-16">{{formatPrice(item?.total)}}</div>
                        </td>
                        <td class="table-report__action">
                            <div class="flex flex-col justify-center items-center">
                                <div class="flex justify-center items-center">
                                    <a class="flex items-center mr-3 text-primary" href="javascript:;" @click="detailOrder(item?._id)">
                                        <EditIcon class="w-cutom-icon mr-1" />
                                    </a>
                                    <a class="flex items-center text-danger" href="javascript:;" @click="onToggle(item?._id)">
                                        <Trash2Icon class="w-cutom-icon mr-1" />
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- END: Data List -->
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
    <!-- BEGIN: Delete Confirmation Modal -->
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
                                        @click="deleteOrder"
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
    <!-- END: Delete Confirmation Modal -->
</template>
<script>
import Toastify from 'toastify-js'
import OrderApi from '../../api-services/OrderApi'
import Pagination from '../../components/pagination/pagination.vue'

export default {
    components: {
        Pagination
    },
    data() {
        return {
            listOrder: [],
            perPage: 10,
            currentPage: 1,
            totalPages: 0,
            isOpen: false,
            result: {},
            dataPage: {},
            status: ['All', 'Cancelled', 'Processing', 'Succeeded'],
            selectStatus: 'All',
            searchName: '',
            confirmModal: false,
            loadingIconAction: false
        }
    },
    created() {
        this.getListOrders()
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
        async getListOrders () {
            this.loadingIconAction = true
            const res = await OrderApi.getListOrders();
            this.result = res.order
            this.result.sort((a, b) => {
                if (a.status === 'Processing') {
                    return -1;
                } else if (b.status === 'Processing') {
                    return 1;
                } else {
                    return 0;
                }
            })
            this.totalPages = Math.ceil(this.result.length / this.perPage)
            this.dataPage = this.paginate(this.result, this.perPage, 1)
            this.listOrder = res.order
            this.loadingIconAction = false
        },
        detailOrder(id) {
            this.$router.push({ path: '/order/detail', query: { id: id } })
        },
        formatDateTime(date) {
            const originalDateTime = new Date(date);
            const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
            return originalDateTime.toLocaleDateString('en-US', options);

        },
        formatPrice(price) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        },
        onToggle(id) {
            this.idDel = id
            this.isOpen = !this.isOpen
        },
        closeModal() {
            this.isOpen = !this.isOpen
        },
        async deleteOrder() {
            this.loadingIconAction = true
            const res = await OrderApi.deleteOrder(this.idDel)
            if (res.mess !== 'Delete Successfully') {
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
                await this.getListOrders()
            }
            this.isOpen = !this.isOpen
        },
    },
    computed: {
        dataPage() {
            if (!this.searchName && this.selectStatus === 'All') {
            return this.dataPage;
            }
            const searchTermLowerCase = this.searchName.toLowerCase();
            return this.dataPage.filter(item => {
                const fullName = `${item.orderBy.firstname} ${item.orderBy.lastname}`.toLowerCase();
                const matchesSearchTerm = !this.searchName || fullName.toLowerCase().includes(searchTermLowerCase);
                const matchesStatus = this.selectStatus === 'All' || item.status === this.selectStatus;
                return matchesSearchTerm && matchesStatus;
            });
        }
    }
}
</script>
<style>
.m-custom {
    min-height: 80vh !important;
}
</style>
