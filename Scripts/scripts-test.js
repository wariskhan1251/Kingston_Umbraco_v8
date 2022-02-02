    //$(function () {
//    //         $('body').html('<div id="cookies" class="cookies"><div class="cookies_wrapper"><a class="close" title="close" href="javascript:;"></a><p>We use cookies on this website to enhance your user experience. By continuing on this website you are agreeing to the use of these cookies. For further information please read our <a class="readmore" href="cookies.htm">Cookie policy</a>. </p></div></div>' + $('body').html());

//    ////$('#container-cookies').append('<div id="cookies" class="cookies"><div class="cookies_wrapper"><a class="close" title="close" href="javascript:;"></a><p class="copy">We use cookies on this website to enhance your user experience. By continuing on this website <br />you are agreeing to the use of these cookies. For further information please read our <a class="ck" href="/privacy-policy" target="_blank">Cookie policy</a>.</p></div></div>');

//    //    function cookiesdiv(event) {
//    //        if (event == "1") {
//    //            alert(document.getElementById('cookies').style.display = "none");
//    //            //return false;
//    //        } 
//    //    }
//    function Trim(strValue) {
//        return strValue.replace(/^\s+|\s+$/g, '');
//    }

//    function getCookie(key) {
//        var result = false;
//        if (document.cookie) {
//            var rsofficeArray = document.cookie.split(';');
//            for (i = 0; i < rsofficeArray.length; i++) {
//                var mykeyValue = rsofficeArray[i].split('=');
//                if (Trim(mykeyValue[0]) == key) result = mykeyValue[1];
//            }
//        }
//        return result;
//    }

//    function setCookie(key, value, hoursExpire) {
//        var ablauf = new Date();
//        //var expireTime = ablauf.getTime() + (hoursExpire * 60 * 60 * 1000);
//        var expireTime = ablauf.setTime(ablauf.getTime() + 3600000 * 24 * hoursExpire);
//        ablauf.setTime(expireTime);
//        document.cookie = key + "=" + value + "; expires=" + ablauf.toGMTString();
//    }
//    var rsoffice = getCookie('BeethovenCookie');
//    if (!rsoffice) {
//        //alert('nokooki');
//        document.getElementById('cookies').style.display = "block";
//    }

//    $(".cookies_wrapper .close").click(function () {
//        setCookie('BeethovenCookie', 'true', 31);
//        $(".cookies").css('display', 'none');
//        $("header #header").removeAttr('style');
//        $("nav").removeAttr('style');
//        $("section").removeAttr('style');
//    });


//    function iscookies() {
//        if (rsoffice) {
//            //alert('set');
//            if (document.getElementById('cookies'))
//                document.getElementById('cookies').style.display = "none";
//            // do whatever you want if the cookie is set
//            // mycookie contains the cookie value
//        }
//        else {
//            //document.getElementById('header').style.top = "115px";
//            //document.getElementById('nav').style.top = "229px";
//            if (document.getElementById('eventsclass'))
//                document.getElementById('eventsclass').style.marginTop = "75px";
//            // do whatever you want if the cookie is set
//            // mycookie contains the cookie value
//        }
//    }

//    iscookies();
//});

