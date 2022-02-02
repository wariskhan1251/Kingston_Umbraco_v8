$(function () {
    //        $('body').html('<div id="cookies" class="cookies"><div class="cookies_wrapper"><a class="close" title="close" href="javascript:;"></a><p class="copy">We use cookies on this website to enhance your user experience. By continuing on this website <br />you are agreeing to the use of these cookies. For further information please read our <a class="readmore" href="cookies.aspx">Cookie policy</a>. </p></div></div>' + $('body').html());


    $('#container-cookies').append('<div id="cookies" class="cookies"><div><p>This website stores cookies on your computer. These cookies are used to collect information about how you interact with our website and allow us to remember you. We use this information in order to improve and customize your browsing experience and for analytics and metrics about our visitors both on this website and other media. To find out more about the cookies we use, see our <a href="#">Privacy Policy</a>.</p><p>If you decline, your information wont be tracked when you visit this website. A single cookie will be used in your browser to remember your preference not to be tracked.</p><a class="btn cwhite active accept" href="javascript:;">ACCEPT</a><a class="btn cwhite decline" href="javascript:;">DECLINE</a></div></div>');

    //    function cookiesdiv(event) {
    //        if (event == "1") {
    //            alert(document.getElementById('cookies').style.display = "none");
    //            //return false;
    //        } 
    //    }
    function Trim(strValue) {
        return strValue.replace(/^\s+|\s+$/g, '');
    }

    function getCookie(key) {
        var result = false;
        if (document.cookie) {
            var nwecArray = document.cookie.split(';');
            for (i = 0; i < nwecArray.length; i++) {
                var mykeyValue = nwecArray[i].split('=');
                if (Trim(mykeyValue[0]) == key) result = mykeyValue[1];
            }
        }
        return result;
    }

    function setCookie(key, value, hoursExpire) {
        var ablauf = new Date();
        //var expireTime = ablauf.getTime() + (hoursExpire * 60 * 60 * 1000);
        var expireTime = ablauf.setTime(ablauf.getTime() + 3600000 * 24 * hoursExpire);
        ablauf.setTime(expireTime);
        document.cookie = key + "=" + value + "; expires=" + ablauf.toGMTString();
    }

    jQuery(window).load(function () {
        var nwec = getCookie('nwec');
        if (!nwec) {
            //alert('nokooki');
            $("body").addClass("open-cookies");
        }

        $(".accept").click(function () {
            setCookie('nwec', 'true', 31);
            $("body").removeClass("open-cookies");
        });

        $(".decline").click(function () {
            $("body").removeClass("open-cookies");
        });

        function iscookies() {
            if (nwec) {
                //alert('set'); 
                $("body").removeClass("open-cookies");
                // do whatever you want if the cookie is set
                // mycookie contains the cookie value
            }
            else {
                $("body").addClass("open-cookies");
            }

        }
        iscookies();
         
    });

});
// jQuery.noConflict() for using the plugin along with other libraries.
//You can remove it if you won't use other libraries (e.g. prototype, scriptaculous etc.) or
//if you include jQuery before other libraries in yourdocument's head tag.
//[more info: http://docs.jquery.com/Using_jQuery_with_Other_Libraries] 
//jQuery.noConflict(); 
(function($) {

    ////if (location.href.toLowerCase().indexOf("sbronline.co.uk") > -1 && localStorage['userLoggedIn'] == null || localStorage['userLoggedIn'] == "0") {
    ////location.href = './login.html';
    ////}


    $('.faq-detail').hide();
    $(".collapse").click(function (e) {
        if ($(this).hasClass("active")) {
            $(this).parent('.faq-inner').find('.faq-detail').slideDown(400);
            $(".collapse").parent('.faq-inner').find('.faq-detail').slideUp(400);
            $(this).removeClass("active");
        } else {
            $(".collapse").removeClass("active");
            $(this).addClass("active");
            $(".collapse").parent('.faq-inner').find('.faq-detail').slideUp(400);
            $(this).parent('.faq-inner').find('.faq-detail').slideDown(400);
        }
    });

    $(document).ready(function() {

        var mobile = (/iphone|ipod|android|blackberry|mini|windows phone|windowssce|palm/i.test(navigator.userAgent.toLowerCase()));

        $("main .single-coloum-color-box").prev().addClass("mbv");

        //$('.obr-box .obr-detail').hide();
        $(".obr-box .obr-info").click(function () {
            //setTimeout(function () {
            //    var headerHeight = $("header").height();
            //    $('html, body').animate({ scrollTop: $(".click.active").offset().top - headerHeight }, 800);

            //}, 600);
            if ($(this).hasClass("active")) {
                $(this).parent('div').find('.obr-detail').slideDown(500);
                $(".obr-box .obr-info").parent('div').find('.obr-detail').slideUp(500);
                $(this).removeClass("active");
            } else {
                $(".obr-box .obr-info").removeClass("active");
                $(this).addClass("active");
                $(".obr-box .obr-info").parent('div').find('.obr-detail').slideUp(500);
                $(this).parent('div').find('.obr-detail').slideDown(500);
            }
        });

    

        $(".btn-filter").click(function () {
            $(".filter").addClass("open");

        });
        $(".close-p, .shade").click(function () {
            $(".filter").removeClass("open");

        });


        if ($(".iframe-box").length > 0) {
            $(".iframe-box").fancybox({
                //maxWidth: 880,
                //maxHeight: 500,
                fitToView: false,
                width: 880,
                height: 500,
                autoSize: false,
                closeClick: false,
                openEffect: 'none',
                closeEffect: 'none'
            });
        }

        //$('.op-box .op-detail').hide();
        $(".op-box .op-info").click(function () {
            //setTimeout(function () {
            //    var headerHeight = $("header").height();
            //    $('html, body').animate({ scrollTop: $(".click.active").offset().top - headerHeight }, 800);

            //}, 600);
            if ($(this).hasClass("active")) {
                $(this).parent('div').find('.op-detail').slideDown(500);
                $(".op-box .op-info").parent('div').find('.op-detail').slideUp(500);
                $(this).removeClass("active");
            } else {
                $(".op-box .op-info").removeClass("active");
                $(this).addClass("active");
                $(".op-box .op-info").parent('div').find('.op-detail').slideUp(500);
                $(this).parent('div').find('.op-detail').slideDown(500);
            }
        });

        $('.select-box ul').hide();
        $(".select-box > li > a").click(function (e) {
            if ($(this).hasClass("active")) {
                $(this).parent('li').find('ul').slideDown(200);
                $(".select-box > li > a").parent('li').find('ul').slideUp(200);
                $(this).removeClass("active");
            } else {
                $(".select-box > li > a").removeClass("active");
                $(this).addClass("active");
                $(".select-box > li > a").parent('li').find('ul').slideUp(200);
                $(this).parent('li').find('ul').slideDown(200);
                //$('html, body').animate({ scrollTop: $(".find-speaker-inner").offset().top - 160 }, 800);  
            }
        });

        $(document).on("click", ".select-box ul li a", function () {
            $(".select-box > li > a").removeClass("active");
            $(this).parent().parent("ul").slideUp(200);
            $(this).parent().parent().parent().find('a:first').text($(this).text());
            $(this).parent().parent().parent().find('a:first').attr("data-value", $(this).attr("data-value"));
        });

        //$(document).on("click", ".select-box ul li a", function () {
        //    if ($(this).hasClass('open')) {
        //        $(".select-box > li > a").removeClass("active");
        //        $(this).removeClass('open');
        //        $(this).parent().parent().parent().find('a:first').text($(this).text());
        //        $(".select-box > li > a").parent('li').find('ul').slideDown(200);
        //    } else {
        //        $(".select-box > li > a").removeClass("active");
        //        $(this).addClass('open');
        //        $(this).parent().parent().parent().find('a:first').text($(this).text());
        //        $(this).parent().parent().parent().find('a:first').attr("data-value", $(this).attr("data-value"));
        //        $(".select-box > li > a").removeClass('active');
        //        $(".select-box > li > a").parent('li').find('ul').slideUp(200);
        //    }
        //});

        $(".tbl").click(function () {
            $(".tbl").removeClass("active");
            $(this).addClass("active");
            $(".tb").removeClass("open");
            var activeTab = $(this).attr("rel");
            $("#" + activeTab).addClass("open");


            $(".tbtext").removeClass("open");
            var activeTabtext = $(this).attr("data-text");
            $("#" + activeTabtext).addClass("open");

        });

        $('.g-detail').hide();
        $(".collapse").click(function (e) {
            if ($(this).hasClass("active")) {
                $(this).parent('.getway').find('.g-detail').slideDown(400);
                $(".collapse").parent('.getway').find('.g-detail').slideUp(400);
                $(this).removeClass("active");
            } else {
                $(".collapse").removeClass("active");
                $(this).addClass("active");
                $(".collapse").parent('.getway').find('.g-detail').slideUp(400);
                $(this).parent('.getway').find('.g-detail').slideDown(400);
            }
        });


        $('.dd-content').hide();
        $(".dd-link").click(function (e) {
            if ($(this).hasClass("active")) {
                $(this).parent('li').find('.dd-content').slideDown(200);
                $(".dd-link").parent('li').find('.dd-content').slideUp(200);
                $(this).removeClass("active");
            } else {
                $(".dd-link").removeClass("active");
                $(this).addClass("active");
                $(".dd-link").parent('li').find('.dd-content').slideUp(200);
                $(this).parent('li').find('.dd-content').slideDown(200);
            }
        });


		/*$('.news-events-box h2 b').each(function() {
			var $this = $(this);

			var text = $this.text();

			// Remove these comments if spaces are needed
			text += '&nbsp; &nbsp; &nbsp;';
			$this.html($this.text());

			var width = $this.outerWidth();
			var parentWidth = $this.parent('h2').outerWidth();

			var numReps = Math.floor(parentWidth / width);

			$this.html(text.repeat(numReps + 1));
		  });*/
		
        // $('main .home-box section .content-inner p a').mousemove(function(e) {
        //     $(this).find('img').addClass('visible');
        //     $(this).find('img').css({
        //         left: e.pageX,
        //         top: e.pageY
        //     });
        // }).mouseleave(function() {
        //     $(this).find('img').removeClass('visible');
        // });


        //$(".no-menu-one").hover(
        //    function () {

        //        //Menu Two Close
        //        $("header > nav > ul > li > nav").removeClass("first");
        //        setTimeout(function () {
        //            $("header > nav > ul > li > nav").removeClass("menutwo-open");
        //        }, 200);
        //        $(".menu-one").removeClass("active");
        //        //Menu Two Close End

        //        //Menu Three Close
        //        $(".menu-two .menu-three").removeClass("first");
        //        setTimeout(function () {
        //            $(".menu-two .menu-three").removeClass("menuthree-open");
        //        }, 0);
        //        $(".menu-two").removeClass("active");
        //        //Menu Three Close End

        //        $("#bgs").removeAttr("style");
        //        $("#bgs").removeAttr("class");
        //        $("#bgs").removeAttr("data-color-bg");

        //    },
        //    function () {
        //    }
        //);


        //$(".no-menu-two").hover(
        //    function () {
        //        $(".menu-two .menu-three").removeClass("first");
        //        $(".menu-two .menu-three").removeClass("menuthree-open");
        //        $(".menu-two").removeClass("active");
        //    },
        //    function () {
        //    }
        //);

        $(".menu").click(function () {
            if ($(".menu").hasClass('active')) {

                //Menu One Close
                $(".menu").removeClass('active');
                setTimeout(function () {
                    $('body').removeClass('menuone-open');
                    $(".bgg").remove();
                }, 200);

                //Menu Two Close
                $(".menu-one nav").removeClass("first");
                setTimeout(function () {
                    $(".menu-one nav").removeClass("menutwo-open");
                }, 200);
                $(".menu-one").removeClass("active");
                //Menu Two Close End

                ////Menu Three Close
                //$(".menu-two .menu-three").removeClass("first");
                //setTimeout(function () {
                //    $(".menu-two .menu-three").removeClass("menuthree-open");
                //}, 0);
                //$(".menu-two").removeClass("active");
                ////Menu Three Close End

                $("#bgs").removeAttr("style");
                $("#bgs").removeAttr("class");
                $("#bgs").removeAttr("data-color-bg");


            } else {
                $(".menu").addClass('active');
                $('body').addClass('menuone-open');
                $('header').append("<div class='bgg nvb'></div>");
            }

        });

        $(".menu-one").hover(
            function () {
                $(".menu-one").removeClass("active");
                $(this).addClass("active");

                $(".menu-one nav").addClass("first");
                $(".menu-one nav").removeClass("menutwo-open");
                $(this).find("nav").addClass("menutwo-open");


                setTimeout(function () { $("#bgs").css("display", "block"); }, 600);

                $("#bgs").attr("data-color-bg", $(this).attr("data-color"));
                var bgColorset = $("#bgs").attr("data-color-bg");
                $("#bgs").removeAttr("class");
                $("#bgs").addClass(bgColorset);


                ////Menu Three Close
                //$(".menu-two").removeClass("active");
                //$(".menu-two .menu-three").removeClass("first");
                //$(".menu-two .menu-three").removeClass("menuthree-open");
                ////Menu Three Close End

            },
            function () {
                //alert(".menu-one hover out");

                $(".no-menu-one").hover(
                    function () {
                        //alert(".no-menu-one hover");
                        //Menu Two Close
                        $(".menu-one").removeClass("active");
                        $(".menu-one nav").removeClass("first");
                        setTimeout(function () {
                            $(".menu-one nav").removeClass("menutwo-open");
                        }, 200);
                        //Menu Two Close End

                        ////Menu Three Close
                        //$(".menu-two").removeClass("active");
                        //$(".menu-two .menu-three").removeClass("first");
                        //$(".menu-two .menu-three").removeClass("menuthree-open");
                        ////Menu Three Close End

                        $("#bgs").removeAttr("style");
                        $("#bgs").removeAttr("class");
                        $("#bgs").removeAttr("data-color-bg");
                    },
                    function () {
                    }
                );
            }
        );


        //$(".menu-two").hover(
        //    function () {
        //        $(".menu-two .menu-three").addClass("first");
        //        $(".menu-two .menu-three").removeClass("menuthree-open");

        //        $(this).find(".menu-three").addClass("menuthree-open");

        //        $(".menu-two").removeClass("active");
        //        $(this).addClass("active");

        //        //setTimeout(function () { $("#bgs").css("display", "block"); }, 1000);

        //        //$("#bgs").attr("data-color-bg", $(this).attr("data-color"));
        //        //var bgColorset = $("#bgs").attr("data-color-bg");
        //        //$("#bgs").removeAttr("class");
        //        //$("#bgs").addClass(bgColorset);
        //    },
        //    function () {
        //    }
        //);

        //Same as menu close function
        $(document).on("click", ".bgg.nvb", function () {
            $(".menu").removeClass('active');

            //Menu Two Close
            $(".menu-one nav").removeClass("first");
            setTimeout(function () {
                $('body').removeClass('menuone-open');
                $(".menu-one nav").removeClass("menutwo-open");
            }, 200);
            $(".menu-one").removeClass("active");
            //Menu Two Close End

            ////Menu Three Close
            //$(".menu-two .menu-three").removeClass("first");
            //setTimeout(function () {
            //    $(".menu-two .menu-three").removeClass("menuthree-open");
            //}, 0);
            //$(".menu-two").removeClass("active");
            ////Menu Three Close End

            $(".bgg").remove();
            $("#bgs").removeAttr("style");
            $("#bgs").removeAttr("class");
            $("#bgs").removeAttr("data-color-bg");
        });

        $(".search").click(function () {
            //alert("1");
            if ($("body").hasClass('open')) {
                $('body').removeClass('open');
                $(".bgg").remove();
            } else {
                $('body').addClass('open');
                $('main').append("<div class='bgg'></div>");
            }
        });

        $(document).on("click", ".bgg, .search-box .close", function () {
            $('body').removeClass('open');
            $(".bgg").remove();
        });

        //if ($('.img-box>article').length > 0) {
        //    $('.img-box>article').slick({
        //        slidesToShow: 1,
        //        slidesToScroll: 1,
        //        infinite: true,
        //        autoplay: true,
        //        autoplaySpeed: 3000,
        //        variableWidth: false,
        //        dots: true,
        //        animate: 'slide',
        //        fade: false,
        //        speed: 1000,
        //        centerMode: false,
        //        centerPadding: '0',
        //        customPaging: function (slider, i) {
        //            var thumb = $(slider.$slides[i]).data();
        //            //return '<a>' + (i + 1) + '<span>/</span>' + slider.slideCount + '</a>';
        //        }
        //    });
        //}
        if ($('.header-box>div').length > 0) {
            $('.header-box>div').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 3000,
                variableWidth: false,
                dots: true,
                animate: 'slide',
                fade: false,
                speed: 1000,
                centerMode: false,
                centerPadding: '0',
                customPaging: function(slider, i) {
                    var thumb = $(slider.$slides[i]).data();
                    //return '<a>' + (i + 1) + '<span>/</span>' + slider.slideCount + '</a>';
                }
            });
        }
        if ($('.related-box .rb-inner').length > 0) {
            $('.related-box .rb-inner').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                variableWidth: true,
                infinite: false,
                dots: false,
                animation: 'slide',
                speed: 800,
                centerMode: false,
                centerPadding: '0',
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            infinite: true,
                            centerMode: true,
                            focusOnSelect: true,
                            variableWidth: false,
                            speed: 300,
                            dots: false,
                            initialSlide: 1,
                            centerPadding: 'calc(5.866666666666666vw / 1.1) 0 0',
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
        if ($('.si-slider .content-inner').length > 0) {
            $('.si-slider .content-inner').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                variableWidth: false,
                infinite: true,
                dots: true,
                animation: 'slide',
                speed: 800,
                centerMode: false,
                centerPadding: '0',
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            infinite: true,
                            centerMode: true,
                            focusOnSelect: true,
                            variableWidth: false,
                            speed: 300,
                            dots: false,
                            initialSlide: 1,
                            centerPadding: 'calc(5.866666666666666vw / 1.1) 0 0',
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }

        if ($('.news-events-box.related>div').length > 0) {
            $('.news-events-box.related>div').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 3000,
                variableWidth: false,
                dots: false,
                animate: 'slide',
                fade: false,
                speed: 1000,
                centerMode: true,
                centerPadding: '200px',
                customPaging: function (slider, i) {
                    var thumb = $(slider.$slides[i]).data();
                    //return '<a>' + (i + 1) + '<span>/</span>' + slider.slideCount + '</a>';
                },
                responsive: [{
                    breakpoint: 769,
                    settings: {
                        centerMode: true,
                        centerPadding: '0',
                        variableWidth: true,
                        autoplaySpeed: 4000
                    }
                }]
            });
        }

        if ($('.news-events-box>div').length > 0) {
            $('.news-events-box>div').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 3000,
                variableWidth: false,
                dots: false,
                animate: 'slide',
                fade: false,
                speed: 1000,
                centerMode: true,
                centerPadding: '200px',
                customPaging: function (slider, i) {
                    var thumb = $(slider.$slides[i]).data();
                    //return '<a>' + (i + 1) + '<span>/</span>' + slider.slideCount + '</a>';
                },
                responsive: [{
                    breakpoint: 769,
                    settings: {
                        variableWidth: true,
                        centerMode: false,
                        autoplaySpeed: 4000
                    }
                }]
            });
        }
		
        $(document).on("click", ".scrolly[href^='#']", function(e) {
            var href = $(this).attr("href"),
                target = $(href).parents("body");
            if (target.length) {
                e.preventDefault();
                setTimeout(function() {
                    //alert("Hello"); 
                    target.mCustomScrollbar("scrollTo", href);
                }, 600);
            }
        });
        $(document).on("click", ".scrollyc[href^='#']", function(e) {
            var href = $(this).attr("href"),
                target = $(href).parents("body");
            if (target.length) {
                e.preventDefault();

                target.mCustomScrollbar("scrollTo", href);
            }
        });

        $(".rdd").hide();
        //$(".activity-box ul li .m-info").click(function () {
        //    $(".activity-box ul li .m-info").removeClass("active");
        //    $(this).addClass("active");
        //    $(".rdd").hide();
        //    var activeTab = $(this).attr("rel");
        //    $("#" + activeTab).slideDown(600);
        //});

        $(".rd").click(function (e) {
            //if ($('.m-info').hasClass('ac')) {
            //    //$('.m-info').removeClass('ac');
            //    //$('.mi-detail.newexp').slideUp(600);

            //}
            //else {

            //    $('.m-info').addClass('ac');
            //    $('.mi-detail.newexp').slideDown(600);
            //}
            //$('.rdl').addClass('active');
            $(this).parent().parent("article").addClass('active');
            $(this).parent().parent().parent().find('.rdd').slideDown(600);
            //alert($(this).parent().parent().parent().html());
            //alert($(this).parent().find('.mxd').html());
        });
        $(".readmore.less").click(function () {
            //setTimeout(function () {
                $(this).parent().parent().parent().parent().find("article.active").removeClass('active');
                $(this).parent().parent().parent().parent().find('.rdd').slideUp(600);
            //}, 800);
        });

        if ($('.flexslider').length > 0) {
            $('.flexslider').flexslider({
                animation: 'fade',
                controlNav: true,
                touch: true,
                directionNav: true,
                animationLoop: false,
                slideshow: false,
                slideshowSpeed: 4000,
                animationSpeed: 300,
                pauseOnHover: false,
                //sync: "#gallery-thumb",
                start: function(slider) {
                        //slider.find('.flex-direction-nav .flex-prev').addClass("dim");
                        //slider.find('.flex-direction-nav .flex-next').removeClass("dim");
                    }
                    //,
                    //after: function (slider) {
                    //    slider.find('.flex-direction-nav .flex-prev').removeClass("dim");
                    //    slider.find('.flex-direction-nav .flex-next').removeClass("dim");
                    //},
                    //end: function (slider) {
                    //    alert("1");
                    //    slider.find('.flex-direction-nav .flex-prev').removeClass("dim");
                    //    slider.find('.flex-direction-nav .flex-next').addClass("dim");
                    //}
            });
        }


        if ($('.updates-slick .u-block').length > 0) {
            $('.updates-slick .u-block').slick({
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                autoplay: false,
                variableWidth: true,
                centerMode: false,
                centerPadding: '0',
                customPaging: function(slider, i) {
                    var thumb = $(slider.$slides[i]).data();
                    return '0' + (i + 1) + ' / <span>0' + slider.slideCount + '</span>';
                },
                responsive: [{
                    breakpoint: 767,
                    settings: {
                        variableWidth: true,
                        centerMode: false,
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }]
            });
        }

        if ($('.re-slide').length > 0) {
            $('.re-slide').slick({
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: false,
                //variableWidth: false,
                infinite: true,
                autoplay: true,

                centerPadding: '0',
                //responsive: [
                //    {
                //        breakpoint: 767,
                //        settings: {
                //            slidesToShow: 1,
                //            centerMode: true,
                //            focusOnSelect: true,
                //            initialSlide: 1,
                //            centerPadding: '7.246376811594203vw',
                //            slidesToScroll: 1
                //        }
                //    }
                //]
            });
        }

        $(window).bind("load", function() {
            $.fn.visible = function(partial) {
                var $t = $(this),
                    $w = $(window),
                    viewTop = $w.scrollTop(),
                    viewBottom = viewTop + $w.height(),
                    _top = $t.offset().top,
                    _bottom = _top + $t.height(),
                    compareTop = partial === true ? _bottom : _top,
                    compareBottom = partial === true ? _top : _bottom;

                return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            };

            var win = $(window);
            var fxup = $(".fxup");
            var fxdown = $(".fxdown");
            var fxleft = $(".fxleft");
            var fxright = $(".fxright");
            var fxfade = $(".fxfade");
            var fximg = $(".fximg");
            fxup.each(function(i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("upvisible");
                }
            });
            fxdown.each(function(i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("downvisible");
                }
            });
            fxleft.each(function(i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("leftvisible");
                }
            });
            fxright.each(function(i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("rightvisible");
                }
            });
            fxfade.each(function(i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("fadevisible");
                }
            });
            fximg.each(function(i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("imgvisible");
                }
            });
            win.scroll(function(event) {
                fxup.each(function(i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("fxup-in");
                    }
                });
                fxdown.each(function(i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("fxdown-in");
                    }
                });
                fxleft.each(function(i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("fxleft-in");
                    }
                });
                fxright.each(function(i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("fxright-in");
                    }
                });
                fxfade.each(function(i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("fxfade-in");
                    }
                });
                fximg.each(function(i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("fximg-in");
                    }
                });
            });
        });
    });

    $(document).ready(function () {
        $(window).on("resize", function () {

            var numStory = $(".homepage-story").children().length;


            var viewportHeight = $(window).height();
            var thresholds = [];
            console.log(numStory);
            for (let n = 0; n < numStory; n++) {
                scrollPoint = viewportHeight * n;
                thresholds.push(scrollPoint);
                console.log(thresholds);
                }

            $(document).scroll(function () {
                var value = $(document).scrollTop();

                for (let i = 0; i < thresholds.length; i++) {
                    if (value <= thresholds[i]) {
                        console.log(i);
                        $(".story").eq(i - 1).addClass("background-fix");
                        $(".story").eq(i).removeClass("background-fix");
                        /*do this*/ return;
                    }//end if
                    i >= numStory - 1;
            }
        });
        }).resize();
    });
})(jQuery);
