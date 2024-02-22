<template>
    <div v-if="loadingIconAction">
        <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
            <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
        </div>
    </div>
    <div v-else>
        <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
            <h2 class="text-lg font-medium mr-auto">Transaction Details</h2>
            <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
                <button class="btn btn-primary shadow-md mr-2" @click="convertToPdf"><FileTextIcon class="w-4 h-4 mr-2" /> Export to PDF</button>
                <div style="display: none;" ref="pdfWrapper">
                    <Invoice :getIdOrder="getIdOrder"></Invoice>
                    <br />
                </div>
                <Dropdown class="ml-auto sm:ml-0">
                    <DropdownToggle class="btn px-2 box">
                        <span class="w-5 h-5 flex items-center justify-center">
                            <PlusIcon class="w-4 h-4" />
                        </span>
                    </DropdownToggle>
                    <DropdownMenu class="w-40">
                        <DropdownContent>
                            <DropdownItem> <FileIcon class="w-4 h-4 mr-2" /> Export Word </DropdownItem>
                            <DropdownItem> <FileIcon class="w-4 h-4 mr-2" /> Export to PDF </DropdownItem>
                        </DropdownContent>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <!-- BEGIN: Transaction Details -->
        <div class="intro-y grid grid-cols-11 gap-5 mt-5">
            <div class="col-span-12 lg:col-span-4 2xl:col-span-3">
                <div class="box p-5 rounded-md">
                    <div class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                        <div class="font-medium text-base truncate">Transaction Details</div>
                    </div>
                    <div class="flex items-center">
                        <ClipboardIcon class="w-4 h-4 text-slate-500 mr-2" />
                        Invoice:
                        <a href="" class="underline decoration-dotted ml-1">{{ order.codeBill }}</a>
                    </div>
                    <div class="flex items-center mt-3">
                        <CalendarIcon class="w-4 h-4 text-slate-500 mr-2" />
                        Purchase Date: {{formatDateTime (order.createdAt)}}
                    </div>
                    <div class="flex items-center mt-3">
                        <ClockIcon class="w-4 h-4 text-slate-500 mr-2" />
                        Transaction Status:
                        <span class="bg-success/20 text-success rounded px-2 ml-1" v-if="order.status == 'Succeeded'">{{order.status}}</span>
                        <span class="bg-danger/20 text-danger rounded px-2 ml-1" v-if="order.status == 'Cancelled'">{{order.status}}</span>
                        <span class="bg-amber-500/20 text-amber-500 rounded px-2 ml-1" v-if="order.status == 'Processing'">{{order.status}}</span>
                    </div>
                </div>
                <div class="box p-5 rounded-md mt-5">
                    <div class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                        <div class="font-medium text-base truncate">Buyer Details</div>
                    </div>
                    <div class="flex items-center">
                        <ClipboardIcon class="w-4 h-4 text-slate-500 mr-2" />
                        Name:
                        <a href="" class="underline decoration-dotted ml-1">{{
                        order.orderBy.firstname + " " + order.orderBy.lastname
                        }}</a>
                    </div>
                    <div class="flex items-center mt-3">
                        <CalendarIcon class="w-4 h-4 text-slate-500 mr-2" />
                        Phone Number: {{ order.orderBy.phone }}
                    </div>
                    <div class="flex items-center mt-3">
                        <MapPinIcon class="w-4 h-4 text-slate-500 mr-2" />
                        Email: {{ order.orderBy.email }}
                    </div>
                </div>
                <div class="box p-5 rounded-md mt-5">
                    <div class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                        <div class="font-medium text-base truncate">Payment Details</div>
                    </div>
                    <div class="flex items-center">
                        <ClipboardIcon class="w-4 h-4 text-slate-500 mr-2" />
                        Payment Method:
                        <div class="ml-auto">{{order.payments }}</div>
                    </div>
                    <div class="flex items-center mt-3">
                        <CreditCardIcon class="w-4 h-4 text-slate-500 mr-2" />
                        Total Price ({{totalProduct}} items):
                        <div class="ml-auto">{{formatPrice(order.total) }}</div>
                    </div>
                    <div class="flex items-center mt-3">
                        <CreditCardIcon class="w-4 h-4 text-slate-500 mr-2" />
                        Total Shipping Cost:
                        <div class="ml-auto">{{formatPrice(0)}}</div>
                    </div>
                    <div class="flex items-center border-t border-slate-200/60 dark:border-darkmode-400 pt-5 mt-5 font-medium">
                        <CreditCardIcon class="w-4 h-4 text-slate-500 mr-2" />
                        Grand Total:
                        <div class="ml-auto">{{formatPrice(order.total) }}</div>
                    </div>
                </div>
                <div class="box p-5 rounded-md mt-5">
                    <div class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                        <div class="font-medium text-base truncate">Shipping Information</div>
                        <a href="" class="flex items-center ml-auto text-primary"> <MapPinIcon class="w-4 h-4 mr-2" /> Tracking Info </a>
                    </div>
                    <div class="flex items-center">
                        <ClipboardIcon class="w-4 h-4 text-slate-500 mr-2" />
                        Courier: Left4code Express
                    </div>
                    <div class="flex items-center mt-3">
                        <CalendarIcon class="w-4 h-4 text-slate-500 mr-2" />
                        Tracking Number: 003005580322
                        <CopyIcon class="w-4 h-4 text-slate-500 ml-2" />
                    </div>
                    <div class="flex items-center mt-3">
                        <MapPinIcon class="w-4 h-4 text-slate-500 mr-2" />
                        Address: 260 W. Storm Street New York, NY 10025.
                    </div>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-7 2xl:col-span-8">
                <div class="box p-5 rounded-md">
                    <div class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                        <div class="font-medium text-base truncate">Order Details</div>
                        <a href="" class="flex items-center ml-auto text-primary"> <PlusIcon class="w-4 h-4 mr-2" /> Add Notes </a>
                    </div>
                    <div class="overflow-auto lg:overflow-visible -mt-3">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th class="whitespace-nowrap !py-5">Product</th>
                                    <th class="whitespace-nowrap !py-5">Title</th>
                                    <th class="whitespace-nowrap text-right">Unit Price</th>
                                    <th class="whitespace-nowrap text-right">Qty</th>
                                    <th class="whitespace-nowrap text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in order.products" :key="index">
                                    <td class="!py-4">
                                        <div class="flex items-center">
                                            <div class="w-10 h-10 image-fit zoom-in">
                                                <Tippy
                                                    tag="img"
                                                    alt="Midone - HTML Admin Template"
                                                    class="rounded-lg border-2 border-white shadow-md tooltip"
                                                    :src="item.product.image"
                                                />
                                            </div>
                                            <a href="" class="font-medium whitespace-nowrap ml-4">{{
                                            item.title
                                            }}</a>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <Tippy
                                            tag="a"
                                            href="javascript:;"
                                            class="tooltip block flex justify-left font-medium w-60 whitespace-nowrap truncate ml-2"
                                            :content="item.product.title"
                                            >{{ item.product.title }}</Tippy
                                        >
                                    </td>
                                    <td class="text-right">{{ formatPrice(item.product.price)}}</td>
                                    <td class="text-right">{{item.quatity}}</td>
                                    <td class="text-right">{{ formatPrice(item.product.totalPrice)}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-between items-center">
                            <div class="text-right mr-5 mt-5 text-lg flex justify-end">
                                <div class="bg-gray-800/20 text-black rounded px-4 ml-1 py-2 cursor-pointer" @click="backToList">Back</div>
                                <div
                                    class="bg-danger/20 text-danger rounded px-4 ml-1 py-2 cursor-pointer"
                                    v-if="order.status == 'Processing'"
                                    @click="openModal('Cancelled', order._id)"
                                >
                                    Reject
                                </div>
                                <div
                                    class="bg-success/20 text-success rounded px-4 ml-1 py-2 cursor-pointer"
                                    v-if="order.status == 'Processing'"
                                    @click="openModal('Succeeded', order._id)"
                                >
                                    Approve
                                </div>
                            </div>
                            <div class="text-right mr-5 mt-5 font-bold text-lg">Total: {{ formatPrice(order.total)}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END: Transaction Details -->
    </div>
    <!-- BEGIN: Delete Confirmation Modal -->
    <Modal :show="confirmationModal" @hidden="confirmationModal = false" id="closeModal">
        <ModalBody class="p-0">
            <div class="p-5 text-center">
                <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
                <div class="text-3xl mt-5">Bạn chắc chắn?</div>
                <div class="text-slate-500 mt-2">Bạn muốn update đơn hàng này?</div>
            </div>
            <div class="px-5 pb-8 text-center">
                <button type="button" @click="closeModal" class="btn btn-outline-secondary w-24 mr-1">Cancel</button>
                <button
                    type="button"
                    class="text-bold"
                    :class="{
                                    'text-success bg-success/20 rounded px-4 ml-1 py-2': status == 'Succeeded',
                                    'text-danger bg-danger/20 rounded px-4 ml-1 py-2': status == 'Cancelled',
                                    'text-amber-500': status == 'Processing',
                                    }"
                    @click="updateStatus"
                >
                    {{ status == 'Succeeded' ? 'Approve' : 'Reject' }}
                </button>
            </div>
        </ModalBody>
    </Modal>
    <!-- END: Delete Confirmation Modal -->
    <div id="false-delete" class="toastify-content toastify-content-update hidden flex">
        <CheckCircleIcon class="text-danger" />
        <div class="ml-1 mr-2 message-toast">
            <div class="text-slate-500">Có lỗi trong quá trình update !</div>
        </div>
    </div>
    <div id="success-notification-delete" class="toastify-content toastify-content-update hidden flex">
        <CheckCircleIcon class="text-success" />
        <div class="ml-1 mr-2 message-toast">
            <div class="text-slate-500">Update thành công !</div>
        </div>
    </div>
</template>
<script>
import html2pdf from 'html2pdf.js';
import Toastify from 'toastify-js'
import OrderApi from '../../api-services/OrderApi'
import Invoice from '../orders/Invoice.vue'
export default {
    components: {
        Invoice
    },
    data() {
        return {
            order: [],
            getIdOrder: "",
            loadingIconAction: true,
            totalProduct: 0,
            confirmationModal: false,
            idUpdate: '',
            status: ''
        }
    },
    created () {
        this.getOrderById()
    },
    methods:{
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
            this.confirmationModal = false
            this.loadingIconAction = false
        },
        formatDateTime(date) {
            const originalDateTime = new Date(date);
            const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
            return originalDateTime.toLocaleDateString('en-US', options);

        },
        formatPrice(price) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        },
        openModal(status, id) {
            this.status = status
            this.idUpdate = id
            this.confirmationModal = true
        },
        closeModal() {
            this.confirmationModal = false
        },
        async updateStatus() {
            this.loadingIconAction = true
            let params = {
                status: this.status
            }
            const res = await OrderApi.updateStatus(this.idUpdate, params)
            if (res.mess !== 'Update successfully') {
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
                console.log("ehhe");
                Toastify({
                    node: dom('#success-notification-delete').clone().removeClass('hidden')[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true
                }).showToast()
                await this.getOrderById()
            }
            this.confirmationModal = false
        },
        async convertToPdf() {
            const content = this.$refs.pdfWrapper.innerHTML;
            console.log("hehe");
            const options = {
                margin: 10,
                filename: "Invoice.PDF",
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };

            await html2pdf().set(options).from(content).toPdf().output('blob').then((data) => {
                const pdfBlob = new Blob([data], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = "Invoice.PDF";
                link.click();
            })
        },
        backToList() {
            this.$router.push({path: '/order/list'})
        }
    }
}
</script>
<style scope>
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
