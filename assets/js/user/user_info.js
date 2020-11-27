$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为 1 ~ 6 位之间'
            }
        }
    })

    // 获取用户信息
    initUserInfo()
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                form.val('formUserInfo', res.data)
            }
        })
    }

    //  重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 修改用户信息
    // 先看看你的隐藏域保存id么
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })
})