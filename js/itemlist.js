/**
 * Created by Administrator on 2016/9/12.
 */
  $(function(){
      $("#itemList #item_cont .proList").mouseenter(function(){
          console.log($(this));
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
  })
