/**
 * Created by Administrator on 2016/9/19.
 */
$(function(){
    var run;
    var mySwiper = new Swiper('.swiper-container', {
        /*pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',*/
       /* paginationClickable: true,*/
        slidesPerView: 1,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
        loop:true,
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            run = true;
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            run = false;
        }
    });
    var mySwiper1 = new Swiper('.swiper-container1', {
        scrollbar: '.swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true
    });
    var mySwiper2 = new Swiper('.swiper-container2', {
        scrollbar: '.swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true
    });
       // mySwiper.lockSwipes();
    var swiper5 = new Swiper('.swiper-container5', {
        slidesPerView:1,
        centeredSlides: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender: function (index) {
            return '<span class="span">' + (index + 1) + '</span>';
        }
    });
    //$(".span").css({width:45,height:45,marginRight:3,background:"#eee"});
    $(".span").css("lineHeight",26+"px");
    $(".span").css({background:"#f60"});
    $(".span").eq(0).css({fontSize:"10px",textAlign:"center",color:"#000"}).html("首页");
    $(".span").eq(1).css({fontSize:"10px",color:"#000"}).html("小说");
    $(".span").eq(2).css({fontSize:"10px",color:"#000"}).html("微信");
    $(".span").eq(3).css({fontSize:"10px",color:"#000"}).html("我的");
    $(".span").eq(4).css({display:"none"});
    $("#contWrap .swiper-pagination span").click(function(){
        var index = $(this).index();
        swiper5 .slideTo(index, 0, false);
        $("#list").css({display:"none"});

    });
    $("#contWrap .box5").css({display:"none"});
    $(".pas").click(function(){
        $("#contWrap .box5").css({display:"block"});
        swiper5 .slideTo(5,0,false);
    });
    var len = swiper5.slides.length;
    $(".swiper-container").hover(function(){
        mySwiper.stopAutoplay();
    },function(){
        mySwiper.startAutoplay();
    });
    var html = "";
    $("dl dd").click(function(){
       html += $(this).html();
       if(html=="123"){
           $("dl").css({
               display:"none"
           })
       }
    });
    var size = 16;
    var bgcolor = "#333";
    if(localStorage){
        size = localStorage.getItem("font");
        $("#list .font").html(size);
        bgcolor = localStorage.getItem("color");
        $("#contWrap .swiper-wrapper .book").eq(0).css({fontSize:size,backgroundColor:bgcolor});
    }else{
        $("#list .font").html(size);
        $("#contWrap .swiper-wrapper .book").eq(0).css({backgroundColor:bgcolor});
    }
    $("#list .add").click(function(e){
        e.preventDefault();
        size++;
        localStorage.setItem("font",size);
        $("#list .font").html(size);
        $("#contWrap .swiper-wrapper .book").eq(0).css({fontSize:size});
    });
    $("#list .reduce").click(function(e){
        e.preventDefault();
        size--;
        localStorage.setItem("font",size);
        $("#list .font").html(size);
        $("#contWrap .swiper-wrapper .book").eq(0).css({fontSize:size});
    })

    $("#list li").click(function(){
        bgcolor =  $(this).css("backgroundColor");
        localStorage.setItem("color",bgcolor);
        $("#contWrap .swiper-wrapper .book").eq(0).css({backgroundColor:bgcolor});
    });
    var show = true;
    $(".swiper-wrapper .book").click(function(){
        if(show==true){
        $("#list").css({display:"block"}).stop().animate({bottom:0},600)
        show = false;
        }else{
          $("#list").stop().animate({bottom:-80},600);
          show = true; 
        }
    });
    $("#contWrap .swiper-wrapper .contact p").eq(4).click(function(){
        var that = $(this);
        setTimeout(function(){
            that.html("验证通过,去打个招呼吧").css({background:"blue"});
        },200);

    })
});