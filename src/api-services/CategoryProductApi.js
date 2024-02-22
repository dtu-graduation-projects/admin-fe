import BaseApi from './BaseApi'

class CategoryProductApi extends BaseApi {
    createCategoryProduct(params = {}) {
        return this.post('category-products/create-category', params)
    }
    getAllCategoryProduct() {
        return this.get('category-products')
    }
    deleteCategoryProduct(params = {}) {
        return this.delete('category-products/delete-category/' + params)
    }
    getCategoryProductById(params = {}) {
        return this.get('category-products/' + params)
    }
    updateCategoryProduct(id, params = {}) {
        return this.put('category-products/update-category/' + id, params)
    }
    getCategoryStatistic() {
        return this.post('category-products/statistic')
    }
}
export default new CategoryProductApi()
