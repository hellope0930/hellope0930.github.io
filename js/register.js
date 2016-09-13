/**
 * Created by Administrator on 2016/9/5.
 */
$(function(){
    $("#top #topMain .right .asideHover").hover(function(){
        $(this).css({background:"#fff"});
        $(this).find(".inner").css({display:"block",zIndex:"10"})
    },function(){
        $(this).css({background:"#f1f1f1"});
        $(this).find(".inner").css({display:"none"})
    });

    // 应用 ID，用来识别应用
    var APP_ID = 'hrpoTBTEP4jBUM8gcX56xA8c-gzGzoHsz'; //换成自己注册后的ID

    // 应用 Key，用来校验权限（Web 端可以配置安全域名来保护数据安全）
    var APP_KEY = 'IwOCEpGXSaXY1PTnSl8HExc9'; //换成自己注册后的KEY

    // 初始化
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
    var TestObject = AV.Object.extend('TestObject');
    var testObject = new TestObject();
    testObject.save({
        testabc: 'hello'
    }).then(function() {
        alert('云服务已开启'); //数据已经存储 可以用这部分做留言本
    }).catch(function(err) {
        alert("云服务未开启");
    });
  //生成四位数字的验证码

    function randomCode(n){
        var arr = [];
        for(var i = 0; i<n;i++){
            var num = parseInt(Math.random()*100);
            if(num>=0&&num<=9){
                arr.push(num);
            }else if(num>=65&&num<=90){
                arr.push(String.fromCharCode(num));
            }else if(num>=20&&num<=35){
                arr.push(String.fromCharCode(num+87))
            }else{
                i--;
            }
        }
        return arr.join("");

    }
    var time;
    var open = true;
    var count = 0;

    $("#testCode").val(randomCode(4));
    $(".code_btn").click(function(){
        console.log($("#textPhone1").val());
        count++;
        var $phone = $("#textPhone").val();
        if(/^1[3|4|5|7|8]\d{9}$/.test($phone)){
            if($("#regBox .code").val()==$("#testCode").val()){
                var Num = $("#textPhone").val();
               // console.log(Num);
                var user = new AV.User();
                user.set("username", ""+ $("#textPhone1").val()+"");
                user.set("password",""+$("#textPhone2").val()+"");
                user.setMobilePhoneNumber(Num);
                user.signUp(null, "");
                $(".code_btn").css({background:"orange",color:"#fff",fontSize:"20px"}).html("下一步");
                $("#regBox .reg_con .reg_none").css({display:"block"});

                    if(open==true&&count==1){
                        var num = 180;
                        time = setInterval(function(){
                            num--;
                            if(num==0){
                                $("#regBox .reg_con .reg_box .pho_code").val("获取验证码");
                                $("#regBox .reg_con .reg_box .pho_code").click(function(){
                                    user.set("username", ""+ $("#textPhone1").val()+"");
                                    user.set("password", ""+ $("#textPhone2").val()+"");
                                    user.setMobilePhoneNumber(Num);
                                    user.signUp(null, "");
                                    alert("验证码已发送,请查收")
                                });
                                clearInterval(time);

                            }else{
                                $("#regBox .reg_con .reg_box .pho_code").val(num+"秒后重新获取")
                            }

                        },1000);
                    }else if($("#phoneCode").val()==""){
                        open=false;
                        count=0;
                        console.log("验证码不能为空")
                    }else{
                        AV.User.verifyMobilePhone($("#phoneCode").val()).then(function(){
                            location.href = "../html/login.html";
                            alert("ok");
                        }, function(err){
                            alert("no");
                        });
                    }
            }else{
                alert("验证码有误");
            }
        }else{
            alert("手机号码有误，请重填");
        }
    });
///////////////////////////////


});
