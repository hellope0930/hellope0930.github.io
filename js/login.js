/**
 * Created by Administrator on 2016/9/9.
 */


$(function(){
    var APP_ID = 'hrpoTBTEP4jBUM8gcX56xA8c-gzGzoHsz'; //换成自己注册后的ID

// 应用 Key，用来校验权限（Web 端可以配置安全域名来保护数据安全）
    var APP_KEY = 'IwOCEpGXSaXY1PTnSl8HExc9'; //换成自己注册后的KEY

// 初始化
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
  $("#text").focus(function(){
     if($(this).val()=="用户名/已验证手机或邮箱"){
         $(this).val("");
     }
      $(this).css({color:"#000",fontSize:"14px"});
  });
    $("#password").focus(function(){
        //console.log($(this).attr("placeholder"));
       $(this).removeAttr("placeholder");

    });
    $("#password").blur(function(){
        //console.log($(this).attr("placeholder"));
        $(this).attr("placeholder","请输入密码");
       // document.getElementById("password").setAttribute("placeholder","请输入密码");

    });
    $("#text").blur(function(){
        if($(this).val()==""){
            $(this).css({color:"#cfcfcf",fontSize:"12px"});
            $(this).val("用户名/已验证手机或邮箱");
        }
    });
   $("#loginBtn").click(function(){
        var num = $("#text").val();
        var password = $("#password").val();
        AV.User.logInWithMobilePhone(num, password).then(function (loginedUser) {
            console.log(loginedUser);
            alert("登陆成功")
        },(function (error) {
            alert("登录失败");
        }));
    })
});

