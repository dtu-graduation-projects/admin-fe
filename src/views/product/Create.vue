<template>
    <div ref="outSideClickNews">
        <h2 class="intro-y text-lg font-medium mt-4 mb-5" v-if="idUpdateProduct == null">Tạo mới</h2>
        <h2 class="intro-y text-lg font-medium mt-4 mb-5" v-if="idUpdateProduct != null">Chỉnh sửa</h2>
        <div>
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
                <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
            </div>
            <ModalBody v-if="!loadingIconAction">
                <Form class="formNews" @submit="createProduct" :validation-schema="schema" v-slot="{ errors }" enctype="multipart/form-data">
                    <div class="intro-y mx-auto w-11/12 p-3 box">
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Tiêu đề:</label>
                                <Field
                                    type="text"
                                    name="title"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.title }"
                                    placeholder="Nhập tiêu đề"
                                    v-model="product.title"
                                />
                                <div class="invalid-feedback">{{ errors.title }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Thương hiệu:</label>
                                <Field as="select" name="brand" class="form-select" v-model="product.brand" :class="{ 'is-invalid': errors.brand }">
                                    <option v-for="(item, index) in listBrands" :key="index" :value="item.title">
                                        {{ item.title }}
                                    </option>
                                </Field>

                                <div class="invalid-feedback">
                                    {{ errors.brand }}
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-row justify-left gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Danh mục:</label>
                                <Field
                                    as="select"
                                    name="category"
                                    class="form-select"
                                    v-model="product.category"
                                    :class="{ 'is-invalid': errors.category}"
                                >
                                    <option v-for="(item, index) in listCategoryProduct" :key="index" :value="item._id">
                                        {{ item.title }}
                                    </option>
                                </Field>

                                <div class="invalid-feedback">
                                    {{ errors.category}}
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 mt-5 form-create">
                            <div class="w-full create-layout">
                                <label for="regular-form-1" class="form-label text-base">Mô tả</label>
                                <Field
                                    as="textarea"
                                    type="text"
                                    name="description"
                                    class="form-control pr-10"
                                    placeholder="Vui lòng nhập nội dung"
                                    rows="6"
                                    v-model="product.description"
                                    :class="{ 'is-invalid': errors.description }"
                                />
                                <div class="invalid-feedback">{{ errors.description }}</div>
                            </div>
                        </div>
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Giá:</label>
                                <Field
                                    type="number"
                                    name="price"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.price }"
                                    placeholder="Nhập giá"
                                    v-model="product.price"
                                />
                                <div class="invalid-feedback">{{ errors.price }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Số lượng:</label>
                                <Field
                                    type="number"
                                    name="quantity"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.quantity }"
                                    placeholder="Nhập số lượng"
                                    v-model="product.quantity"
                                />
                                <div class="invalid-feedback">{{ errors.quantity }}</div>
                            </div>
                        </div>
                        <div class="w-52 mx-auto xl:mr-0 xl:ml-6 mt-6">
                            <label for="regular-form-1" class="form-label text-base">Hình ảnh:</label>
                            <div class="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                                <div class="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                                    <img class="rounded-md object-cover" alt="image-default" v-if="url" :src="url" />
                                    <Tippy
                                        tag="div"
                                        content="Remove this profile photo?"
                                        @click="delImage"
                                        v-if="url != avatarDefault"
                                        class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                                    >
                                        <xIcon class="w-4 h-4" />
                                    </Tippy>
                                </div>
                                <div class="mx-auto cursor-pointer relative mt-5">
                                    <button type="button" class="btn btn-primary w-full">Chọn ảnh</button>
                                    <input
                                        type="file"
                                        name="file"
                                        id="image-name"
                                        @change="onImageChange"
                                        ref="uploadImage"
                                        :class="{ 'is-invalid': errors.file }"
                                        class="w-full h-full top-0 left-0 absolute opacity-0"
                                    />
                                    <div class="invalid-feedback" v-for="(item, index) in errorImages" v-bind:key="index">{{ item }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="intro-x mt-4 mx-auto text-center">
                            <button class="btn btn-secondary w-24 mr-4 mb-2" @click="gotoListProduct">Hủy</button>
                            <button class="btn btn-primary w-24 mb-2" type="submit" v-if="idUpdateProduct == null">Thêm</button>
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
import ProductApi from '../../api-services/ProductApi'
import BrandApi from '../../api-services/BrandApi'
import CategoryProductApi from '../../api-services/CategoryProductApi'
import * as Yup from 'yup'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'
import avatarDefault from '@/assets/images/avatar-default.png'
export default {
    components: { Field, Form, ckeditor: CKEditor.component },
    data() {
        const schema = Yup.object().shape({
            title: Yup.string().required('Vui lòng tiêu đề.'),
            description: Yup.string().required('Vui lòng nhập mô tả.'),
            brand: Yup.string().required('Vui lòng chọn thương hiệu.'),
            price: Yup.string().required('Vui lòng nhập giá.'),
            quantity: Yup.string().required('Vui lòng nhập số lượng.'),
            category: Yup.string().required('Vui lòng chọn danh mục.')
        })
        return {
            editor: ClassicEditor,
            schema,
            loadingIconAction: true,
            category: {},
            checkFile: 0,
            filename: null,
            nameImage: '',
            idUpdate: null,
            url: avatarDefault,
            errorImages: [],
            listBrands: [],
            idUpdateProduct: null,
            product: {
                title: '',
                description: '',
                brand: '',
                price: '',
                quantity: '',
                category: '',
                image:''
            },
            listCategoryProduct: []
        }
    },
    created() {
        this.getListBrand()
        this.getListBlogCategory()
        this.idUpdateProduct = new URLSearchParams(window.location.search).get('id')
        if(this.idUpdateProduct != null) {
            this.getProductById()
        }
    },
    methods: {
        async createProduct() {
            let formData = new FormData()
            if (this.errorImages.length > 0) {
                return
            }
            if(this.idUpdateProduct == null || this.idUpdateProduct ==  '') {
                this.validateImage()
                try {
                    formData.append('image', this.$refs.uploadImage.files[0])
                    formData.append('title', this.product.title)
                    formData.append('brand', this.product.brand)
                    formData.append('description', this.product.description)
                    formData.append('quantity', this.product.quantity)
                    formData.append('price', this.product.price)
                    formData.append('category', this.product.category)
                    this.loadingIconAction = true
                    await ProductApi.create(formData)
                    Toastify({
                        node: dom('#success-notification-content').clone().removeClass('hidden')[0],
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: 'top',
                        position: 'right',
                        stopOnFocus: true
                    }).showToast()
                    this.loadingIconAction = false
                    this.gotoListProduct()
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
                    if (this.$refs.uploadImage.files[0] == undefined) {
                        if (this.checkFile == 0) {
                            this.validateImage()
                            if (this.errorImages.length > 0) {
                                return
                            }
                            formData.append('image', this.url)
                        } else if (this.checkFile == 2) {
                            formData.append('image', this.url)
                        }
                    } else {
                        this.validateImage()
                        if (this.errorImages.length > 0) {
                            return
                        }
                        formData.append('image', this.$refs.uploadImage.files[0])
                    }
                    formData.append('title', this.product.title)
                    formData.append('brand', this.product.brand)
                    formData.append('description', this.product.description)
                    formData.append('quantity', this.product.quantity)
                    formData.append('price', this.product.price)
                    this.loadingIconAction = true
                    await ProductApi.updateProduct(this.idUpdateProduct,formData)
                    Toastify({
                        node: dom('#success-notification-content').clone().removeClass('hidden')[0],
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: 'top',
                        position: 'right',
                        stopOnFocus: true
                    }).showToast()
                    this.loadingIconAction = false
                    this.gotoListProduct()
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
        async getListBrand() {
            this.loadingIconAction = true
            const res = await BrandApi.list()
            this.listBrands = res.brand
            this.loadingIconAction = false
        },
        async getProductById () {
            this.loadingIconAction = true
            const res = await ProductApi.getProductById(this.idUpdateProduct)
            this.product = res.product
            this.checkFile = 2
            this.url = res.product.image
            this.loadingIconAction = false
        },
        async getListBlogCategory() {
            const res = await CategoryProductApi.getAllCategoryProduct()
            this.listCategoryProduct = res.category

        },
        validateImage() {
            let file = this.$refs.uploadImage.files[0]
            let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
            this.errorImages = []

            if (!file) {
                this.errorImages.push('Vui lòng chọn hình ảnh')
                return
            }

            if (!allowedTypes.includes(file.type)) {
                this.errorImages.push('Loại tệp không hợp lệ. Chỉ cho phép jpeg, png và jpg.')
                return
            }

            if (file.size > 500000000000) {
                this.errorImages.push('Kích thước tệp quá lớn. Kích thước tối đa là 5MB.')
                return
            }
        },

        onImageChange(e) {
            let files = e.target.files || e.dataTransfer.files
            if (!files.length) return
            this.checkFile = 1
            this.url = URL.createObjectURL(files[0])
            this.product.image = this.url
        },

        delImage() {
            this.checkFile = 0
            this.url = avatarDefault
            this.$refs.uploadImage.value = ''
            this.filename = null
        },
        gotoListProduct() {
            this.$router.push({ path: '/product/list' })
        }
    }
}
</script>
<script setup>
import { ref } from 'vue'
const userMultiple = ref([])
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
