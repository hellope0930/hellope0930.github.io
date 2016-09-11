/**
 * Created by Administrator on 2016/9/10.
 */
$(function(){
    var newIndex = 0;
    function play(element,child){
        var childCLone = element.children(child).eq(0).clone(true);
        childCLone.appendTo(element);
        var len = element.children(child).length;

        var chilWidth = element.children(child).eq(0).width();
        var wid = chilWidth*len;
        element.width(wid);
        element.prev().click(function(e){
            e.preventDefault();
            // console.log($(this));
            newIndex++;
            if(newIndex==len){
                newIndex = 1;
                element.css({left:0})
            }
            element.stop().animate({left:newIndex*chilWidth*-1},200);
        });
        element.prev().prev().click(function(e){
            //console.log($(this));
            //console.log(newIndex)
            e.preventDefault();
            if(newIndex==0){
                newIndex=len-1;
                // element.style.left = len-1*chilWidth*-1 + "px"
                element.css({left:len-1*chilWidth*-1});
            }
            newIndex--;
            element.stop().animate({left:newIndex*chilWidth*-1},200);
        })
    }
    play($("#cont_item .left #proNav ul"),"li");
    $("#cont_item .left #proNav ul li span").hover(function(){
        var index = $(this).index();
        $(this).css({border:"2px solid #f60" }).siblings().css({border:"2px solid #fff"});
        $(".proitems ul li").css({display:"none"}).eq(index).css({display:"block",zIndex:"30"});
    });
    /*var scale = 8;
     var layWidth = $(".proitems ul li").width()/scale;
     var layHeight = $(".proitems ul li").height()/scale;
     var lay =  $("<div></div>");
     lay.width(layWidth);
     lay.height(layHeight);
     lay.appendTo($(".proitems ul")).css({
     position:"absolute",
     top:"0",
     left:"0",
     background:"#333",
     zIndex:"80"
     });
     var layDiv = $("<div id=\"zoom\"></div>");

     var layDivWid = $(".proList ul li").width()*8;
     var layDIvHeight = $(".proitems ul li").width()*8;
     var $clone = $(".proitems ul li img").clone().css({
     width:layDivWid,
     height:layDIvHeight
     });
     $clone.appendTo(layDiv);
     layDiv.appendTo($(".proList")).css({
     position:"absolute",
     top:"0",
     left:"500px",
     background:"#333",
     width:$(".proitems ul li").width(),
     height:$(".proitems ul li").width(),
     zIndex:"300",
     overflow:"hidden"

     });
     $(".proitems ul li").hover(function(e){

     $(this).mousemove(function(e){
     e = e ||window.event;
     var index = $(this).index();
     //console.log(e.pageX,e.pageY);
     var x = e.pageX-$(this).offset().left-layWidth/2 ;
     var y = e.pageY-$(this).offset().top-layHeight/2;
     var maxWidth = $(this).width()-lay.width();
     var maxHeight = $(this).height()-lay.height();
     var nowX = Math.max(Math.min(x,maxWidth),0);
     var nowY = Math.max(Math.min(y,maxHeight),0);
     lay.css({left:nowX,top:nowY});
     $("#zoom").children("img").eq(index).css({
     marginLeft:nowX*scale*-1,
     marginTop: nowY*scale*-1
     })
     });


     },function(){

     });*/


    /*function layPlay(element,child){
     var childCLone = element.children(child).eq(0).clone(true);
     childCLone.appendTo(element);
     var len = element.children(child).length;

     var chilWidth = element.children(child).eq(0).width();
     var wid = chilWidth*len;
     element.width(wid);
     element.children(".next").click(function(e){
     e.preventDefault();
     // console.log($(this));
     newIndex++;
     if(newIndex==len){
     newIndex = 1;
     element.css({left:0})
     }
     element.stop().animate({left:newIndex*chilWidth*-1},200);
     });
     element.children(".prev").click(function(e){
     //console.log($(this));
     //console.log(newIndex)
     e.preventDefault();
     if(newIndex==0){
     newIndex=len-1;
     // element.style.left = len-1*chilWidth*-1 + "px"
     element.css({left:len-1*chilWidth*-1});
     }
     newIndex--;
     element.stop().animate({left:newIndex*chilWidth*-1},200);
     })
     }*/
    var layDiv = $("<div id=\"zoom\"></div>");
    var layDivWid = $(".proList ul li").width();
    var laya = $("<span class='sp_bg'>X</span><a class='aprev' href='javascript:;'><</a><a class='anext' href='javascript:;'>></a>");
    laya.appendTo("body");
    var layDIvHeight = $(".proitems ul li").width();
    var $clone = $(".proitems ul li").clone(true);
    $clone.appendTo(layDiv);
    layDiv.appendTo("body").css({
        position:"fixed",
        top:"0",
        left:"0",
        background:"#fff",
        width:"100%",
        height:"800px",
        zIndex:"500",
        overflow:"hidden"
    }).hide();

        $("#cont_item .left #proNav ul li span").on("click",function(e){
            var index = $(this).index();
            $(".sp_bg").show();
            $(".anext").show();
            $(".aprev").show();
            $("#zoom").show().css({left: index * 1263 * -1});
        });

    $(".sp_bg").on("click",function(e){
        $(this).hide();
        $("#zoom").hide();
        $(".anext").hide();
        $(".aprev").hide();
        e.stopPropagation();
    });
    var layIndex = 0;
    $("#zoom").width($("#zoom li").length*$("#zoom li").width());
    $(".anext").click(function(e){
        layIndex++;
        $("#zoom").stop().animate({left:1263*layIndex*-1});
        e.stopPropagation();
    });
    $(".aprev").click(function(e){
        layIndex--;
        if(layIndex==-1){
            layIndex = 5;
        }
        $("#zoom").stop().animate({left:1263*layIndex*-1});
        e.stopPropagation();
    });
});
















