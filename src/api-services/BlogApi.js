import BaseApi from './BaseApi'

class BlogApi extends BaseApi {
    createBlog(params = {}) {
        return this.postDataForm('blogs/create-blog', params)
    }
    getAllBlog() {
        return this.get('blogs')
    }
    deleteBlog(params = {}) {
        return this.delete('blogs/delete-blog/' + params)
    }
    getBlogById(params = {}) {
        return this.get('blogs/get-view/' + params)
    }
    updateProductBlog(id, params = {}) {
        return this.updateFormData('blogs/update-blog/' + id, params)
    }
    commentBlog(params = {}) {
        return this.post('blogs/comment-blog', params)
    }
    deleteComment(params = {}) {
        return this.post('blogs/delete-comment-blog', params)
    }
}
export default new BlogApi()
