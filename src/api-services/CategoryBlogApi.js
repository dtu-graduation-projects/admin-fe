import BaseApi from './BaseApi'

class CategoryBlogApi extends BaseApi {
    createCategoryBlog(params = {}) {
        return this.post('category-blogs/create-category', params)
    }
    getAllCategoryBlog() {
        return this.get('category-blogs')
    }
    deleteCategoryBlog(params = {}) {
        return this.delete('category-blogs/delete-category/' + params)
    }
    getCategoryBlogById(params = {}) {
        return this.get('category-blogs/' + params)
    }
    updateCategoryBlog(id, params = {}) {
        return this.put('category-blogs/update-category/' + id, params)
    }
}
export default new CategoryBlogApi()
