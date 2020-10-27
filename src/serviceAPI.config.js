const BASEURL = "https://www.easy-mock.com/mock/5f9033c6e4d147581af73ee4/mock/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo:BASEURL + 'index',
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL + 'user/register',
    login: LOCALURL + 'user/login' 
}
// module.exports = URL
export default  URL