(function ($) {

    $(document).ready(function () {

        var mobile = (/iphone|ipod|android|blackberry|mini|windows phone|windowssce|palm/i.test(navigator.userAgent.toLowerCase()));

        $(".img-icon-text-box .icon-text-box p").hide();
        $(".btn-down-arrow").click(function () {
            if ($(this).hasClass("active")) {
                $(this).parent('div').find('p').slideUp(400);
                $(this).removeClass("active");
            } else {
                $(this).removeClass("active");
                $(this).addClass("active");
                $(this).parent('div').find('p').slideDown(400);;
            }
        });


		$(".map-box").click(function () {
            $("#lcttext").addClass("hide");
        });

        $(window).scroll(function () {

            if ($(this).scrollTop() > 120) {
                $('body').addClass("sticky");
            }
            else {
                $('body').removeClass("sticky");
            }
        });
 $(".btn-submit").click(function () {
            //  $(".popupv").fadeIn('100');
            location.href = './';
        });
        $(".close-p, .shade").click(function () {
            //  $(".popupv").fadeOut('100');
            location.href ='./';
        });

$(".play-btn").click(function () {
            $(".pause-btn").show();
            $("#destext").hide();;
            $(".video-main").show(); 
        });
        $(".pause-btn").click(function () {
            $(this).hide();
            $("#destext").show();
            $(".video-main").hide(); 
        });
        //if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
        //    $(".videoimg").css("display", "block");
        //}


        // Hide header on scroll down
        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('header').outerHeight() / 2;

        $(window).scroll(function (event) {
            didScroll = true;
        });

        setInterval(function () {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);

        function hasScrolled() {
            var st = $(this).scrollTop();

            // Make scroll more than delta
            if (Math.abs(lastScrollTop - st) <= delta)
                return;

            // If scrolled down and past the navbar, add class .nav-up.
            if (st > lastScrollTop && st > navbarHeight) {
                // Scroll Down
                $('header').addClass('nav-up');
            } else {
                // Scroll Up
                if (st + $(window).height() < $(document).height()) {
                    $('header').removeClass('nav-up');
                }
            }

            lastScrollTop = st;
        }
        $(".menu").click(function () {
            var windowHeight = $(window).height();
            if ($("body").hasClass("nav-open")) {
                $(this).removeClass("active");
                $("body").removeClass("nav-open");
                $(".fixcircle").find("svg path").removeAttr("class");
            } else {
                $(this).addClass("active");
                $("body").addClass("nav-open");

            }
        });

        if ($('.flexslider').length > 0) {
            $('.flexslider').flexslider({
                animation: 'fade', 
                controlNav: true,
                directionNav: true,
                animationLoop: false,
                slideshow: false,
                slideshowSpeed: 4000,
                animationSpeed: 300,
                pauseOnHover: false,
                //sync: "#gallery-thumb",
                start: function (slider) { 
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
        if ($('.gallery > ul').length > 0) {
            $('.gallery > ul').slick({ 
                dots: true,
                infinite: true,
                speed: 2000,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: "40px",
                variableWidth: false,
                arrows: true,
                autoplay: false,
                customPaging: function (slider, i) {
                    //var thumb = $(slider.$slides[i]).data();
                    //return '<a>' + (i + 1) + '-' + slider.slideCount + '</a>';
                },
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            autoplay: false,
                            autoplaySpeed: 2000,
                            infinite: false,
                            mobileFirst: true,
                            centerMode: false,
                            focusOnSelect: true,
                            centerPadding: '0',
                            variableWidth: false,
                            centerPadding: '0',
                            dots: true,
                        }
                    }
                ]
            });
        }
        if ($('.b-big-slider ul').length > 0) {
            $('.b-big-slider  ul').slick({
                dots: true,
                speed: 500,
                arrows: false,
                draggable: true,
                nav: true,
                //autoplay:true,
                infinite: true,
                touchMove: true,
                arrows: true,
                centerMode: true,
                centerPadding: '0',
                accessibility: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                customPaging: function (slider, i) {
                    var thumb = $(slider.$slides[i]).data();
                    return (i + 1) + ' / <span>' + slider.slideCount + '</span>';
                },
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true,
                            autoplay: false,
                            autoplaySpeed: 2000,
                            mobileFirst: true,
                            focusOnSelect: true,
                            centerPadding: '0',

                        }
                    }
                ]
            });
        }
        $('.grid-box-slider .u-block').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: true,
            responsive: [
                  {
                      breakpoint: 768,
                      settings: 'unslick'
                  }
            ]
        });

        $('.grid-box-gallery ul').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: true,
            responsive: [
                  {
                      breakpoint: 768,
                      settings: 'unslick'
                  }
            ]
        });

        $('.pb-box .text-column ul').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: true,
            responsive: [
                  {
                      breakpoint: 768,
                      settings: 'unslick'
                  }
            ]
        });

        $('.text-two-img-box-gallery ul').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: true,
            responsive: [
                  {
                      breakpoint: 768,
                      settings: 'unslick'
                  }
            ]
        });

        $('.responsibility').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: true,
            responsive: [
                  {
                      breakpoint: 768,
                      settings: 'unslick'
                  }
            ]
        });


    if ($('.updates-slick .u-block').length > 0) {
            $('.updates-slick .u-block').slick({
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                autoplay: false,
                variableWidth: true,
                centerMode: false,
                centerPadding: '0',
                customPaging: function (slider, i) {
                    var thumb = $(slider.$slides[i]).data();
                    return '0' + (i + 1) + ' / <span>0' + slider.slideCount + '</span>';
                },
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            variableWidth: true,
                            centerMode: false,
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                ]
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

        $("section .map-sec .ms-inner .filter-map h4").click(function () {

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $("section .map-sec .ms-inner .filter-map .f-down").slideToggle();
            } else {
                $(this).addClass('active');
                $("section .map-sec .ms-inner .filter-map .f-down").slideToggle();
            }
        });

        $("section .map-sec .ms-inner .filter-map .f-down li a").click(function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).parent().removeClass("active");

            } else {
                $(this).addClass("active");
                $(this).parent().addClass("active");



            }
        });

        // Accordion Customize Script
        $('.sub-nav .wp-pages > ul > li  ul').hide();
        $('.form-block ul li ul').hide();
        $(".drop-d").click(function (e) {
            if ($(this).hasClass("active")) {
                $(this).parent('li').find('ul').show();
                $(".form-block ul li a").parent('li').find('ul').hide();
                $(this).removeClass("active");
            } else {
                $(".form-block ul li a").removeClass("active");
                $(this).addClass("active");
                $(".form-block ul li a").parent('li').find('ul').hide();
                $(this).parent('li').find('ul').show();

            }
        });


        $(".sub-nav .wp-pages > ul > li, .form-block div > ul > li").hover(function () {
        }, function () {
            $(".sub-nav .wp-pages > ul > li a, .form-block div > ul > li a").removeClass("active");
            $(".sub-nav .wp-pages > ul > li a, .form-block div > ul > li a").parent('li').find('ul').hide();
        });

        $(document).on("click", "#ContactingAboutDDL li a", function () {

            $("#location li a").removeClass('open');
            $(this).addClass('open');
            $(this).parent().parent().parent().find('.drop-d').text($(this).text());
            $(".drop-d").removeClass('active');
            $(".sub-nav .wp-pages > ul > li a, .form-block div > ul > li a").parent('li').find('ul').hide();
        });

        $(document).on("click", "#ContactingAboutDDL li a", function () {

            //$("#ContactingAbout").val("");

            //var ContactingAboutDDLValue = $("#ContactingAboutDDL li").find("a.open").prop("text");

            //if (ContactingAboutDDLValue != "Select" && ContactingAboutDDLValue != "undefined" && ContactingAboutDDLValue != "")
            //    $("#ContactingAbout").val(ContactingAboutDDLValue);
            //$("#hiddenLoc").val($(this).text());

            //alert($("#ContactingAbout").val());


            $("#ContactingAboutDDL li a").removeClass('open');
            $(this).addClass('open');
            $(this).parent().parent().parent().find('.drop-d').text($(this).text());
            $(".drop-d").removeClass('active');
            $(".form-block ul li a").parent('li').find('ul').hide();
        });


        $(document).on("click", "#ContactingBedDDL li a", function () {

            //$("#ContactingAbout").val("");

            //var ContactingBedDDLValue = $("#ContactingBedDDL li").find("a.open").prop("text");

            //if (ContactingBedDDLValue != "Select" && ContactingBedDDLValue != "undefined" && ContactingBedDDLValue != "")
            //    $("#ContactingAbout").val(ContactingBedDDLValue);
            //$("#hiddenBed").val($(this).text());

            $("#ContactingBedDDL li a").removeClass('open');
            $(this).addClass('open');
            $(this).parent().parent().parent().find('.drop-d').text($(this).text());
            $(".drop-d").removeClass('active');
            $(".form-block ul li a").parent('li').find('ul').hide();
        });


        $(".slide2-div").fadeOut();
        $(".slide2").click(function () {
            $(this).addClass("active");
            $(".slide1").removeClass("active");
            $(".slide1-div").fadeOut();
            $(".slide2-div").fadeIn();
        });

        $(".slide1").click(function () {
            $(this).addClass("active");
            $(".slide2").removeClass("active");
            $(".slide2-div").fadeOut();
            $(".slide1-div").fadeIn();
        });

        $(".fb1").click(function () {
            $(this).addClass("active");
            $(".fb2").removeClass("active");
            $(".amenities").fadeOut();
            $(".img-sec").fadeIn();
        });

        $(".fb2").click(function () {
            $(this).addClass("active");
            $(".fb1").removeClass("active");
            $(".img-sec").fadeOut();
            $(".amenities").fadeIn();
        });
        

        $(window).bind("load", function () {
            $.fn.visible = function (partial) {
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
            var fxzoom = $(".fxzoom");
            fxup.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("upvisible");
                }
            });
            fxdown.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("downvisible");
                }
            });
            fxleft.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("leftvisible");
                }
            });
            fxright.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("rightvisible");
                }
            });
            fxfade.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("fadevisible");
                }
            });
            fximg.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("imgvisible");
                }
            });
            fxzoom.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("fxzoomvisible");
                }
            });
            win.scroll(function (event) {
                fxup.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("fxup-in");
                    }
                });
                fxdown.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("fxdown-in");
                    }
                });
                fxleft.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("fxleft-in");
                    }
                });
                fxright.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("fxright-in");
                    }
                });
                fxfade.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("fxfade-in");
                    }
                });
                fximg.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("fximg-in");
                    }
                });
                fxzoom.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("fxzoom-in");
                    }
                });
            });
        });


        var headerHeight = $("header").height();
        $(document).on("scroll", onScroll);
        //smoothscroll
        $('a.scroll').on('click', function (e) {
            $(document).off("scroll");
            $('a.scroll').each(function () {
                $(this).removeClass('active');
            })
            $(this).addClass('active');
            var target = this.hash, menu = target; $target = $(target);
            $('html, body').animate({ scrollTop: ($target.offset().top - headerHeight) }, 800, 'swing', function () {
                //window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
            e.preventDefault();
        });


    });


})(jQuery);
function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('a.scroll').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('a.scroll').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
}


