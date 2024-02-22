<template>
    <div ref="outSideClickNews">
        <h2 class="intro-y text-lg font-medium mt-4 mb-5" v-if="idUpdate == null">Tạo mới</h2>
        <h2 class="intro-y text-lg font-medium mt-4 mb-5" v-if="idUpdate != null">Chỉnh sửa</h2>
        <div>
            <!-- <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
                <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
            </div> -->
            <ModalBody>
                <Form @submit="createUser" :validation-schema="schema" v-slot="{ errors }" enctype="multipart/form-data">
                    <div class="intro-y mx-auto w-11/12 p-3 box">
                        <div class="flex flex-row justify-start gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Loại giảm giá:</label>
                                <Field
                                    type="text"
                                    name="name"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.name }"
                                    v-model="coupons.name"
                                />
                                <div class="invalid-feedback">{{ errors.name }}</div>
                            </div>
                        </div>
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Mức giảm giá (%):</label>
                                <Field
                                    type="number"
                                    name="disCount"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.disCount }"
                                    v-model="coupons.disCount"
                                />
                                <div class="invalid-feedback">{{ errors.disCount }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Hạn giảm giá (Ngày):</label>
                                <Field
                                    type="number"
                                    name="expiresIn"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.expiresIn }"
                                    v-model="coupons.expiresIn"
                                />
                                <div class="invalid-feedback">{{ errors.expiresIn }}</div>
                            </div>
                        </div>
                        <div class="intro-x mt-4 mx-auto text-center">
                            <button class="btn btn-secondary w-24 mr-4 mb-2" type="button" @click="gotoListCoupons">Hủy</button>
                            <button class="btn btn-primary w-24 mb-2" type="submit" v-if="idUpdate == null">Thêm</button>
                            <button class="btn btn-primary w-24 mb-2" type="submit" v-else>Cập nhật</button>
                        </div>
                    </div>
                </Form>
            </ModalBody>
        </div>
        <div id="success-notification-content" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-success" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">
                    {{ $route?.query?.id == undefined ? 'Thêm thành công !' : 'Cập nhập thành công !' }}
                </div>
            </div>
        </div>
        <div id="false-notification-content" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-danger" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">Có lỗi trong quá trình tạo!</div>
            </div>
        </div>
    </div>
</template>
<script>
import Toastify from 'toastify-js'
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
import CouponsApi from '../../api-services/CouponsApi'
export default {
    components: { Field, Form },
    data() {
        const schema = Yup.object().shape({
            name: Yup.string().required('Vui lòng loại giảm giá.'),
            disCount: Yup.string().required('Vui lòng nhập mức giảm giá.'),
            expiresIn: Yup.string().required('Vui lòng nhập ngày hết hạn.'),
        })
        return {
            schema,
            loadingIconAction: true,
            coupons: {
                name : "",
                disCount: "",
                expiresIn: ""

            },
            idUpdate: ''
        }
    },
    created() {
        this.idUpdate = new URLSearchParams(window.location.search).get('id')
        if(this.idUpdate != null) {
            this.getCouponsById()
        }
    },
    methods: {
        async createUser() {
            if(this.idUpdate == null || this.idUpdate ==  '') {
                try {
                    const res = await CouponsApi.createCoupons(this.coupons)
                    Toastify({
                        node: dom('#success-notification-content').clone().removeClass('hidden')[0],
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: 'top',
                        position: 'right',
                        stopOnFocus: true
                    }).showToast()
                    this.gotoListCoupons()
                } catch (error) {
                    Toastify({
                        node: dom('#false-notification-content').clone().removeClass('hidden')[0],
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: 'top',
                        position: 'right',
                        stopOnFocus: true
                    }).showToast()
                }
            } else {
                try {
                    await CouponsApi.updateCoupons(this.idUpdate, this.coupons)
                    Toastify({
                        node: dom('#success-notification-content').clone().removeClass('hidden')[0],
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: 'top',
                        position: 'right',
                        stopOnFocus: true
                    }).showToast()
                    this.gotoListCoupons()
                } catch (error) {
                    Toastify({
                        node: dom('#false-notification-content').clone().removeClass('hidden')[0],
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: 'top',
                        position: 'right',
                        stopOnFocus: true
                    }).showToast()
                }
            }

        },
        async getCouponsById() {
            this.schema = null
            const res = await CouponsApi.getCouponsById(this.idUpdate)
            this.coupons = res.coupons
        },
        gotoListCoupons() {
            this.$router.push({ path: '/coupons/list' })
        }
    }
}
</script>
<style scoped>
.toastify .toastify-content-update {
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 2.5rem;
    padding-left: 0px;
}

#success-notification-content .text-success {
    margin-right: -10px;
    width: 65px;
}

.message-toast {
    display: flex;
    align-items: center;
}

.form_checkbox {
    border: 1px solid #ddd;
    border-radius: 10px;
    margin: 20px 20px;
}

.invalid-feedback {
    color: red;
    margin-top: 8px;
}

@media screen and (max-width: 576px) {
    .modal-body .form-create {
        flex-direction: column;
    }

    .form-create .create-layout {
        width: 100%;
    }
}
</style>
<style>
.ck-tooltip__text {
    color: #fff !important;
}
</style>
