$(function () {
    //         $('body').html('<div id="cookies" class="cookies"><div class="cookies_wrapper"><a class="close" title="close" href="javascript:;"></a><p>We use cookies on this website to enhance your user experience. By continuing on this website you are agreeing to the use of these cookies. For further information please read our <a class="readmore" href="cookies.htm">Cookie policy</a>. </p></div></div>' + $('body').html());

    ////$('#container-cookies').append('<div id="cookies" class="cookies"><div class="cookies_wrapper"><a class="close" title="close" href="javascript:;"></a><p class="copy">We use cookies on this website to enhance your user experience. By continuing on this website <br />you are agreeing to the use of these cookies. For further information please read our <a class="ck" href="/privacy-policy" target="_blank">Cookie policy</a>.</p></div></div>');

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
            var delavegaArray = document.cookie.split(';');
            for (i = 0; i < delavegaArray.length; i++) {
                var mykeyValue = delavegaArray[i].split('=');
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
    var delavega = getCookie('BeethovenCookie');
    if (!delavega) {
        //alert('nokooki');
        //document.getElementById('cookies').style.display = "block";
    }

    $(".cookies_wrapper .close").click(function () {
        setCookie('BeethovenCookie', 'true', 31);
        $(".cookies").css('display', 'none');
        $("header #header").removeAttr('style');
        $("nav").removeAttr('style');
        $("section").removeAttr('style');
    });


    function iscookies() {
        if (delavega) {
            //alert('set');
            if (document.getElementById('cookies'))
                document.getElementById('cookies').style.display = "none";
            // do whatever you want if the cookie is set
            // mycookie contains the cookie value
        }
        else {
            //document.getElementById('header').style.top = "115px";
            //document.getElementById('nav').style.top = "229px";
            if (document.getElementById('eventsclass'))
                document.getElementById('eventsclass').style.marginTop = "75px";
            // do whatever you want if the cookie is set
            // mycookie contains the cookie value
        }
    }

    iscookies();
});

(function ($) {

    $(document).ready(function () {

        var mobile = (/iphone|ipod|android|blackberry|mini|windows phone|windowssce|palm/i.test(navigator.userAgent.toLowerCase()));

        //if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
        //    $(".videoimg").css("display", "block");
        //}
         
       
        //$('.count').each(function () {
        //    var $this = $(this);
        //    jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
        //        duration: 1000,
        //        easing: 'swing',
        //        step: function () {
        //            $this.text(Math.ceil(this.Counter));
        //        }
        //    });
        //});


        $("ul li .tiles-text p").hide();
        $(".plus-icon").click(function () {
            if ($(this).hasClass("active")) {
                $(this).parent('.tiles-text').find('p').slideUp(400);
                $(this).removeClass("active");
            } else {
                $(this).removeClass("active");
                $(this).addClass("active");
                $(this).parent('.tiles-text').find('p').slideDown(400);;
            }
        });

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

       


         $(window).scroll(function () {

            if ($(this).scrollTop() > $("header").height()) {
                $('body').addClass("sticky");

                //$("#player1")[0].pause();
                //$(".upv .play").removeClass("pause");
            }
            else {
                $('body').removeClass("sticky");
            }
			if ($(this).scrollTop() > $(".slider .vdbox").height()) { 
                $("#player1")[0].pause();
                $(".upv .play").removeClass("pause");
            }
        });

        /*youtube video*/
         $(".playbtn").click(function () {
             $(this).addClass("hide");
             $(".pausebtn").removeClass("hide");
         });
         $(".pausebtn").click(function () {
             $(this).addClass("hide");
             $(".playbtn").removeClass("hide");
         });
        

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


        function polarToCartesian(centerX, centerY, radius, angleInDegrees, ASA) {
            var angleInRadians = (angleInDegrees + ASA) * Math.PI / 180.0;

            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        }

        function describeArc(startAngle, endAngle, ASA) {
            var x = 400;
            var y = 400;
            var radius = 150;
            var start = polarToCartesian(x, y, radius, endAngle, ASA);
            var end = polarToCartesian(x, y, radius, startAngle, ASA);

            var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
            var d = [
                "M", start.x, start.y,
                "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
            ].join(" ");

            return d;
        }
         
        $(".scrollcircle").each(function () {
            var sAngle = 0;
            var eAngle = 359.9;
            var circlePointGet = Number($(this).attr("data-circle-start"));
            var circlePointAdjust = describeArc(sAngle, eAngle, circlePointGet);  
            $(this).find("svg path").attr("d", circlePointAdjust);  
        });


        $(".fixcircle").each(function () {
            var sAngle = 0;
            var eAngle = 359.9;
            var circlePointGet = Number($(this).attr("data-circle-start"));
            var circlePointAdjust = describeArc(sAngle, eAngle, circlePointGet);
            $(this).find("svg path").attr("d", circlePointAdjust);
        });

        //var sAngle = 0;
        //var eAngle = 359.9;
        //var AnimationstartAngleTopC1 = 0;
        //var AnimationstartAngleTopC2 = 100;
        //var AnimationstartAngleTopC3 = 267;
        //var AnimationstartAngleTopC4 = 36;
        //var AnimationstartAngleTopC5 = 182;
        //var AnimationstartAngleTopC6 = 44;
        //var AnimationstartAngleTopC9 = 271;

        //var AnimationstartAngleTopC7 = 302; 
        //var AnimationstartAngleTopC8 = 242;

        //var TopCircle1 = describeArc(sAngle, eAngle, AnimationstartAngleTopC1);
        //var TopCircle2 = describeArc(sAngle, eAngle, AnimationstartAngleTopC2);
        //var TopCircle3 = describeArc(sAngle, eAngle, AnimationstartAngleTopC3);
        //var TopCircle4 = describeArc(sAngle, eAngle, AnimationstartAngleTopC4);
        //var TopCircle5 = describeArc(sAngle, eAngle, AnimationstartAngleTopC5);
        //var TopCircle6 = describeArc(sAngle, eAngle, AnimationstartAngleTopC6);
        //var navCircle = describeArc(sAngle, eAngle, AnimationstartAngleTopC9);

        //var TopCircle7 = describeArc(sAngle, eAngle, AnimationstartAngleTopC7); 
        //var TopCircle8 = describeArc(sAngle, eAngle, AnimationstartAngleTopC8);


        //var contactCircle1 = describeArc(sAngle, eAngle, 224);
        //var contactCircle2 = describeArc(sAngle, eAngle, 59);
        //var contactCircle3 = describeArc(sAngle, eAngle, 278);

        //$('#arc1').attr("d", TopCircle1);
        //$('#arc2').attr("d", TopCircle2);
        //$('#arc3').attr("d", TopCircle3);
        //$('#arc4').attr("d", TopCircle4);
        //$('#arc5').attr("d", TopCircle5);
        //$('#arc6').attr("d", TopCircle6);
        //$('#nav-circle').attr("d", navCircle);

        //$('#arc7').attr("d", TopCircle7);
        //$('#arc71').attr("d", TopCircle7);
        //$('#arc8').attr("d", TopCircle8);
        //$('#contact1').attr("d", contactCircle1);
        //$('#contact2').attr("d", contactCircle2);
        //$('#contact3').attr("d", contactCircle3);
         

        //$(window).bind("load", function () {
        //    $.fn.visible = function (partial) {
        //        var $t = $(this),
        //            $w = $(window),
        //            viewTop = $w.scrollTop(),
        //            viewBottom = viewTop + $w.height(),
        //            _top = $t.offset().top,
        //            _bottom = _top + $t.height(),
        //            compareTop = partial === true ? _bottom : _top,
        //            compareBottom = partial === true ? _top : _bottom;

        //        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
        //    };

        //    var win = $(window);
        //    var fxup = $(".fxup");
        //    var fxdown = $(".fxdown");
        //    var fxleft = $(".fxleft");
        //    var fxright = $(".fxright");
        //    var fxcircle = $(".about-box .circle");
        //    fxup.each(function (i, elfx) {
        //        var elfx = $(elfx);
        //        if (elfx.visible(true)) {
        //            elfx.addClass("upvisible");
        //        }
        //    });
        //    fxdown.each(function (i, elfx) {
        //        var elfx = $(elfx);
        //        if (elfx.visible(true)) {
        //            elfx.addClass("downvisible");
        //        }
        //    });
        //    fxleft.each(function (i, elfx) {
        //        var elfx = $(elfx);
        //        if (elfx.visible(true)) {
        //            elfx.addClass("leftvisible");
        //        }
        //    });
        //    fxright.each(function (i, elfx) {
        //        var elfx = $(elfx);
        //        if (elfx.visible(true)) {
        //            elfx.addClass("rightvisible");
        //        }
        //    });
        //    fxcircle.each(function (i, elfx) {
        //        var elfx = $(elfx);
        //        if (elfx.visible(true)) {
        //            // Call Circle function here onload
        //            //el.addClass("arcs"); 
        //            elfx.find("svg path").attr("class", "arcs");
        //        }
        //    });
        //    win.scroll(function (event) {
        //        fxup.each(function (i, elfx) {
        //            var elfx = $(elfx);
        //            if (elfx.visible(true)) {
        //                elfx.addclass("fxup-in");
        //            }
        //        });
        //        fxdown.each(function (i, elfx) {
        //            var elfx = $(elfx);
        //            if (elfx.visible(true)) {
        //                elfx.addclass("fxdown-in");
        //            }
        //        });
        //        fxleft.each(function (i, elfx) {
        //            var elfx = $(elfx);
        //            if (elfx.visible(true)) {
        //                elfx.addclass("fxleft-in");
        //            }
        //        });
        //        fxright.each(function (i, elfx) {
        //            var elfx = $(elfx);
        //            if (elfx.visible(true)) {
        //                elfx.addclass("fxright-in");
        //            }
        //        });
        //        fxcircle.each(function (i, elfx) {
        //            var elfx = $(elfx);
        //            if (elfx.visible(true)) {
        //                // Call Circle function here onscroll
        //                //el.addClass("arcs"); 
        //                elfx.find("svg path").attr("class", "arcs");
        //            }
        //        });
        //    });
        //});


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
            var fxcircle = $(".scrollcircle");
            fxup.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    setTimeout(function () {
                        el.addClass("upvisible");
                    }, 300);
                }
            });
            fxdown.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    setTimeout(function () {
                        el.addClass("downvisible");
                    }, 300);
                }
            });
            fxleft.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    setTimeout(function () {
                        el.addClass("leftvisible");
                    }, 300);
                }
            });
            fxright.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) { 
                    setTimeout(function () {
                        el.addClass("rightvisible");
                    }, 300);
                }
            });
            fxfade.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    setTimeout(function () {
                        el.addClass("fadevisible");
                    }, 300);
                }
            });
            fxcircle.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    // Call Circle function here onload
                    //el.addClass("arcs");  
                    el.find("svg path").attr("class", "arcs");
                }
            }); 
            win.scroll(function (event) {
                fxup.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        setTimeout(function () {
                            el.addClass("fxup-in");
                        }, 300);
                    }
                });
                fxdown.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        setTimeout(function () {
                            el.addClass("fxdown-in");
                        }, 300);
                    }
                });
                fxleft.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        setTimeout(function () {
                            el.addClass("fxleft-in");
                        }, 300);
                    }
                });
                fxright.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        setTimeout(function () {
                            el.addClass("fxright-in");
                        }, 300);
                    }
                });
                fxfade.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        setTimeout(function () {
                            el.addClass("fxfade-in");
                        }, 300);
                    }
                });
                fxcircle.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        // Call Circle function here onload
                        //el.addClass("arcs"); 
                        el.find("svg path").attr("class", "arcs");
                    }
                }); 
            });
        });


        $(".menu").click(function () { 
            var windowHeight = $(window).height();
            if ($("header").hasClass("nav-open")) {   
                $(this).removeClass("active");
                $("header").removeClass("nav-open");
                $(".fixcircle").find("svg path").removeAttr("class");
            } else {
                $(this).addClass("active");
                $("header").addClass("nav-open");   
               
            }
        });

        if ($('.news-inner').length > 0) {
            $('.news-inner').slick({
                speed: 300,
                slidesToShow: 1,
                autoplay: false,
                centerMode: false,
                infinite: false,
            });
        }
        if ($('.portfolio-inner').length > 0) {
            $('.portfolio-inner').slick({
                speed: 300,
                slidesToShow: 1,
                autoplay: false,
                centerMode: false,
                infinite: false,
            }); 
        }

        if ($('.news-box .info-box').length > 0) {
            $('.news-box .info-box ul').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 2000,
                mobileFirst: true,
                centerMode: false,
                focusOnSelect: true,
                centerPadding: '0', 
                variableWidth: true,
                responsive: [
                      {
                          breakpoint: 750,
                          settings: 'unslick'
                      }
                ]
            });
        }
        if ($('.flexslider').length > 0) {
            $('.flexslider').flexslider({
                animation: "slide",
                controlNav: true,
                animationLoop: false,
                slideshow: false,
                slideshowSpeed: 4000,
                animationSpeed: 500,
                pauseOnHover: true,
                //sync: "#gallery-thumb", 
                    
            });
        }


        $(window).bind("load", function () {
            setTimeout(function () {
                //$("body").removeClass('intro');
            }, 2000);
        }); 


        // Accordion Customize Script
        $('.fillter ul li ul').hide();
        $(".drop-d").click(function (e) {
            if ($(this).hasClass("active")) {
                $(this).parent('li').find('ul').show();
                $(".fillter ul li a").parent('li').find('ul').hide();
                $(this).removeClass("active");
            } else {
                $(".fillter ul li a").removeClass("active");
                $(this).addClass("active");
                $(".fillter ul li a").parent('li').find('ul').hide();
                $(this).parent('li').find('ul').show();

            }
        });

        $(".fillter div > ul > li").hover(function () {
        }, function () {
            $(".fillter ul li a").removeClass("active");
            $(".fillter ul li a").parent('li').find('ul').hide();
        });

        $(document).on("click", "#ContactingAboutDDL li a", function () {

            $("#ContactingAboutDDL li a").removeClass('open');
            $(this).addClass('open');
            $(this).parent().parent().parent().find('.drop-d').text($(this).text());
            $(".drop-d").removeClass('active');
            $(".fillter ul li a").parent('li').find('ul').hide();
        });
        $(document).on("click", "#ContactingIntrestedDDL li a", function () {

            $("#ContactingIntrestedDDL li a").removeClass('open');
            $(this).addClass('open');
            $(this).parent().parent().parent().find('.drop-d').text($(this).text());
            $(".drop-d").removeClass('active');
            $(".fillter ul li a").parent('li').find('ul').hide();
        });


        $(document).on("click", "#ContactingNumerofBedroomsDDL li a", function () {

            $("#ContactingNumerofBedroomsDDL li a").removeClass('open');
            $(this).addClass('open');
            $(this).parent().parent().parent().find('.drop-d').text($(this).text());
            $(".drop-d").removeClass('active');
            $(".fillter ul li a").parent('li').find('ul').hide();
        });
        $(document).on("click", "#ContactingSuppychainCountryDDL li a", function () {

            $("#ContactingSuppychainCountryDDL li a").removeClass('open');
            $(this).addClass('open');
            $(this).parent().parent().parent().find('.drop-d').text($(this).text());
            $(".drop-d").removeClass('active');
            $(".fillter ul li a").parent('li').find('ul').hide();
        });

        //
         

    });



})(jQuery); 
// inViewport jQuery plugin
// https://stackoverflow.com/a/26831113/383904
$(function ($, win) {
    $.fn.inViewport = function (cb) {
        return this.each(function (i, el) {
            function visPx() {
                var H = $(this).height(),
                    r = el.getBoundingClientRect(), t = r.top, b = r.bottom;
                return cb.call(el, Math.max(0, t > 0 ? H - t : (b < H ? b : H)));
            } 
            visPx();
            $(win).on("resize scroll", visPx);
        });
    };
}(jQuery, window));


jQuery(function ($) { // DOM ready and $ in scope

    $(".count").inViewport(function (px) { // Make use of the `px` argument!!!
        // if element entered V.port ( px>0 ) and
        // if prop initNumAnim flag is not yet set
        //  = Animate numbers
        if (px > 0 && !this.initNumAnim) {
            this.initNumAnim = true; // Set flag to true to prevent re-running the same animation
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                    duration: 1000,
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                }); 
        }
    }); 
});
 
     
   