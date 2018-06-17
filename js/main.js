/**
 * Created by zhangxiaoxue on 9/10/15.
 */

$(function (){

    //common parts added by template
    var helper = new Helper();
    var baseUrl = helper.isWork() ? '../' : '';
    var curLoc = helper.getCurrentLocation();
    var today = new Date();
    var year = today.getFullYear();


    //bootstrap tooltip component
    $('[data-toggle="tooltip"]').tooltip();

    //calculate the image
    $('.works-item').each(function(index){
        $item = $(this);
        var itemWidth = $item.width();
        var itemHeight = itemWidth * 0.8;
        if($item.hasClass('big')){
            itemHeight = itemWidth * 1.2;
        }else if($item.hasClass('middle')){
            itemHeight = itemWidth * 1;
        }
        //itemHeight += itemHeight * 0.2 * Math.random();
        $item.find('.works-image').height(itemHeight);

    });

    //filter the categories of my works.
    var $container = $('#works-cnt');
    $container.imagesLoaded(function() {
        window.setTimeout(function(){
            $container.isotope({
                itemSelector: '.works-item',
                percentPosition: true,
                masonry: {
                    // set to the element
                    columnWidth: '.grid-sizer',
                    gutter: '.gutter-sizer'
                }
            })
        }, 1000);
    });

    
    //loading control
    if($('#works').length !== 0){
        $('#works').imagesLoaded(function(){
            $("#page-loader").delay(50).fadeOut();

            if(helper.isIndex()){
                //add animation in index page
                $('.header').addClass('animated fadeInDown');
                $('.home').addClass('animated fadeInDown');
                $('#works').addClass('animated fadeInDown');
            }
        })
    }else{
        if($('.project-banner').length){
            $('.project-banner').imagesLoaded( { background: true }, function() {
                $("#page-loader").delay(50).fadeOut();
            });
        }else{
            $('.project-images').eq(0).imagesLoaded(function(){
                $("#page-loader").delay(50).fadeOut();
            });
        }
    }

    //carousel
    var owl = $('.owl-carousel');
    if(owl.length){
        owl.owlCarousel({
            items:1,
            loop:true,
            autoPlay:3000,
            stopOnHover:true,
            navigation:true,
            transitionStyle:"fade"
        });
    }

    //photo show
    var $seeBig = $('.see-big');
    var $photoshow;

    if($seeBig.length){
        var winW = $(window).width();
        var winH = $(window).height();
        var data = [];
        var length = $seeBig.length;

        $seeBig.each(function(index){
            var $this = $(this);
            var imgW = $this.data('width');
            var imgH = $this.data('height');


            if(imgW/imgH > winW/winH){
                var w = winW - 80 < imgW ? winW - 80: imgW;
                var temp = {
                    index: index,
                    url: $this.attr('href'),
                    originW: imgW,
                    originH: imgH,
                    width: w,
                    height: w / imgW * imgH
                }
            }else{
                var h = winH - 60 < imgH ? winH - 60: imgH;
                var temp = {
                    index: index,
                    url: $this.attr('href'),
                    originW: imgW,
                    originH: imgH,
                    width: h / imgH * imgW,
                    height: h
                }
            }
            data.push(temp);

        });

        $('body').append(template('work/photoshow', {data: data}));

        $photoshow = $('.photoshow');

        if($seeBig.length == 1){
            $('.w-pctrl').hide();
        }
        $seeBig.on('click', function(e){
            e.preventDefault();
            var $this = $(this);
            var currentIndex = $this.data('index');

            $photoshow.show();
            $('html').css('overflow', 'hidden');

            $photoshow.imagesLoaded(function(){
                var $photo = $('.photos .photowrap', $photoshow).eq(currentIndex);
                $photo.addClass('active');
            });

        });

        $photoshow.on('click', '.w-pctrl-pre', function(e){
            e.preventDefault();

            var $currentPhoto = $('.active', $photoshow);
            $currentPhoto.removeClass('active');

            var currentIndex = $currentPhoto.data('index');
            if(currentIndex == 0){
                $('.photos .photowrap', $photoshow).eq(length-1).addClass('active');
            }else{
                $currentPhoto.prev().addClass('active');
            }
        });

        $photoshow.on('click', '.w-pctrl-nxt', function(e){
            e.preventDefault();

            var $currentPhoto = $('.active', $photoshow);
            $currentPhoto.removeClass('active');

            var currentIndex = $currentPhoto.data('index');
            if(currentIndex == length - 1){
                $('.photos .photowrap', $photoshow).eq(0).addClass('active');
            }else{
                $currentPhoto.next().addClass('active');
            }
        });

        $photoshow.on('click', function(e){
            e.preventDefault();

            $photoshow.hide();
            $('html').css('overflow', 'auto');
            var $currentPhoto = $('.active', $photoshow);
            $currentPhoto.removeClass('active');
        });

        $photoshow.on('click', '.bphoto, .w-pctrl-pre, .w-pctrl-nxt', function(e){
            e.stopPropagation();
        });
    }

    //when scrolling down, hide navigation
    var $header = $('#header');
    if(!$header.hasClass('header-index')){
        var lastScrollTop = 0;
        var st = $(this).scrollTop();
        if(st === 0){
            $('#header').addClass('is-top');
        }else{
            $('#header').removeClass('is-top');
            if($('.project-banner').length && st < $('.project-banner').height()){
                $('#header').addClass('is-opacity');
            }else{
                $('#header').removeClass('is-opacity');
            }
        }

        $(window).scroll(function(){
            st = $(this).scrollTop();

            if(st === 0){
                $header.addClass('is-top');
            }else{
                $header.removeClass('is-top');
                if($('.project-banner').length && st < $('.project-banner').height()){
                    $('#header').addClass('is-opacity');
                }else{
                    $('#header').removeClass('is-opacity');
                }
            }

            if (st - lastScrollTop > 10){
                $header.removeClass('slideDown').addClass('animated slideUp');
                //$('.handler').fadeOut();
            }

            if(st - lastScrollTop < -10) {
                $header.removeClass('slideUp').addClass('animated slideDown');
                //$('.handler').fadeIn();
            }

            lastScrollTop = st;
        });

    }




    //setting of lightbox
    lightbox.option({
        resizeDuration: 400,
        fadeDuration: 300,
        imageFadeDuration: 300,
        wrapAround: true
    })
});