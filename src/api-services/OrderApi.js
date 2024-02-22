import BaseApi from './BaseApi'

class OrderApi extends BaseApi {
    getListOrders() {
        return this.get('orders')
    }
    getOrderById(params = {}) {
        return this.get('orders/detail-order/' + params)
    }
    updateStatus(id, params = {}) {
        return this.put('orders/update-status/' + id, params)
    }
    deleteOrder(params) {
        return this.delete('orders/' + params)
    }
    createOrder(params) {
        return this.post('orders/placeOrders', params)
    }
}
export default new OrderApi()
