// 获取用户的基本信息
$(function () {
  getUserinfo()
})
var layer = layui.layer
function getUserinfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers 就是请求头配置对象
    headers: {
      Authorization: localStorage.getItem("token") || "",
    },
    success: function (res) {
      console.log(res)
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败")
      }
      renderAvatar(res.data)
      // 调用 renderAvatar 渲染用户的头像
    },
  })
}

// 渲染用户的头像
function renderAvatar(user) {
  // 1. 获取用户的名称
  var name = user.nickname || user.username
  // 2. 设置欢迎的文本
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
  // 3. 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $(".layui-nav-img").attr("src", user.user_pic).show()
    $(".text-avatar").hide()
  } else {
    // 3.2 渲染文本头像
    $(".layui-nav-img").hide()
    var first = name[0].toUpperCase()
    $("text-avatar").html(first).show()
  }
}

// 点击按钮，实现退出功能
$("#btnLogout").on("click", function () {
  // 提示用户是否确定退出
  layer.confirm("确定退出吗?", { icon: 3, title: "提示" }, function (index) {
    //do something
    // 1. 清空本地存储的 token
    localStorage.removeItem("token")
    // 2. 重新跳转到登录页面
    location.href = "./login.html"
    // 关闭 confirm 询问框
    layer.close(index)
  })
})
