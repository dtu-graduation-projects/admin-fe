<template>
    <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
        <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
    </div>
    <div class="intro-y news xl:w-3/5 p-5 box mt-8 !w-full flex" v-else>
        <div class="w-3/5">
            <!-- BEGIN: Blog Layout -->
            <h2 class="intro-y font-medium text-xl sm:text-2xl">
                {{blog.title }}
            </h2>
            <div class="intro-y text-slate-600 dark:text-slate-500 mt-3 text-xs sm:text-sm">
                {{ blog.createdAt.substring(0,10)}} <span class="mx-1">•</span>
                <a class="text-primary" href="">{{ blog.category.title }}</a>
                <span class="mx-1">•</span> 7 Min read
            </div>
            <div class="intro-y mt-6">
                <div class="news__preview image-fit">
                    <img alt="Midone Tailwind HTML Admin Template" class="rounded-md" :src="blog.images" />
                </div>
            </div>
            <div class="intro-y flex relative pt-16 sm:pt-6 items-center pb-6">
                <Tippy
                    tag="a"
                    href=""
                    class="intro-x w-8 h-8 sm:w-10 sm:h-10 flex flex-none items-center justify-center rounded-full border border-slate-300 dark:border-darkmode-400 dark:bg-darkmode-300 dark:text-slate-300 text-slate-500 mr-2"
                    content="Bookmark"
                >
                    <BookmarkIcon class="w-3 h-3" />
                </Tippy>
                <div class="intro-x flex mr-3">
                    <div class="intro-x w-8 h-8 sm:w-10 sm:h-10 image-fit" v-if="blog.comments.length > 0">
                        <Tippy
                            tag="img"
                            alt="Midone Tailwind HTML Admin Template"
                            class="rounded-full border border-white zoom-in"
                            :src="blog.comments[0].userId.avatar"
                            :content="blog.comments[0].userId.firstname + ' ' + blog.comments[0].userId.lastname"
                        />
                    </div>
                    <div class="intro-x w-8 h-8 sm:w-10 sm:h-10 image-fit -ml-4" v-if="blog.comments.length > 1">
                        <Tippy
                            tag="img"
                            alt="Midone Tailwind HTML Admin Template"
                            class="rounded-full border border-white zoom-in"
                            :src="blog.comments[1].userId.avatar"
                            :content="blog.comments[1].userId.firstname + ' ' + blog.comments[1].userId.lastname"
                        />
                    </div>
                    <div class="intro-x w-8 h-8 sm:w-10 sm:h-10 image-fit -ml-4" v-if="blog.comments.length > 2">
                        <Tippy
                            tag="img"
                            alt="Midone Tailwind HTML Admin Template"
                            class="rounded-full border border-white zoom-in"
                            :src="blog.comments[2].userId.avatar"
                            :content="blog.comments[2].userId.firstname + ' ' + blog.comments[2].userId.lastname"
                        />
                    </div>
                </div>
                <div class="absolute sm:relative -mt-12 sm:mt-0 w-full flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm">
                    <div class="intro-x mr-1 sm:mr-3">
                        Comments:
                        <span class="font-medium">{{ blog.totalComments }}</span>
                    </div>
                    <div class="intro-x mr-1 sm:mr-3">
                        Views: <span class="font-medium">{{ blog.numberViews }}</span>
                    </div>
                    <div class="intro-x sm:mr-3 ml-auto">
                        Likes: <span class="font-medium">{{ blog.totalLikes }}</span>
                    </div>
                </div>
                <Tippy
                    tag="a"
                    href=""
                    class="intro-x w-8 h-8 sm:w-10 sm:h-10 flex flex-none items-center justify-center rounded-full text-primary bg-primary/10 dark:bg-darkmode-300 dark:text-slate-300 ml-auto sm:ml-0"
                    content="Share"
                >
                    <Share2Icon class="w-3 h-3" />
                </Tippy>
                <Tippy
                    tag="a"
                    href=""
                    class="intro-x w-8 h-8 sm:w-10 sm:h-10 flex flex-none items-center justify-center rounded-full bg-primary text-white ml-2"
                    content="Download PDF"
                >
                    <ShareIcon class="w-3 h-3" />
                </Tippy>
            </div>
            <div class="intro-y text-justify leading-relaxed" v-html="blog.description"></div>
            <div
                class="intro-y flex text-xs sm:text-sm flex-col sm:flex-row items-center mt-5 pt-5 border-t border-slate-200/60 dark:border-darkmode-400"
            >
                <div class="flex items-center">
                    <div class="w-12 h-12 flex-none image-fit">
                        <img alt="Midone Tailwind HTML Admin Template" class="rounded-full" :src="blog.author.avatar" />
                    </div>
                    <div class="ml-3 mr-auto">
                        <a href="" class="font-medium">{{ blog.author.firstname + " " + blog.author.lastname }}</a
                        >, Author
                        <div class="text-slate-500">{{blog.author.email}}r</div>
                    </div>
                </div>
                <div class="flex items-center text-slate-600 dark:text-slate-500 sm:ml-auto mt-5 sm:mt-0">
                    Share this post:
                    <Tippy
                        tag="a"
                        href=""
                        class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border dark:border-darkmode-400 ml-2 text-slate-400 zoom-in"
                        content="Facebook"
                    >
                        <FacebookIcon class="w-3 h-3 fill-current" />
                    </Tippy>
                    <Tippy
                        tag="a"
                        href=""
                        class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border dark:border-darkmode-400 ml-2 text-slate-400 zoom-in"
                        content="Twitter"
                    >
                        <TwitterIcon class="w-3 h-3 fill-current" />
                    </Tippy>
                    <Tippy
                        tag="a"
                        href=""
                        class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border dark:border-darkmode-400 ml-2 text-slate-400 zoom-in"
                        content="Linked In"
                    >
                        <LinkedinIcon class="w-3 h-3 fill-current" />
                    </Tippy>
                </div>
            </div>
            <!-- END: Blog Layout -->
        </div>
        <div class="w-2/5 ml-4">
            <!-- BEGIN: Comments -->
            <div class="intro-y mt-5 pt-5 border-t border-slate-200/60 dark:border-darkmode-400">
                <div class="text-base sm:text-lg font-medium">{{blog.totalComments}} Responses</div>
                <div class="news__input relative mt-5">
                    <MessageCircleIcon class="w-5 h-5 absolute my-auto inset-y-0 ml-6 left-0 text-slate-500" />
                    <textarea
                        class="form-control border-transparent bg-slate-100 pl-16 py-6 resize-none"
                        rows="1"
                        placeholder="Post a comment..."
                    ></textarea>
                </div>
            </div>
            <div class="intro-y mt-5 pb-10">
                <div class="pt-5" v-for="(item, index) in blog.comments" :key="index">
                    <div class="flex" v-if="item.userId != null">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit">
                            <img alt="Midone Tailwind HTML Admin Template" class="rounded-full" :src="item.userId.avatar" />
                        </div>
                        <div class="ml-3 flex-1">
                            <div class="flex items-center justify-between">
                                <a href="" class="font-medium">{{item.userId.firstname + ' ' + item.userId.lastname }}</a>
                                <Dropdown class="ml-3">
                                    <DropdownToggle
                                        id="closeDropDown"
                                        tag="a"
                                        href="javascript:;"
                                        class="bg-neutral-600/20 w-8 h-8 flex items-center justify-center rounded-full"
                                    >
                                        <MoreVerticalIcon class="w-4 h-4 text-white" />
                                    </DropdownToggle>
                                    <DropdownMenu class="w-44" :class="'closeMenu' + [item._id]">
                                        <DropdownContent>
                                            <DropdownItem @click="onToggle(item._id, blog._id, $event)">
                                                <TrashIcon class="w-4 h-4 mr-2" /> Delete Comment
                                            </DropdownItem>
                                        </DropdownContent>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div class="text-slate-500 text-xs sm:text-xs flex ">
                                <div>{{ formatDate(item.date) }}</div>
                                <a href="" class="ml-auto text-xs text-slate-500">Reply</a>
                            </div>
                            <div class="mt-2">{{ item.content }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END: Comments -->
        </div>
    </div>
    <Modal :show="confirmationModal" @hidden="confirmationModal = false" id="closeModal">
        <ModalBody class="p-0">
            <div class="p-5 text-center">
                <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
                <div class="text-3xl mt-5">Bạn chắc chắn?</div>
                <div class="text-slate-500 mt-2">Bạn muốn xóa comment này?</div>
            </div>
            <div class="px-5 pb-8 text-center">
                <button
                    class="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed border-secondary text-slate-500 dark:border-darkmode-100/40 dark:text-slate-300 [&amp;:hover:not(:disabled)]:bg-secondary/20 [&amp;:hover:not(:disabled)]:dark:bg-darkmode-100/10 w-24 mr-1"
                    type="button"
                    fdprocessedid="171j3s"
                    @click="confirmationModal = false"
                >
                    Hủy</button
                ><button
                    class="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-danger border-danger text-white dark:border-danger w-24"
                    type="button"
                    fdprocessedid="ujsyd"
                    @click="deleteComment"
                >
                    Xóa
                </button>
            </div>
        </ModalBody>
    </Modal>
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
</template>
<script>
import Toastify from 'toastify-js'
import BlogApi from '../../api-services/BlogApi'
export default {
    data() {
        return{
            loadingIconAction: false,
            blog: [],
            idUpdate: '',
            confirmationModal: false,
            idComment: '',
            idBlog: ""
        }
    },
    created() {
        this.getDetailBlog()
    },
    methods: {
        async getDetailBlog() {
            this.loadingIconAction = true
            this.idUpdate = new URLSearchParams(window.location.search).get('id')
            const res = await BlogApi.getBlogById(this.idUpdate)
            this.blog = res.blog
            let totalLikes = 0
            let totalComments = 0
            this.blog.comments.map((item2, index2) => {
                totalComments ++
            })
            this.blog.likes.map((item2, index2) => {
                totalLikes ++
            })
            this.blog.totalComments = totalComments
            this.blog.totalLikes = totalLikes
            this.loadingIconAction = false
        },
        formatDate(dateString) {
            const parts = dateString.split('/');
            const selectedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

            const now = new Date();

            const timeDifference = now.getTime() - selectedDate.getTime();
            const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

            if (daysDifference < 30) {
                return `about ${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
            } else {
                const monthsDifference = Math.floor(daysDifference / 30);
                return `about ${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
            }
        },
        onToggle(idComment, idBlog, event) {
            this.idComment = idComment
            this.idBlog = idBlog
            this.confirmationModal = !this.confirmationModal
        },
        async deleteComment () {
            this.loadingIconAction = true
            let params = {
                commentId : this.idComment,
                blogId: this.idBlog
            }
            console.log(params);
            const res = await BlogApi.deleteComment(params)
            console.log(res);
            if (res.mess !== 'Delete Comment Successfully!!') {
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
                await this.getDetailBlog()
            }
            this.confirmationModal = !this.confirmationModal
        }
    }
}
</script>
<style>
.leading-relaxed .image img{
    border-radius: 0.357rem;
    object-fit: cover;
    width: 100%;
}
</style>
>