(function ($) {
    $(window).on("load", function () {
        if ($('.pb-box.web .text-column').length > 0) {
            $.mCustomScrollbar.defaults.theme = "inset"; //set "inset" as the default theme
            $.mCustomScrollbar.defaults.scrollButtons.enable = true; //enable scrolling buttons by default


            $(".pb-box.web .text-column").mCustomScrollbar({
                axis: "y", 
                mouseWheelPixels: 120,
                theme: "dark-thick",
                scrollbarPosition: "inside",
                callbacks: {
                    onScroll: function () {

                    },
                    whileScrolling: function () {
                        
							var posopacity = $('.offsetposopacity').offset();
							$('.pb-box.web .text-column ul li').each(function (index) {
								if (posopacity.top >= $(this).offset().top && posopacity.top <= $(this).next().offset().top - 80) {
									$(this).addClass("dim");
									$(".pb-box.web .img-box").removeClass("active");
									$(".pb-box.web .img-box").eq(index).addClass("active");
									$(".pb-box.web .img-box").eq(index).addClass("line");
									//$('.offsetposopacity').html("No Reached");
									//$('.offsetposopacity').html($(this).find('.year-box h2').html() + " Opacity");
									//alert($(this).index());
								}
								else {

									$(this).removeClass("dim");
									//$(".pb-box .img-box").eq(index).removeClass("active");
									$(".pb-box.web .img-box").eq(index).removeClass("line");
									//$('.offsetposopacity').html("Reached");
								}
							});
                    },
                    onInit: function () {

                    }
                }
            });
			 
        }
    });
})(jQuery);



//jQuery(function ($) {
    //var totalCount = 2;
    //var num = Math.ceil(Math.random() * totalCount);
    //function setBGImage() {
        //var bgimage = 'images/img-mobile' + num + '.jpg';
        //$('.bgslider.mobile.scount').css(
            //{
                //backgroundImage: "url(" + bgimage + ")"
               
            //});
    //}
    //setBGImage();
//});