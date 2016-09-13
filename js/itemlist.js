/**
 * Created by Administrator on 2016/9/12.
 */
  $(function(){
      /////////////////////////////////
      var APP_ID = 'hrpoTBTEP4jBUM8gcX56xA8c-gzGzoHsz'; //换成自己注册后的ID

// 应用 Key，用来校验权限（Web 端可以配置安全域名来保护数据安全）
      var APP_KEY = 'IwOCEpGXSaXY1PTnSl8HExc9'; //换成自己注册后的KEY

// 初始化
      AV.init({
          appId: APP_ID,
          appKey: APP_KEY
      });

      var $user = $.cookie("username");
      if($user == ""){
          $("#userLogin").html("登录")
      }else{
          var str = $("<span id=\"logout\">退出</span>");
          $("#userLogin").parent().append(str);
          $("#userLogin").html($user);
      }
      $("#logout").click(function(){
          $.cookie("username","",{
              path:"/"
          });
          AV.User.logOut(); //退出登录
          alert("退出成功");
          window.location.reload();
      });
      /////////////////////////////////////
      $("#itemList #item_cont .proList").mouseenter(function(){
         // console.log($(this));
          //$(this).children().eq(0).children().eq(0).children().eq(0).css({width:185,height:140});
          $(this).css({boxShadow:"0px 0px 3px 3px #ccc"});
          var str = "<dl class=\"top\"></dl>" +
              "<dl class=\"left\"></dl>" +
              "<dl class=\"right\"></dl>" +
              "<dl class=\"bottom\"></dl>";
          //$(this).html(str);
          $(this).append(str);
          $(this).children("dl").eq(0).stop().animate({width:242,height:2},300);
          $(this).children("dl").eq(1).stop().animate({height:322,width:2},300);
          $(this).children("dl").eq(2).stop().animate({height:322,width:2},300);
          $(this).children("dl").eq(3).stop().animate({width:242,height:2},300);
      });
      $("#itemList #item_cont .proList").mouseleave(function(){
          $(this).css({boxShadow:"0px 0px 3px 3px #ccc"});
          //$(this).children().eq(0).children().eq(0).children().eq(0).css({width:180,height:135});
          $(this).children("dl").eq(0).stop().css({width:0,height:0});
          $(this).children("dl").eq(1).stop().css({height:0,width:0});
          $(this).children("dl").eq(2).stop().css({height:0,width:0});
          $(this).children("dl").eq(3).stop().css({width:0,height:0});
          $(this).children("dl").remove();
          //$("div p").css({width:0,height:0})
      })

      $(".payNow").click(function(){
         // console.log(this);
          var currentUser = AV.User.current();
          if (currentUser) {
              alert("ok");
          }
          else {
              confirm("未登录 请登录后购买");
              //currentUser 为空时，可打开用户注册界面…
          }
      })
  });
