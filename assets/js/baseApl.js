var baseAPL = 'http://ajax.frontend.itheima.net'

// 1. 所欲ajax都要进行的配置
// 2.大部分ajax都要进行的操作
// 3.有规律的ajax进行的特有操作
$.ajaxPrefilter(function (params) {
    params.url = baseAPL + params.url

    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 拦截所有响应 ，判断身份认证信息
    params.complete = function (res) {
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})