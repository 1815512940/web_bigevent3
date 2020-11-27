$(function () {
    getUserInfo()
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        })
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvater(res.data)
        }

    })
}

function renderAvater(user) {
    var name = user.nickname || user.username
    $('#welcome').html(`欢迎  ${name}`)
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avater').hide()
    } else {
        var text = name[0].toUpperCase()
        $('.text-avater').html(text).show()
        $('.layui-nav-img').hide()
    }
}

