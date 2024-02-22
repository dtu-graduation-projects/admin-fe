import BaseApi from './BaseApi'

class ProductApi extends BaseApi {
    create(params = {}) {
        return this.postDataForm('products/create-product', params)
    }
    getAllProduct() {
        return this.get('products')
    }
    deleteProduct(params = {}) {
        return this.delete('products/delete-product/' + params)
    }
    getProductById(params = {}) {
        return this.get('products/' + params)
    }
    updateProduct(id, params = {}) {
        console.log('sdsd')
        return this.updateFormData('products/update-product/' + id, params)
    }
}
export default new ProductApi()
