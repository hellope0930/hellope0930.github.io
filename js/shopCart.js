/**
 * Created by Administrator on 2016/9/8.
 */

$(function(){
    function getCart(){
        var $cookie = $.cookie("shopcart");
        console.log($cookie);
        var json = getStr($cookie==undefined?"":$cookie);
        var html = "";
        $.each(json,function(i,o){
            html+= "<div class=\"content\">" +
                "<em class=\"bg_shdow\"></em>" +
                "<table class=\"tab1\">" +
                "<tr class=\"tb1_tr1\">" +
                "<th class=\"tb1_th1\">" +
                "<span>我的购物车</span>" +
                "</th>" +
                "<th class=\"tb1_th2\">" +
                "<span>购物车结算</span>" +
                "</th>" +
                "</tr>" +
                "<tr valign=\"top\">" +
                "<td class=\"td1\">" +
                "<table>" +
                "<tr class=\"tr1\">" +
                "<td height=\"32\" width=\"60\">" +
                "<input type=\"checkbox\" class=\"chec1\">全选" +
                "</td>" +
                "<td>商品名称</td>" +
                "<td align=\"center\" width=\"100\">单价</td>" +
                "<td align=\"center\" width=\"70\">数量</td>" +
                "<td align=\"center\" width=\"96\">小计</td>" +
                "<td align=\"center\" width=\"80\">操作</td>" +
                "</tr>" +
                "<tr class=\"tr2\">" +
                "<td align=\"center\" width=\"60\" valign=\"middle\">" +
                "<input type=\"checkbox\" class=\"chec2\">" +
                "</td>" +
                "<td align=\"center\"  valign=\"middle\">" +
                "<div class=\"im\">" +
                "<img src=\"../"+o.img+"\" alt=\"\">" +
                "</div>" +
                "<p>"+o.pname+"</p>" +
                "</td>" +
                "<td align=\"center\" width=\"100\" valign=\"middle\">"+o.price+"</td>" +
                "<td align=\"center\" width=\"70\" valign=\"middle\">" +
                "<div class=\"count\">" +
                "<input class=\"input\" data-pid=\""+o.id+"\" type=\"text\" value=\""+o.count+"\">" +
                "<b>" +
                "<span class=\"plus\">+</span>" +
                "<span class=\"minus\">-</span>" +
                "</b>" +

                "</div>" +
                "</td>" +
                "<td class=\"nowprice\" align=\"center\" width=\"96\" valign=\"middle\">"+o.nowprice+"</td>" +
                "<td align=\"center\" width=\"80\" valign=\"middle\">" +
                "<div class=\"del\">" +
                "<a class=\"dele\" data-del=\""+o.id+"\" href=\"javascript:;\">删除</a>" +
                "<a href=\"javascript:;\">移入收藏夹</a>" +
                "</div>" +
                "</td>" +
                "</tr>" +
                "</table>" +
                "</td>" +
                "<td class=\"td2\">" +
                "<div>" +
                "<p class=\"toatal\">" +
                "<span>合计 :</span>" +
                "<strong>300</strong>" +
                "</p>" +
                "<p class=\"pay\">" +
                "<a href=\"\">立刻结账</a>" +
                "</p>" +
                "<p>" +
                "<a  href=\"\">继续购物>></a>" +
                "<a href=\"\">凑单推荐>></a>" +
                "</p>" +
                "</div>" +
                "</td>" +
                "</tr>" +

                "</table>" +
                "</div>";
        });
        $("#shop_contain").html(html);
        var price3=  document.getElementsByClassName("nowprice");
        var sum = 0;
        for(var i = 0;i<price3.length;i++){
            var sp = price3[i].innerHTML;
            var newprice = sp.replace(sp[0],"");
            sum+=parseFloat(newprice);
        }
        $(".toatal strong").html(sum);
    }
    getCart();
    function getStr($cookie){
        var rowArr = $cookie === ""?[]:$cookie.split("|");
        var newArr = [];
        for(var i = 0;i<rowArr.length;i++){
            var colArr = rowArr[i].split("#");
            var colObj = {};
            colObj.id=colArr[0];
            colObj.count = colArr[1];
            colObj.img = colArr[2];
            colObj.price = colArr[3];
            colObj.pname = colArr[4];
            colObj.nowprice = colArr[5];
            newArr.push(colObj);
        }
        return newArr;
    }

    function counter($cookie,id,type){
        var rowArr = $cookie.split("|");
        for(var i = 0;i<rowArr.length;i++){
            var colArr = rowArr[i].split("#");
            if(colArr[0] == id){
                if(type == 1){
                    colArr[1] = parseInt(colArr[1])+1;
                    var price1 = colArr[3].replace(colArr[3][0],"");
                    colArr[5] = "￥"+colArr[1]*parseFloat(price1);
                }else{
                    colArr[1] = parseInt(colArr[1]) - 1;
                    price1 = colArr[3].replace(colArr[3][0],"");
                    colArr[5] = "￥"+colArr[1]*parseFloat(price1);
                }
                rowArr[i] = colArr.join("#");
                break;
            }
        }
        return rowArr.join("|");
    }
//console.log($.cookie());
    $(".content").click(function(e){
        var $target = $(e.target);
        if($target.attr("class") == "plus"){
            var count = parseInt($target.parent().prev().val())+1;
            $target.parent().prev().val(count);
            var price = $target.parent().parent().parent().prev().text();
            var price1 = price.replace(price[0],"");
            var total = parseFloat(price1*count);
            $target.parent().parent().parent().next().html("￥"+total);
            console.log(total);
            var id = $target.parent().prev().data("pid");
            var result = counter($.cookie("shopcart"),id,1);
            $.cookie("shopcart",result,{
                path:"/"
            });
        }else if($target.attr("class") == "minus"){
            var num = parseInt($target.parent().prev().val());
            if(num>1){
                num--;
                $target.parent().prev().val(num);
                price = $target.parent().parent().parent().prev().text();
                price1 = price.replace(price[0],"");
                total = parseFloat(price1*num);
                $target.parent().parent().parent().next().html("￥"+total);
                id = $target.parent().prev().data("pid");
                result = counter($.cookie("shopcart"),id,0);
                $.cookie("shopcart",result,{
                    path:"/"
                });
                console.log(total);
            }
        }/*else if($target.data("del")){
         /!*var id = $target.data("del");
         console.log(id)
         var rowArr = $.cookie("shopcart").split("|");
         //console.log(rowArr);
         var newArr = [];
         for(var i = 0; i < rowArr.length; i++){
         var colArr = rowArr[i].split("#");
         if(colArr[0] != id){
         newArr.push(colArr.join("#"));
         }else{

         }
         }
         rowArr = newArr.join("|");
         $.cookie("shopcart",rowArr);
         console.log($.cookie())*!/
         }*/
    });
  /*  var cont = document.getElementsByClassName("del");
    for(var i = 0;i<cont.length;i++){
        console.log(cont[i]);
        var acont = cont[i].getElementsByClassName("dele");
        acont[0].onclick = function(){
            console.log(this);
        }
    }*/
    $("#shop_contain .dele").click(function(){
        //console.log($(this));

        var id =  $(this).data("del");
        var rowArr = $.cookie("shopcart").split("|");
        console.log(rowArr);
        //console.log(rowArr);
        var newArr = [];
        for(var i = 0; i < rowArr.length; i++){
            var colArr = rowArr[i].split("#");
            if(colArr[0] == id){
                continue;
            }else{
                newArr.push(colArr.join("#"));
            }
        }
        rowArr = newArr.join("|");
        $.cookie("shopcart",rowArr,{
            path:"/"
        });
        console.log($.cookie());
        getCart();
        window.location.reload();
    });
});





