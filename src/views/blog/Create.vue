<template>
    <div ref="outSideClickNews">
        <h2 class="intro-y text-lg font-medium mt-4 mb-5" v-if="idUpdateBlog == null">Tạo mới</h2>
        <h2 class="intro-y text-lg font-medium mt-4 mb-5" v-if="idUpdateBlog != null">Chỉnh sửa</h2>
        <div>
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
                <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
            </div>
            <ModalBody v-if="!loadingIconAction">
                <Form class="formNews" @submit="createBlog" :validation-schema="schema" v-slot="{ errors }" enctype="multipart/form-data">
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
                                    v-model="blog.title"
                                />
                                <div class="invalid-feedback">{{ errors.title }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Danh mục:</label>
                                <Field
                                    as="select"
                                    name="category"
                                    class="form-select"
                                    v-model="blog.category"
                                    :class="{ 'is-invalid': errors.category }"
                                >
                                    <option v-for="(item, index) in listCategoryBlog" :key="index" :value="item._id">
                                        {{ item.title }}
                                    </option>
                                </Field>

                                <div class="invalid-feedback">
                                    {{ errors.category }}
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
                                    v-model="blog.description"
                                    :class="{ 'is-invalid': errors.description }"
                                />
                                <div class="invalid-feedback">{{ errors.description }}</div>
                            </div>
                        </div>
                        <div class="mx-auto xl:mr-0 xl:ml-6 mt-6" :class="{'w-52': listUrl.length <= 0}">
                            <label for="regular-form-1" class="form-label text-base">Hình ảnh:</label>
                            <div class="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                                <div class="flex flex-wrap">
                                    <div class="h-40 relative cursor-pointer zoom-in mx-auto" v-if="listUrl.length <= 0">
                                        <img class="rounded-md object-cover" alt="image-default" :src="avatarDefault" />
                                    </div>
                                    <div
                                        v-for="(img, key) in listUrl"
                                        :key="key"
                                        class="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in"
                                        v-else
                                    >
                                        <img class="rounded-md" alt="Midone Tailwind HTML Admin Template" :src="img" />
                                        <Tippy
                                            tag="div"
                                            content="Remove this profile photo?"
                                            @click="delImage(key)"
                                            class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                                        >
                                            <xIcon class="w-4 h-4" />
                                        </Tippy>
                                    </div>
                                </div>
                                <div class="mx-auto cursor-pointer relative mt-5 text-center">
                                    <button type="button" class="btn btn-primary" :class="listUrl.length > 0 ? 'w-1/5' : 'w-full'">Chọn ảnh</button>
                                    <input
                                        type="file"
                                        name="file"
                                        id="image-name"
                                        @change="onImageChange"
                                        ref="uploadImage"
                                        multiple
                                        :class="{ 'is-invalid': errors.file }"
                                        class="w-full h-full top-0 left-0 absolute opacity-0"
                                    />
                                    <div class="invalid-feedback" v-for="(item, index) in errorImages" v-bind:key="index">{{ item }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="intro-x mt-4 mx-auto text-center">
                            <button class="btn btn-secondary w-24 mr-4 mb-2" @click="gotoListBlog">Hủy</button>
                            <button class="btn btn-primary w-24 mb-2" type="submit" v-if="idUpdateBlog == null">Thêm</button>
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
import CategoryBlogApi from '../../api-services/CategoryBlogApi'
import BlogApi from '../../api-services/BlogApi'
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
            url: avatarDefault,
            errorImages: [],
            listCategoryBlog: [],
            idUpdateBlog: null,
            blog: {
                title: '',
                description: '',
                category: '',
                image:'',
            },
            listUrl: [],
            listImage: []
        }
    },
    created() {
        this.getListBlog()
        this.idUpdateBlog = new URLSearchParams(window.location.search).get('id')
        if(this.idUpdateBlog != null) {
            this.getBlogById()
        }
    },
    methods: {
        async createBlog() {
            let img = []
            let formData = new FormData()
            if(this.idUpdateBlog == null || this.idUpdateBlog ==  '') {
                this.validateImage()
                if (this.errorImages.length > 0) {
                    return
                }
                try {
                    this.listImage.forEach((fileInfo, index) => {
                        formData.append('images', fileInfo)
                    });
                    formData.append('title', this.blog.title)
                    formData.append('category', this.blog.category)
                    formData.append('description', this.blog.description)
                    this.loadingIconAction = true
                    await BlogApi.createBlog(formData)
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
                    this.gotoListBlog()
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
                            formData.append('images', this.url)
                        } else if (this.checkFile == 2) {
                            formData.append('images', this.url)
                        }
                    } else {
                        this.validateImage()
                        if (this.errorImages.length > 0) {
                            return
                        }
                        this.listImage.forEach((fileInfo, index) => {
                        formData.append('images', fileInfo)
                    });
                    }
                    formData.append('title', this.blog.title)
                    formData.append('category', this.blog.category)
                    formData.append('description', this.blog.description)
                    this.loadingIconAction = true
                    await BlogApi.updateFormData(this.idUpdateBlog,formData)
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
                    this.gotoListBlog()
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
        async getListBlog() {
            this.loadingIconAction = true
            const res = await CategoryBlogApi.getAllCategoryBlog()
            this.listCategoryBlog = res.category
            this.loadingIconAction = false
        },
        async getBlogById () {
            this.loadingIconAction = true
            const res = await BlogApi.getBlogById(this.idUpdateBlog)
            this.product = res.product
            this.checkFile = 2
            this.url = res.product.image
            this.loadingIconAction = false
        },
        validateImage() {
            let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
            this.errorImages = []
            let err = []
            let messType2 = ""
            let messType3 = ""
            this.listImage.map((file, index) => {
                if (!file) {
                    this.errorImages.push('Vui lòng chọn hình ảnh')
                    return
                }
                if (!allowedTypes.includes(file.type)) {
                    err.push({type: 2, index: index + 1})
                }

                if (file.size > 500000000000) {
                    err.push({type: 3, index: index + 1})
                }
            })
            if (err.length > 0) {
                err.map((value, index) => {
                    if (value.type === 2) {
                        if (index === 0) {
                            messType2 = messType2 + " " + value.index
                        } else {
                            messType2 = messType2 + ", " + value.index
                        }
                    }
                    if (value.type === 3) {
                        if (index === 0) {
                            messType3 = messType3 + " " + value.index
                        } else {
                            messType3 = messType3 + ", " + value.index
                        }
                    }
                })
                if (messType2.length > 0) {
                    this.errorImages.push('Hình ảnh thứ ' + messType2 + ' không hợp lệ. Chỉ cho phép jpeg, png và jpg.')
                    return
                }

                if (messType3.length > 0) {
                    this.errorImages.push('Kích thước tệp thứ ' + messType3 + ' quá lớn. Kích thước tối đa là 5MB.')
                    return
                }
            }
        },
        onImageChange(e) {
            let files = e.target.files || e.dataTransfer.files
            if (!files.length) return
            this.checkFile = 1
            Array.from(files).map((file, index) => {
                console.log(file);
                this.listImage.push(file)
                this.listUrl.push(URL.createObjectURL(file))
            })
            this.blog.image = this.listUrl
        },

        delImage(value) {
            this.listUrl.map((file, index) => {
                if (value === index) {
                    this.listUrl.splice(index, 1)
                }
            })
            this.checkFile = 0
            this.listImage.map((file, index) => {
                if (value === index) {
                    this.listImage.splice(index, 1)
                }
            })
        },
        gotoListBlog() {
            this.$router.push({ path: '/blog/list' })
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
