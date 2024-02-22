<template>
    <div ref="outSideClickNews">
        <h2 class="intro-y text-lg font-medium mt-4 mb-5" v-if="idUpdateUser == null">Tạo tài khoản</h2>
        <h2 class="intro-y text-lg font-medium mt-4 mb-5" v-if="idUpdateUser != null">Chỉnh sửa tài khoản</h2>
        <div>
            <!-- <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
                <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
            </div> -->
            <ModalBody>
                <Form @submit="createUser" :validation-schema="schema" v-slot="{ errors }" enctype="multipart/form-data">
                    <div class="intro-y mx-auto w-11/12 p-3 box">
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Email:</label>
                                <Field
                                    type="text"
                                    name="email"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.email }"
                                    placeholder="Nhập email"
                                    v-model="user.email"
                                />
                                <div class="invalid-feedback">{{ errors.email }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Số điện thoại:</label>
                                <Field
                                    type="text"
                                    name="phone"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.phone }"
                                    placeholder="Nhập số điện thoại"
                                    v-model="user.phone"
                                />
                                <div class="invalid-feedback">{{ errors.phone }}</div>
                            </div>
                        </div>
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Họ:</label>
                                <Field
                                    type="text"
                                    name="lastname"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.lastname }"
                                    placeholder="Nhập họ"
                                    v-model="user.lastname"
                                />
                                <div class="invalid-feedback">{{ errors.lastname }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Tên:</label>
                                <Field
                                    type="text"
                                    name="firstname"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.firstname }"
                                    placeholder="Nhập tên"
                                    v-model="user.firstname"
                                />
                                <div class="invalid-feedback">{{ errors.firstname }}</div>
                            </div>
                        </div>
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Mật khẩu:</label>
                                <Field
                                    type="text"
                                    name="password"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.password }"
                                    v-model="user.password"
                                />
                                <div class="invalid-feedback">{{ errors.password }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Nhập lại mật khẩu:</label>
                                <Field
                                    type="text"
                                    name="rePassword"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.rePassword }"
                                    v-model="user.rePassword"
                                />
                                <div class="invalid-feedback">{{ errors.rePassword }}</div>
                            </div>
                        </div>
                        <div class="flex flex-row justify-left gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Quyền:</label>
                                <Field as="select" name="role" class="form-select" v-model="user.role" :class="{ 'is-invalid': errors.role }">
                                    <option v-for="(item, index) in roles" :key="index" :value="item">
                                        {{ item }}
                                    </option>
                                </Field>
                                <div class="invalid-feedback">
                                    {{ errors.role }}
                                </div>
                            </div>
                        </div>
                        <div class="intro-x mt-4 mx-auto text-center">
                            <button class="btn btn-secondary w-24 mr-4 mb-2" type="button" @click="gotoListUsers">Hủy</button>
                            <button class="btn btn-primary w-24 mb-2" type="submit" v-if="idUpdateUser == null">Thêm</button>
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
                <div class="text-slate-500">Có lỗi trong quá trình tạo !</div>
            </div>
        </div>
    </div>
</template>
<script>
import Toastify from 'toastify-js'
import { Form, Field } from 'vee-validate'
import UserApi from '../../api-services/UserApi'
import * as Yup from 'yup'
export default {
    components: { Field, Form },
    data() {
        const schema = Yup.object().shape({
            email: Yup.string().required('Vui lòng nhập email.'),
            firstname: Yup.string().required('Vui lòng họ.'),
            lastname: Yup.string().required('Vui lòng tên.'),
            phone: Yup.string().required('Vui lòng số điện thoại.'),
            password: Yup.string().required('Vui lòng mật khẩu.'),
            rePassword: Yup.string().required('Vui lòng nhập lại mật khẩu.'),
            role: Yup.string().required('Vui lòng quyền.')
        })
        return {
            schema,
            loadingIconAction: true,
            user: {
                email : "",
                firstname : "",
                lastname: "",
                phone : "",
                password : "",
                rePassword : "",
                role: ""
            },
            roles: {
                0: 'admin',
                1: 'user'
            },
            idUpdateUser: ''
        }
    },
    created() {
        this.idUpdateUser = new URLSearchParams(window.location.search).get('id')
        if(this.idUpdateUser != null) {
            this.getUserById()
        }
    },
    methods: {
        async createUser() {
            if(this.idUpdateUser == null || this.idUpdateUser ==  '') {
                try {
                    await UserApi.register(this.user)
                    Toastify({
                        node: dom('#success-notification-content').clone().removeClass('hidden')[0],
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: 'top',
                        position: 'right',
                        stopOnFocus: true
                    }).showToast()
                    this.gotoListUsers()
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
                    console.log(this.user);
                    await UserApi.updateUser(this.idUpdateUser, this.user)
                    Toastify({
                        node: dom('#success-notification-content').clone().removeClass('hidden')[0],
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: 'top',
                        position: 'right',
                        stopOnFocus: true
                    }).showToast()
                    this.gotoListUsers()
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
        async getUserById() {
            this.schema = null
            const res = await UserApi.getUserById(this.idUpdateUser)
            this.user = res.user
            this.user.password = ""
        },
        gotoListUsers() {
            this.$router.push({ path: '/user/list' })
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
