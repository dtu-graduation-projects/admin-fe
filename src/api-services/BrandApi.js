import BaseApi from './BaseApi'

class BrandApi extends BaseApi {
    create(params = {}) {
        return this.post('brands/create-brand', params)
    }
    list() {
        return this.get('brands')
    }
    getBrandById(params = {}) {
        return this.get('brands/detail-brand/' + params)
    }
    updateBrand(id, params = {}) {
        return this.put('brands/update-brand/' + id, params)
    }
    deleteBrand(params = {}) {
        return this.delete('brands/delete-brand/' + params)
    }
}
export default new BrandApi()
