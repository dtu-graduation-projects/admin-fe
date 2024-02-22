<template>
    <div>
        <h2 class="intro-y text-lg font-medium mt-4 mb-5">Danh sách Blog</h2>
        <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
            <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
        </div>
        <div class="grid grid-cols-12 gap-6 mt-5" v-if="!loadingIconAction">
            <div class="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
                <button class="btn btn-primary shadow-md mr-2" @click="createBlog">Thêm</button>
            </div>
            <div v-for="(item, key) in dataPage" :key="key" class="intro-y col-span-12 md:col-span-6 box">
                <div
                    class="h-[320px] before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black/90 before:to-black/10 image-fit"
                >
                    <img alt="Midone Tailwind HTML Admin Template" class="rounded-t-md" :src="item.images[0]" />
                    <div class="absolute w-full flex items-center px-5 pt-6 z-10">
                        <div class="w-10 h-10 flex-none image-fit">
                            <img alt="Midone Tailwind HTML Admin Template" class="rounded-full" :src="item.author.avatar" />
                        </div>
                        <div class="ml-3 text-white mr-auto">
                            <a href="" class="font-medium">{{ item.author.firstname + " " + item.author.lastname }}</a>
                            <div class="text-xs mt-0.5">{{ formatDate(item.createdAt) }}</div>
                        </div>
                        <Dropdown class="ml-3">
                            <DropdownToggle
                                id="closeDropDown"
                                tag="a"
                                href="javascript:;"
                                class="bg-white/20 w-8 h-8 flex items-center justify-center rounded-full"
                            >
                                <MoreVerticalIcon class="w-4 h-4 text-white" />
                            </DropdownToggle>
                            <DropdownMenu class="w-40" :class="'closeMenu' + [item._id]">
                                <DropdownContent>
                                    <DropdownItem> <Edit2Icon class="w-4 h-4 mr-2" /> Edit Post </DropdownItem>
                                    <DropdownItem @click="onToggle(item._id, $event)"> <TrashIcon class="w-4 h-4 mr-2" /> Delete Post </DropdownItem>
                                </DropdownContent>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="absolute bottom-0 text-white px-5 pb-6 z-10">
                        <span class="bg-white/20 px-2 py-1 rounded">{{
                            item.category.title
                        }}</span>
                        <!-- <a href="" class="block font-medium text-xl mt-3">{{
                            item.title
                        }}</a> -->
                    </div>
                </div>
                <div class="p-5 text-slate-600 dark:text-slate-500 font-bold text-lg">{{item.title}}</div>
                <div class="flex items-center px-5 py-3 border-t border-slate-200/60 dark:border-darkmode-400">
                    <Tippy
                        tag="a"
                        href=""
                        class="intro-x w-8 h-8 flex items-center justify-center rounded-full border border-slate-300 dark:border-darkmode-400 dark:bg-darkmode-300 dark:text-slate-300 text-slate-500 mr-2"
                        content="Bookmark"
                    >
                        <BookmarkIcon class="w-3 h-3" />
                    </Tippy>
                    <!-- <div class="intro-x flex mr-2">
                        <div class="intro-x w-8 h-8 image-fit">
                            <Tippy
                                tag="img"
                                alt="Midone Tailwind HTML Admin Template"
                                class="rounded-full border border-white zoom-in"
                                :src="faker.photos[0]"
                                :content="faker.users[0].name"
                            />
                        </div>
                        <div class="intro-x w-8 h-8 image-fit -ml-4">
                            <Tippy
                                tag="img"
                                alt="Midone Tailwind HTML Admin Template"
                                class="rounded-full border border-white zoom-in"
                                :src="faker.photos[1]"
                                :content="faker.users[1].name"
                            />
                        </div>
                        <div class="intro-x w-8 h-8 image-fit -ml-4">
                            <Tippy
                                tag="img"
                                alt="Midone Tailwind HTML Admin Template"
                                class="rounded-full border border-white zoom-in"
                                :src="faker.photos[2]"
                                :content="faker.users[2].name"
                            />
                        </div>
                    </div> -->
                    <button class="btn btn-secondary ml-auto" @click="viewDetail(item._id)">View Details</button>
                    <Tippy
                        tag="a"
                        href=""
                        class="intro-x w-8 h-8 flex items-center justify-center rounded-full text-primary bg-primary/10 dark:bg-darkmode-300 dark:text-slate-300 ml-auto"
                        content="Share"
                    >
                        <Share2Icon class="w-3 h-3" />
                    </Tippy>
                    <Tippy
                        tag="a"
                        href=""
                        class="intro-x w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white ml-2"
                        content="Download PDF"
                    >
                        <ShareIcon class="w-3 h-3" />
                    </Tippy>
                </div>
                <div class="px-5 pt-3 pb-5 border-t border-slate-200/60 dark:border-darkmode-400">
                    <div class="w-full flex text-slate-500 text-xs sm:text-sm justify-between">
                        <div class="flex">
                            <div class="mr-2">
                                Comments: <span class="font-medium">{{ item.comments.length }}</span>
                            </div>
                            <div class="mr-2">
                                Views: <span class="font-medium">{{ item.numberViews }}</span>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="ml-2">
                                Likes: <span class="font-medium">{{ item.likes.length }}</span>
                            </div>
                            <div class="ml-2">
                                Dislikes: <span class="font-medium">{{ item.disLikes.length }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex items-center mt-3">
                        <div class="w-8 h-8 flex-none image-fit mr-3">
                            <img alt="Midone Tailwind HTML Admin Template" class="rounded-full" :src="item.images[0]" />
                        </div>
                        <div class="flex-1 relative text-slate-600 dark:text-slate-200">
                            <input
                                type="text"
                                v-model="item.comment"
                                class="form-control form-control-rounded border-transparent bg-slate-100 pr-10"
                                placeholder="Post a comment..."
                            />
                            <div class="w-4 h-4 absolute my-auto mr-3" style="top: -50px; right:50px">
                                <Icon @message-icon="addIconToComment(item, $event)" @post-comment="postComment(item._id, item, $event)"></Icon>
                            </div>
                        </div>
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
    </div>
    <!-- BEGIN: Pagination -->
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap justify-between mt-3" v-if="totalPages > 1">
        <pagination :totalPages="totalPages" :perPage="perPage" :currentPage="currentPage" @pagechanged="onPageChange" />
        <div class="hidden md:block mx-auto lg:col-span-4 text-slate-500">
            Hiển thị {{ currentPage }} trong {{ perPage }} trang của {{ totalReviewGroup }} phần tử
        </div>
        <select v-model="perPage" class="lg:col-span-4 w-20 form-select box mt-3 sm:mt-0">
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
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
                                :style="{top: heightModal + 'px'}"
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
                                        @click="deleteBlog"
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
import BlogApi from '../../api-services/BlogApi'
import { format, formatDistanceToNow } from 'date-fns';
import Pagination from '../../components/pagination/pagination.vue'
import Icon from "../../components/icon/Main.vue"

export default {
    components: {
        Icon, Pagination
    },
    data() {
        return {
            listBlog: [],
            loadingIconAction: true,
            isOpen: false,
            idDel: null,
            heightModal: 0,
            perPage: 4,
            currentPage: 1,
            totalPages: 0,
            result: {},
            dataPage: {},
            isPostComment: false
        }
    },
    created() {
        this.getlistBlog()
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

        async getlistBlog() {
            this.loadingIconAction = true
            const res = await BlogApi.getAllBlog()
            this.result = res.blogs
            console.log(res);
            this.totalPages = Math.ceil(this.result.length / this.perPage)
            this.dataPage = this.paginate(this.result, this.perPage, 1)
            this.listBlog = res.blogs;
            this.loadingIconAction = false
        },
        addEmoji(item, emoji) {
            if (item.comment === undefined) {
                item.comment = emoji.i;
            } else {
                item.comment += emoji.i;
            }
        },
        onToggle(id, event) {
            const yRelativeToDocument = event.clientY;
            const yRelativeToWindow = event.pageY;
            this.heightModal = yRelativeToWindow - yRelativeToDocument
            const className = 'closeMenu' + id
            const list = document.getElementsByClassName(className)
            const closeMenuArray = Array.from(list);
            closeMenuArray.map((item, index) => {
                item.classList.remove("show")
            });

            this.idDel = id
            this.isOpen = !this.isOpen
        },
        closeModal() {
            this.isOpen = !this.isOpen
        },
        formatDate(date) {
            const yourDate = new Date(date);
            const currentDate = new Date();

            const diffInDays = Math.floor((currentDate - yourDate) / (1000 * 60 * 60 * 24));

            let formattedDate;
            if (diffInDays < 1) {
                formattedDate = formatDistanceToNow(yourDate, { addSuffix: true });
            } else {
                formattedDate = format(yourDate, 'dd/MM/yyyy') + ' ' + formatDistanceToNow(yourDate, { addSuffix: true });
            }
            return formattedDate
        },
        viewDetail(id) {
            this.$router.push({ path: '/blog/detail', query: { id: id } })
        },
        async deleteBlog() {
            this.loadingIconAction = true
            this.isOpen = !this.isOpen
            const res = await BlogApi.deleteBlog(this.idDel)
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
                this.getlistBlog()
            }
        },
        addIconToComment(item, icon) {
            item.comment += icon;
        },
        postComment(_id, blog, event) {
            let params = {
                bid: _id,
                comment: blog.comment
            }
            BlogApi.commentBlog(params)
            this.listBlog.map(item => {
                if (item._id === _id) {
                    item.comments.push(params)
                }
            })
            blog.comment = ""
        },
        createBlog() {
            this.$router.push({ path: '/blog/create' })
        },

        updateProduct(id) {
            this.$router.push({ path: '/blog/create', query: { id: id } })
        }
    }
}
</script>
<style>
.v3-emojis button img {
    width: 38% !important;
}
.v3-body-inner {
    width: 273px !important;
    height: 226px !important;
    overflow-x: scroll !important;
}
.v3-footer {
    display: none !important;
}
.custom-icon {
    display: none;
}
</style>
<style scoped>
.custom-emoji-picker {
  font-size: 16px;
}
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
