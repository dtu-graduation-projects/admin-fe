<template>
    <div class="intro-y flex items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">Thay đổi mật khẩu</h2>
    </div>
    <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: Profile Menu -->
        <div class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
            <div class="intro-y box mt-5">
                <div class="relative flex items-center p-5">
                    <div class="w-12 h-12 image-fit">
                        <img alt="" class="rounded-full" :src="urlAvatar" />
                    </div>
                    <div class="ml-4 mr-auto">
                        <div class="font-medium text-base">
                            {{ data.name }}
                        </div>
                        <div class="text-slate-500">{{ data.email }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END: Profile Menu -->
        <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
            <!-- BEGIN: Change Password -->
            <div class="intro-y box lg:mt-5">
                <div class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto">Đổi mật khẩu</h2>
                </div>
                <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
                    <div class="p-5">


                        <div class="mt-3">
                            <label for="change-password-form-2" class="form-label">Mật khẩu</label>
                            <Field name="password" type="password" required v-model="dataUpdate.password"
                                class="input password-showhide form-control" :class="{ 'is-invalid': errors.password }" />
                            <div class="invalid-feedback">{{ errors.password }}</div>

                        </div>
                        <div class="mt-3">
                            <label for="change-password-form-3" class="form-label">Xác nhận mật khẩu</label>
                            <Field name="passwordConfirmation" type="password" v-model="dataUpdate.password_confirmation"
                                required class="input password-showhide form-control"
                                :class="{ 'is-invalid': errors.passwordConfirmation }" />
                            <div class="invalid-feedback">{{ errors.passwordConfirmation }}</div>
                        </div>
                        <button type="submit" class="btn btn-primary mt-4">
                            Đổi mật khẩu
                        </button>
                    </div>
                </Form>
            </div>
            <!-- END: Change Password -->

            <div id="success-notification-content" class="toastify-content toastify-content-update hidden flex">
                <CheckCircleIcon class="text-success" />
                <div class="ml-1 mr-2 message-toast">
                    <div class="text-slate-500">Cập nhập thành công !</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AuthApi from '../../api-services/AuthApi'
import avatarLogoDefault from '@/assets/images/avatar.png'
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
export default {
    name: 'ChangePass',
    components: {
        Form,
        Field
    },
    data() {
        const schema = Yup.object().shape({
            password: Yup.string().required('Vui lòng nhập mật khẩu.'),
            passwordConfirmation: Yup.string().required('Vui lòng nhập xác nhận mật khẩu.')
                .test('passwords-match', 'Mật khẩu không trùng khớp.', function (value) {
                    return this.parent.password === value
                })
        })
        return {
            schema,
            loadingIconAction: true,
            data: [],
            dataUpdate: {
                password: "",
                password_confirmation: ""
            },
            urlAvatar: avatarLogoDefault,
            token: localStorage.getItem('token')
        };
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            this.loadingIconAction = true;
            const dataResult = await AuthApi.getAuthUser({}, this.token);
            this.data = dataResult.data;
            this.loadingIconAction = false;
        },
        async onSubmit() {
            const dataResult = await AuthApi.changePassword(this.dataUpdate, this.token);
            this.goToFolderList()
            Toastify({
                node: dom('#success-notification-content').clone().removeClass('hidden')[0],
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true
            }).showToast()
        },
        goToFolderList(){
            this.$router.push('/admin')
        }
    },
}

</script>