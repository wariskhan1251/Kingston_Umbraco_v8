// $(function() {
//     //         $('body').html('<div id="cookies" class="cookies"><div class="cookies_wrapper"><a class="close" title="close" href="javascript:;"></a><p>We use cookies on this website to enhance your user experience. By continuing on this website you are agreeing to the use of these cookies. For further information please read our <a class="readmore" href="cookies.htm">Cookie policy</a>. </p></div></div>' + $('body').html());

//     $('#container-cookies').append('<div id="cookies" style="visibility:hidden;" class="cookies"><div class="cookies_wrapper"><a class="close" title="close" href="javascript:;"></a><p class="copy">This site uses cookies to enhance the user experience. To find out more and set your preferences, please click here. If you agree to our use of <a class="ck" href="privacy.html">cookie</a>, please continue to browse our site.</p></div></div>');

//     //    function cookiesdiv(event) {
//     //        if (event == "1") {
//     //            alert(document.getElementById('cookies').style.display = "none");
//     //            //return false;
//     //        } 
//     //    }
//     function Trim(strValue) {
//         return strValue.replace(/^\s+|\s+$/g, '');
//     }

//     function getCookie(key) {
//         var result = false;
//         if (document.cookie) {
//             var pollenestateArray = document.cookie.split(';');
//             for (i = 0; i < pollenestateArray.length; i++) {
//                 var mykeyValue = pollenestateArray[i].split('=');
//                 if (Trim(mykeyValue[0]) == key) result = mykeyValue[1];
//             }
//         }
//         return result;
//     }

//     function setCookie(key, value, hoursExpire) {
//         var ablauf = new Date();
//         //var expireTime = ablauf.getTime() + (hoursExpire * 60 * 60 * 1000);
//         var expireTime = ablauf.setTime(ablauf.getTime() + 3600000 * 24 * hoursExpire);
//         ablauf.setTime(expireTime);
//         document.cookie = key + "=" + value + "; expires=" + ablauf.toGMTString();
//     }
//     var pollenestate = getCookie('pollenestate');
//     if (!pollenestate) {
//         //alert('nokooki');
//         document.getElementById('cookies').style.display = "block";
//     }

//     $(".cookies_wrapper .close").click(function() {
//         setCookie('pollenestate', 'true', 31);
//         $(".cookies").css('display', 'none');
//         $("header #header").removeAttr('style');
//         $("nav").removeAttr('style');
//         $("section").removeAttr('style');
//     });


//     function iscookies() {
//         if (pollenestate) {
//             //alert('set');
//             if (document.getElementById('cookies'))
//                 document.getElementById('cookies').style.display = "none";
//             // do whatever you want if the cookie is set
//             // mycookie contains the cookie value
//         } else {
//             //document.getElementById('header').style.top = "115px";
//             //document.getElementById('nav').style.top = "229px";
//             if (document.getElementById('eventsclass'))
//                 document.getElementById('eventsclass').style.marginTop = "75px";
//             // do whatever you want if the cookie is set
//             // mycookie contains the cookie value
//         }
//     }

//     iscookies();
// });



// $(".btn-submit").click(function() {
//     //  $(".popupv").fadeIn('100');
//     location.href = './';
// });
// $(".close-p, .shade").click(function() {
//     //  $(".popupv").fadeOut('100');
//     location.href = './';
// });






// $(".play-btn").click(function() {
//     $(".pause-btn").show();
//     $("#destext").hide();;
//     $(".video-main").show();
// });
// $(".pause-btn").click(function() {
//     $(this).hide();
//     $("#destext").show();
//     $(".video-main").hide();
// });
// //if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
// //    $(".videoimg").css("display", "block");
// //}

(function($) {

    ////if (location.href.toLowerCase().indexOf("sbronline.co.uk") > -1 && localStorage['userLoggedIn'] == null || localStorage['userLoggedIn'] == "0") {
    ////location.href = './login.html';
    ////}

    $(document).ready(function() {

        var mobile = (/iphone|ipod|android|blackberry|mini|windows phone|windowssce|palm/i.test(navigator.userAgent.toLowerCase()));
        // $('main .home-box section .content-inner p a').mousemove(function(e) {
        //     $(this).find('img').addClass('visible');
        //     $(this).find('img').css({
        //         left: e.pageX,
        //         top: e.pageY
        //     });
        // }).mouseleave(function() {
        //     $(this).find('img').removeClass('visible');
        // });
        if ($('.full-img-box>div').length > 0) {
            $('.full-img-box>div').slick({
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

		$('.news-events-box article').slick({
		  centerMode: true,
		  centerPadding: '350px',
		  slidesToShow: 1
		});	
		
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
        $(".header-toggle").click(function() {
            //alert("1");
            if ($(".header-toggle").hasClass('header-toggle--is-active')) {
                $(".header-toggle").removeClass('header-toggle--is-active');
                $('nav').removeClass('open');
            } else {
                $(".header-toggle").addClass('header-toggle--is-active');
                $('nav').addClass('open');
            }
        });

        $("header nav aside ul li a,section").click(function() {
            $(".header-toggle").removeClass('header-toggle--is-active');
            $('nav').removeClass('open');
        });
        $(".menu-c").click(function() {
            $(".header-toggle").removeClass('header-toggle--is-active');
            $('nav').removeClass('open');
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


})(jQuery);
//function ShowWaiting() { if ($('#dvLoading').length) { $('#dvLoading').show(); $('#dvLoading').fadeIn(5); } }
//function StopWaiting() { if ($('#dvLoading').length) { setTimeout(function () { $('#dvLoading').hide(); $('#dvLoading').fadeOut(500); }, 200); } }
//$(window).load(function () { StopWaiting(); });

/*(function($) {
    $(window).on("load", function() {

        $("body").mCustomScrollbar({
            axis: "y",
            mouseWheelPixels: 300,
            theme: "dark-thick",
            scrollbarPosition: "inside",
            advanced: {
                autoExpandHorizontalScroll: false
            },
            callbacks: {
                onCreate: function() {
                    //$(this).find(".page").css("width", $(this).width());
                    //$(this).find(".box").css("width", ($(this).width() / 2));
                },
                onBeforeUpdate: function() {
                    //$(this).find(".page").css("width", $(this).width());
                    //$(this).find(".box").css("width", ($(this).width() / 2));
                },
                whileScrolling: function() {
                    var num = this.mcs.draggerTop;
                    var str = num.toPrecision();
                    var res = str.replace(/\-/g, '');
                    var scrollTop = res;


                    $.fn.visible = function(partial) {
                        var $t = $(this),
                            $w = $(window),
                            viewTop = $w.scrollTop(),
                            viewBottom = viewTop + $w.height(),
                            _top = $t.offset().top + Number(200),
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
                    var fxanimate = $(".fxanimate");
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

                    fxanimate.each(function(i, el) {
                        var el = $(el);
                        if (el.visible(true)) {
                            el.addClass("ant");
                            //if (el.hasClass("ant")) {
                            //    $('[data-type="content"]').each(function () {
                            //        var $contentObj = el;
                            //        var yPos;
                            //        var speed = ($contentObj.data('speed') || 1);
                            //        yPos = ((Number(scrollTop) * 2) / Number(speed));
                            //        $contentObj.css('transform', 'translateY(-' + yPos + 'px)');
                            //    });
                            //}
                        }
                    });

                }
            }
        });

        $.mCustomScrollbar.defaults.theme = "inset"; //set "inset" as the default theme
        $.mCustomScrollbar.defaults.scrollButtons.enable = false; //enable scrolling buttons by default

    });
})(jQuery);*/



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