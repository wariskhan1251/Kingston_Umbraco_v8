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
        /*youtube video*/
         $(".playbtn").click(function () {
             $(this).addClass("hide");
             $(".pausebtn").removeClass("hide");
         });
         $(".pausebtn").click(function () {
             $(this).addClass("hide");
             $(".playbtn").removeClass("hide");
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
            var fxcircle = $(".scrollcircle");
            var fxbor = $(".fxbor");
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

            fxbor.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    setTimeout(function () {
                        el.addClass("active");
                    }, 300);
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

                fxbor.each(function (i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        setTimeout(function () {
                            el.addClass("active");
                        }, 300);
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

         
    });



})(jQuery);  
 