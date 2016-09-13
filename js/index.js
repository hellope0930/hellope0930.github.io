/**
 * Created by Administrator on 2016/9/5.
 */
$(function () {
    /////////////////////////////////////////////////////////
    var APP_ID = 'hrpoTBTEP4jBUM8gcX56xA8c-gzGzoHsz'; //

// 应用 Key，用来校验权限（Web 端可以配置安全域名来保护数据安全）
    var APP_KEY = 'IwOCEpGXSaXY1PTnSl8HExc9'; //

// 初始化
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
    /*var currentUser = AV.User.current();
    if (currentUser) {
        alert("ok");
    }
    else {
        alert("未登录");
        //location.href="../html/register.html";
        //currentUser 为空时，可打开用户注册界面…
    }*/

    var $user = $.cookie("username");
    //console.log($user);
        if(!$user){
            $("#userLogin").html("登录");
            //alert(":")
        }else{
            //alert(";")
            var str = $("<span id=\"logout\">退出</span>");
            $("#userLogin").parent().append(str);
            $("#userLogin").attr("href","javascript:;");
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
    //////////////////////////////////////////////////////////////////////
    $("#top #topMain .right .asideHover").hover(function () {
        $(this).css({background: "#fff"});
        $(this).find(".inner").css({display: "block", zIndex: "10"})
    }, function () {
        $(this).css({background: "#f1f1f1"});
        $(this).find(".inner").css({display: "none"})
    });
    $("#topImg button").click(function () {
        $(this).parent().css({display: "none"});
    });
    $("#search input").focus(function (e) {
        e.stopPropagation();
        $(this).css({color: "#000"});
        if ($(this).val() == "中秋送礼专场") {
            $(this).val("");
        }
        $("#header .btn").click(function () {
            var $val = $("#search input").val();
            console.log(encodeURIComponent("大地"));
            console.log(decodeURI("e8ea3e40819471f7"));
            console.log($val);
        });
    });
    $("#search input").blur(function () {
        if ($(this).val() == "") {
            $(this).css({color: "#b7b7b7"});
            $(this).val("中秋送礼专场");
        }
    });
    $("#shopCart dl").hover(function () {
        $(this).find("dd").css({display: "block", zIndex: "800"});
    }, function () {
        $(this).find("dd").css({display: "none"});
    })
    ///////banner部分
    $.get("slideBar.json").done(function (data) {
        //console.log(data);
        $.each(data, function (i, o) {
            var html = "";
            html += "<li>" +
                "<dl class=\"" + data[i].itmesid + "\">" +
                "<dt>" +
                "<div class=\"links\">" +
                "<div class=\"banner_ico\"></div>" +
                "<h4><a href=\"\">" + o.itemname + "</a></h4>" +
                "<div class=\"ban_links\">" +
                "<a  href=\"\">" + data[i].subitems[0] + "</a>" +
                "<a  href=\"\">" + data[i].subitems[1] + "</a>" +
                "<a href=\"\">" + data[i].subitems[2] + "</a>" +
                "</div>" +
                "</div>" +
                "</dt>" +
                "<dd>" +
                "<div class=\"ddWrap\">" +
                "<table>" +
                "</table>" +
                "<div class=\"right\">" +
                "<img src=\"" + data[i].img + "\">" +
                "</div>" +
                "</div>" +
                "</dd>" +
                "</dl>" +
                "</li>";
            document.getElementById("itemsList").innerHTML += html;
            var cha = $(".item1005");
            cha.css({height: 175, borderBottom: "none", boxShadow: "none"});
        });
        $("#itemsList li").hover(function (e) {

            if ($(this).is("li")) {
                // console.log($(this).find("dd"));
                var html = "";
                var tdhtml = "";
                var $this = $(this);
                var index = $(this).index();
                $.get("../json/slideBar.json", function (data) {
                    //console.log(data[0].tableitems.itemsth);

                    for (var i = 0; i < data[index].tableitems.itemsth.length; i++) {
                        html +=
                            "<tr>" +
                            "<th>" +
                            "<lable>" + data[index].tableitems.itemsth[i] + "</lable>" +
                            "</th>" +
                            "<td>" +
                            "</td>" +
                            "</tr>"
                    }

                    for (var k = 0; k < data[index].tableitems.itemstd.length; k++) {//循环td
                        for (var q = 0; q < data[index].tableitems.itemstd[k].length; q++) {//循环td的内容
                            tdhtml += "<a href=\"\">" + data[index].tableitems.itemstd[k][q] + "</a><b>|</b>";
                            //console.log(tdhtml);
                        }
                    }
                    //console.log($this.find("dd table").html());
                    $this.find("dd table").html(html);
                    $this.find("dd table td").html(tdhtml); //td 内容添加
                });
                $(this).find("dd").css({display: "block", zIndex: "600"});
            }
        }, function () {
            if ($(this).is("li")) {
                $(this).find("dd").css({display: "none"});
            }
        })

    });

    var curIndex = 0;
    var time;

    function auto() {
        var $li = $("#bannerImg li");
        curIndex++;
        if (curIndex == $li.length) {
            curIndex = 0;
        }
        $(".spNav span").removeClass("active").eq(curIndex).addClass("active");
        $li.hide().eq(curIndex).fadeIn();


    }

    /*(function ($) {

     $.fn.hoverDelay = function (options) {

     var defaults = {

     hoverDuring: 1000,

     outDuring: 1000,

     hoverEvent: function () {

     $.noop();

     },
     outEvent: function () {

     $.noop();

     }

     };

     var sets = $.extend(defaults, options || {});

     var hoverTimer, outTimer;

     return $(this).each(function () {

     $(this).hover(function () {

     clearTimeout(outTimer);

     hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);

     }, function () {

     clearTimeout(hoverTimer);

     outTimer = setTimeout(sets.outEvent, sets.outDuring);

     });

     });

     }

     })(jQuery);*/

    $(".spNav span").hover(function () {
        clearInterval(time);
        var _this = this;
        var $this = $(_this).index();
        curIndex = $this;
        $("#bannerImg li").stop().hide().eq($this).show();
        $(".spNav span").removeClass("active").eq($this).addClass("active");
    });

    time = setInterval(auto, 3000);

    $(".spNav span").mouseout(function () {
        time = setInterval(auto, 3000);
    });
    $(".spNav span").click(function () {
        var $this = $(this).index();
        curIndex = $this;
        $("#bannerImg li").hide().eq($this).fadeIn(400);
        $(".spNav span").removeClass("active").eq($this).addClass("active");
    })
    ///////rightBar

    var liWidth = $("#rightBar li img").width();
    var liclone = $("#rightBar li").eq(0).clone(true);
    liclone.appendTo($("#rightBar ul"));
    var len = $("#rightBar li img").length;
    $("#rightBar ul").width(liWidth * len);
    var rightBarIndex = 0;

    function autoPlay() {
        rightBarIndex++;
        //console.log(rightBarIndex);

        if (rightBarIndex == len) {
            $("#rightBar ul").css({left: 0});
            rightBarIndex = 1;
        }
        $("#rightBar ul").animate({
            left: rightBarIndex * liWidth * -1
        });
        $("#rightBar span").removeClass("r_active").eq(rightBarIndex > len - 2 ? 0 : rightBarIndex).addClass("r_active");
    }
    var time1 = setInterval(autoPlay, 3500);
    $("#rightBar span").hover(function () {
        clearInterval(time1);
        //console.log($(this).index());
        var index = $(this).index();
        rightBarIndex = index;
        $("#rightBar span").removeClass("r_active").eq(index).addClass("r_active");
        $("#rightBar ul").animate({
            left: index * liWidth * -1
        }, 100);
    }, function () {
        time1 = setInterval(autoPlay, 2000);
    });
    /////////////倒计时
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var date1 = hour * 60 * 60 * 1000 + min * 60 * 1000 + sec * 1000; //获取当前天数的秒数
    var date2 = 24 * 60 * 60 * 1000; //一天总共的秒数
    function getNum(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function Time(date1, date2) {
        var time2 = Math.abs(date1 - date2); //获取剩下的毫秒数
        //var date3 = new Date(time2);
        var time3 = parseInt(time2 / 1000); //秒数
        var tim = setInterval(function () {
            time3--;
            var min = getNum(parseInt(time3 / 60 % 60));
            var hou = getNum(parseInt(time3 / 60 / 60));
            var sec = getNum(parseInt(time3 % 60));
            $(".timeLeft .hour").html(hou);
            $(".timeLeft .min").html(min);
            $(".timeLeft .second").html(sec);
            // console.log(time3);
        }, 1000);
    }

    Time(date1, date2);

    $.get("banner.json").done(function (data) {
        var html = "";
        $.each(data, function (i, o) {
            var oli = $("#ulPro li");
            for (var key in data[i]) {
                oli[i].innerHTML += "<div>" +
                    "<img src=\"../" + data[i][key].img + "\" alt=\"\">" +
                    "<p class=\"marTop\">" +
                    "<a href=\"\">" +
                    data[i][key].dec +
                    "</a>" +
                    "</p>" +
                    "<p class=\"Price\">" +
                    "<em>" + data[i][key].price + "</em>" +
                    "</p>" +
                    "</div>";
            }
        })
        var divWidth = $("#ulPro li div").width();
        var liWidth = divWidth * $("#ulPro li:eq(0) >div").length;
        var liclone = $("#ulPro li").eq(0).clone(true);
        liclone.appendTo($("#ulPro"));
        var lilen = $("#ulPro li").length;
        $("#ulPro").width(liWidth * lilen);
        var time = setInterval(auto, 2000);
        var curIndex = 0;

        function auto() {
            curIndex++;
            if (curIndex == lilen) {
                curIndex = 1;
                $("#ulPro").css({left: 0})
            }
            $("#ulPro").stop().animate({
                left: curIndex * liWidth * -1
            })
        }

        $("#banner #timeLimit  .prev").click(function () {
            clearInterval(time);
            if (curIndex == 0) {
                curIndex = lilen - 1; //倒数第一张复制的图片的前一张的(实际的最后一张)
                $("#ulPro").css({left: liWidth * (lilen - 1) * -1}); //瞬间拉回倒数第一张(复制那张)开始动画到实际的那张 形成无缝轮播
            }
            curIndex--;
            $("#ulPro").stop().animate({
                left: curIndex * liWidth * -1
            }, 300);
            time = setInterval(auto, 2000);
        })
        $("#banner #timeLimit  .next").click(function () {
            clearInterval(time);
            auto();
            time = setInterval(auto, 2000);
        })
        $("#banner .proSlide").hover(function(){
            clearInterval(time);
        },function(){
            time = setInterval(auto, 2000);
        });
    });
    ///////////////////////////////////////////////////////////购物车---------------------------
    var count = 0;
    $("#body #cont .cont_left ul li div .shop").click(function (e) {
        count++;
        var id = $(this).attr("pid");
        var img =  $(this).parent().children("em").eq(0);
        var img = $(this).parent().children().children().eq(0).attr("src");
        var price = $(this).parent().children().eq(2).html();
        var pname = $(this).parent().children().eq(1).children().eq(0).html();
        var nowprice = price;
        var str = id + "#" + 1 + "#" + img + "#" + price + "#" + pname + "#" + nowprice;
        addCart(str);
        if(count==1){
            $("#shopCart .borderR dt a strong").text(1);
        }
    });
    var user = $.cookie("username");
    //console.log(user);
    function addCart(str) {
        var $cookie = $.cookie("shopcart");
        if ($cookie) {
            var newStr = addStr($cookie, str);
            $.cookie("shopcart", newStr);
        } else {
            $.cookie("shopcart", str, {
                expire: 7
            })
        }
    }

    function addStr(str1, str2) { //增加cookie时判断之前有没有
        var rowArr = str1.split("|");
        var isAdd = true;
        for (var i = 0; i < rowArr.length; i++) {
            var colArr = rowArr[i].split("#");
            var str2Arr = str2.split("#");
            if (colArr[0] == str2Arr[0]) {
                isAdd = false;
                colArr[1] = parseInt(colArr[1]) + 1;
                rowArr[i] = colArr.join("#");
                break;
            }
        }
        if (isAdd) {
            rowArr.push(str2);
        }
        getStr(rowArr.join("|"));
        return rowArr.join("|");
    }
   // console.log($.cookie());
});

function getStr($cookie){
    var sum = 0;
    var rowArr = $cookie === undefined?[]:$cookie.split("|");
    var newArr = [];

    for(var i = 0;i<rowArr.length;i++){
        var colArr = rowArr[i].split("#");
         sum += parseInt(colArr[1]);
    }
    return sum==isNaN?0:sum;
}
var $cookie = $.cookie("shopcart");
var Num1 = getStr($cookie);
//console.log(Num);
$("#shopCart .borderR dt a strong").text(Num1).css({fontSize:"12px",display:"inline-block",width:20});

////////////////////////////////////

$("#body #contain_hot .goods li").mouseover(function () {
    $(this).css({width: 675});
    $(this).siblings("li").css({width: 173});
    $("#body #contain_hot .goods li div").animate({left: 338}, 300)
});
$("#body #meau .left .tab a").hover(function () {
    var index = $(this).index();
    $(this).css({background: "#fff", borderBottom: "none"});
    $(this).siblings("a").css({background: "#eee", borderBottom: "1px solid #d9d9d9"})
    $(this).parent().nextAll("div").css({display: "none", zIndex: 0}).eq(index).css({display: "block", zIndex: 100});
});
///////////////////////轮播右侧的------------------------
var $tabRight = $("#body #meau .right ul");
var $tabClone = $("#body #meau .right li").eq(0).clone(true);
$tabClone.appendTo($($tabRight));
var tabWid = $("#body #meau .right li img").width() * $("#body #meau .right li").length;
var Len = $("#body #meau .right li").length
$("#body #meau .right ul").width(tabWid);
var CurIndex = 0;
function Tab() {
    CurIndex++;
    if (CurIndex == Len) {
        $("#body #meau .right ul").css({left: 0});
        CurIndex = 1;
    }
    $("#body #meau .right .spwrap span").removeClass("r_active").eq(CurIndex > Len - 2 ? 0 : CurIndex).addClass("r_active");
    $("#body #meau .right ul").animate({left: CurIndex * $("#body #meau .right li img").width() * -1});

}
var Time = setInterval(Tab, 2000);
$("#body #meau .right .spwrap span").hover(function () {
    clearInterval(Time);
    var index = $(this).index();
    $(this).addClass("r_active");
    $(this).siblings().removeClass("r_active");
    $("#body #meau .right ul").animate({left: index * $("#body #meau .right li img").width() * -1}, 100);
}, function () {
    Time = setInterval(Tab, 3500);
})
////////////////////////////////////轮播结束
var newIndex = 0;
function play(element, child, spName, Time) {
    var childCLone = element.children(child).eq(0).clone(true);
    childCLone.appendTo(element);
    var len = element.children(child).length;

    var chilWidth = element.children(child).eq(0).width();
    var wid = chilWidth * len;
    element.width(wid);
    function auto() {
        newIndex++;
        if (newIndex == len) {
            element.css({left: 0});
            newIndex = 1;
        }
        //console.log(newIndex);
        element.next().children("span").removeClass(spName).eq(newIndex > len - 2 ? 0 : newIndex).addClass(spName);
        // console.log(newIndex)
        element.animate({left: chilWidth * newIndex * -1});
    }

    var time = setInterval(auto, Time);
    //clearInterval(time);
    element.next().children("span").hover(function () {
        clearInterval(time);
        var index = $(this).index();
        newIndex = index;
        $(this).addClass(spName);
        $(this).siblings().removeClass(spName);
        element.animate({left: chilWidth * index * -1}, 100);
    }, function () {
        time = setInterval(auto, Time);
    })
}
/*function Play(element,child,spName){
 this.element = element;
 this.child = child;
 this.spName = spName;
 this.childCLone = element.children(child).eq(0).clone(true);
 this.childCLone.appendTo(element);
 this.len = element.children(child).length;
 this.chilWidth = element.children(child).eq(0).width();
 var wid = this.chilWidth* this.len;
 element.width(wid);
 }
 Play.prototype={
 auto:function(element,child,spName){
 newIndex++;
 if(newIndex == this.len){
 this.element.style.css.left = 0;
 newIndex = 1;
 }
 console.log(newIndex);
 // this.element.next().children("span").removeClass(this.spName).eq(newIndex>this.len-2?0:newIndex).addClass(this.spName);
 // console.log(newIndex)
 },
 animate:{

 }
 };*/
//play($("#body #mb20 .left .center .pro1"),"li","s_active",2000);
play($("#body #mb20 .left .center .pro2"), "li", "s_active", 3000);
//play($("#body #mb20 .left .center .pro3"),"li","s_active",5000);

////////////////大楼层右侧tab
$("#body #mb20 .right .hotRank .tab a").hover(function () {
    var index = $(this).attr("tabIndex");
    $(this).parent().siblings("ul").css({display: "none"}).eq(index).css({display: "block"})
});
/////////////////////////////// ///////左侧边栏导航
//console.log($(window).scrollTop());
$(window).scroll(function () {
    if ($(this).scrollTop() < 800) {
        $("#navBar").css({display: "none"});
    }
    if ($(this).scrollTop() > 800) {
        $("#navBar").css({display: "block"});
    }
    if ($(this).scrollTop() > 1000 && $(this).scrollTop() < 1600) {
        $("#navBar").children("p").css({background: "#333"}).eq(1).css({background: "#f60"}).html("2F");
        $("#navBar").children("p").css({background: "#333"}).eq(2).css({background: "#f60"}).html("3F");
        $("#navBar").children("p").css({background: "#333"}).eq(0).css({background: "#f60"}).html("热品");
    }
    if ($(this).scrollTop() > 1600 && $(this).scrollTop() < 2000) {
        $("#navBar").children("p").css({background: "#333"}).eq(0).css({background: "#f60"}).html("1F");
        $("#navBar").children("p").css({background: "#333"}).eq(2).css({background: "#f60"}).html("3F");
        $("#navBar").children("p").css({background: "#333"}).eq(1).css({background: "#f60"}).html("电脑");
    }
    if ($(this).scrollTop() > 2000) {
        $("#navBar").children("p").css({background: "#333"}).eq(0).css({background: "#f60"}).html("1F");
        $("#navBar").children("p").css({background: "#333"}).eq(1).css({background: "#f60"}).html("2F");
        $("#navBar").children("p").css({background: "#333"}).eq(2).css({background: "#f60"}).html("百货");
    }
});
$("#navBar").children("p").eq(0).click(function () {
    $("html,body").animate({scrollTop: 1000}, 200);
});
$("#navBar").children("p").eq(1).click(function () {
    $("html,body").animate({scrollTop: 1600}, 200);
});
$("#navBar").children("p").eq(2).click(function () {
    $("html,body").animate({scrollTop: 2300}, 200);
});
$("#navTopBar").click(function () {
    $("html,body").animate({scrollTop: 0}, 200);
});
$("#navBar").children("p").eq(0).hover(function () {
    $(this).css({background: "#f60"}).html("热品");
    $(this).siblings().css({background: "#333"});
}, function () {
    $(this).css({background: "#333"});
    $(this).html("1F")
});

$("#navBar").children("p").eq(1).hover(function () {
    $(this).css({background: "#f60"}).html("电脑");
    $(this).siblings().css({background: "#333"});

}, function () {
    $(this).css({background: "#333"});
    $(this).html("2F")
});
$("#navBar").children("p").eq(2).hover(function () {
    $(this).css({background: "#f60"}).html("百货");
    $(this).siblings().css({background: "#333"});

}, function () {
    $(this).css({background: "#333"});
    $(this).html("3F")
});
$("#navTopBar").hover(function () {
    console.log(this);
    $(this).css({background: "#f60"});
}, function () {
    $(this).css({background: "#333"});
});
/////////////////////////////////楼层导航结束
////////////底部加入购物车开始
$("#shopBar p").hover(function () {
    //console.log($(this).offset().left);
    //console.log($(window).scrollTop());
    var y = $(window).scrollTop();
    var tooltip = $(this).attr("brand");
    $(this).css({borderRadius: " 0 3px 3px 0"});
    $(this).parent().find(".move").css({
        display: "block",
        left: $(this).offset().left,
        top: $(this).offset().top - y
    }).html(tooltip).stop().animate({left: $(this).offset().left - 100, top: $(this).offset().top - y})
}, function () {
    $(this).css({borderRadius: "3px"});
    $(this).parent().find(".move").css({display: "none"})
});
/////////////////////////////////////////////////判断是否登录状态






