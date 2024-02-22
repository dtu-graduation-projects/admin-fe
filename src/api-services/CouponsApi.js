import BaseApi from './BaseApi'

class Coupons extends BaseApi {
    createCoupons(params = {}) {
        return this.post('coupons/create-coupon', params)
    }
    getAllCoupons() {
        return this.get('coupons')
    }
    deleteCoupons(params = {}) {
        return this.delete('blogs/delete-blog/' + params)
    }
    getCouponsById(params = {}) {
        return this.get('blogs/blog/' + params)
    }
    updateCoupons(id, params = {}) {
        return this.updateFormData('coupons/update-coupon/' + id, params)
    }
    ApplyCoupons(params = {}) {
        return this.post('coupons/apply-coupon', params)
    }
}
export default new Coupons()
