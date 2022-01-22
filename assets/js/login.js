$(function () {
  // 点击 "去注册账号" 的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide()
    $(".reg-box").show()
  })

  // 点击 "去注册账号" 的链接
  $("#link_login").on("click", function () {
    $(".login-box").show()
    $(".reg-box").hide()
  })

  // 从 layui 中获取 form 对象
  var form = layui.form
  // 通过 form.verify() 函数自定义效验规则
  form.verify({
    // 自定义了一个叫做 pwd 效验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6-12位，且不能玩为空"],
    // 效验两次密码是否一致的规则
    repwd: function (vlaue) {
      // 通过形参拿到的确定密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于判断
      // 如果判断失败，则return返回一个提示消息
      var pwd = $(".reg-box [name=password]").val()
      if (pwd != vlaue) {
        console.log(vlaue)
        console.log(pwd)
        return "两次密码输入不一致"
      }
    },
  })
  var layer = layui.layer

  // 监听注册表单的提交事件
  $("#form_reg").on("submit", function (e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的Post请求
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    }
    $.post("http://www.itcbc.com:8080/api/reguser", data, function (res) {
      console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      // 必须导入 layer
      layer.msg("注册成功，请登录！")
      // 模拟人的点击行为
      $("#link_login").click()
    })
  })

  // 监听登录表单的提交事件
  $("#form-login").submit(function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    $.ajax({
      url: "http://www.itcbc.com:8080/api/login",
      method: "POST",
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status !== 0) {
          return layer.msg("登录失败")
        }
        layer.msg("登录成功！")
        // 将登录成功得到的 token 字符串，保存 localStorage 中
        localStorage.setItem("token", res.token)
        // 跳转到台后主页
        location.href = "./index.html"
      },
    })
  })
})
