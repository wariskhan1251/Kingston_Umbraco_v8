(function ($) {
    $(window).on("load", function () {
        var mobile = (/iphone|ipod|android|blackberry|mini|windows phone|windowssce|palm/i.test(navigator.userAgent.toLowerCase())); var screenPositionPart1 = 0, screenPositionPart2 = 0, screenPositionPart3 = 0, screenPositionPart4 = 0; $("#content").mCustomScrollbar({ mouseWheel: { scrollAmount: 335 }, axis: "x", theme: "minimal-dark", callbacks: { whileScrolling: function () {
            var num = this.mcs.draggerLeft; var str = num.toPrecision(); var res = str.replace(/\-/g, ''); if (!mobile || $(window).width() > 1024) {
                if (num < 145) {
                    screenPositionPart1 = num;
                    $("#img1").addClass("active");
                    $("#img2").removeClass("active");
                    $("#img3").removeClass("active"); 
                    $("#img4").removeClass("active");

                    $("#img1").css("-webkit-transform", "scale(" + ((screenPositionPart1 * 0.001) + 1) + ")");
                    $("#img1").css("-moz-transform", "scale(" + ((screenPositionPart1 * 0.001) + 1) + ")");
                    $("#img1").css("-o-transform", "scale(" + ((screenPositionPart1 * 0.001) + 1) + ")");
                    $("#img1").css("transform", "scale(" + ((screenPositionPart1 * 0.001) + 1) + ")");
                }
                else if (num >= 146 && num < 409) {
                    screenPositionPart2 = Number(num - screenPositionPart1);
                    $("#img1").removeClass("active");
                    $("#img2").addClass("active");
                    $("#img3").removeClass("active");
                    $("#img4").removeClass("active");

                    $("#img2").css("-webkit-transform", "scale(" + ((screenPositionPart2 * 0.001) + 1) + ")");
                    $("#img2").css("-moz-transform", "scale(" + ((screenPositionPart2 * 0.001) + 1) + ")");
                    $("#img2").css("-o-transform", "scale(" + ((screenPositionPart2 * 0.001) + 1) + ")");
                    $("#img2").css("transform", "scale(" + ((screenPositionPart2 * 0.001) + 1) + ")");
                }
                else if ($('#page-2').offset().left < 100 && $('#page-3').offset().left > 100) {
                    screenPositionPart3 = (num - Number(screenPositionPart2 + screenPositionPart1));
                    $("#img1").removeClass("active");
                    $("#img2").removeClass("active");
                    $("#img3").addClass("active");
                    $("#img4").removeClass("active");

                    $("#img3").css("-webkit-transform", "scale(" + ((screenPositionPart3 * 0.001) + 1) + ")");
                    $("#img3").css("-moz-transform", "scale(" + ((screenPositionPart3 * 0.001) + 1) + ")");
                    $("#img3").css("-o-transform", "scale(" + ((screenPositionPart3 * 0.001) + 1) + ")");
                    $("#img3").css("transform", "scale(" + ((screenPositionPart3 * 0.001) + 1) + ")");
                }
                else if ($('#page-3').offset().left < 100 && $('#page-4').offset().left > 100) {
                    screenPositionPart4 = (num - Number(screenPositionPart1 + screenPositionPart2 + screenPositionPart3));
                    if(screenPositionPart4<0)
                    screenPositionPart4 = 0;
                    $("#img1").removeClass("active");
                    $("#img2").removeClass("active");
                    $("#img3").removeClass("active");
                    $("#img4").addClass("active");

                    $("#img4").css("-webkit-transform", "scale(" + ((screenPositionPart4 * 0.001) + 1) + ")");
                    $("#img4").css("-moz-transform", "scale(" + ((screenPositionPart4 * 0.001) + 1) + ")");
                    $("#img4").css("-o-transform", "scale(" + ((screenPositionPart4 * 0.001) + 1) + ")");
                    $("#img4").css("transform", "scale(" + ((screenPositionPart4 * 0.001) + 1) + ")");
                }
                else if ($('#page-4').offset().left < 100) { }
            }
            fade();
            var scrollLeft = res; $('[data-type="content"]').each(function () { var $contentObj = $(this); var yPos; var speed = ($contentObj.data('speed') || 1); yPos = ((Number(scrollLeft) * 2) / Number(speed)); $contentObj.css('margin-left', Number("-" + yPos)); });
        }
        }
        }); $('a[href^="#"]').click(function (e) { e.preventDefault(); var $this = $(this), rel = $this.attr("rel"), el = rel === "content-y" ? ".demo-y" : rel === "content-x" ? ".demo-x" : ".demo-yx", data = $this.data("scroll-to"), href = $this.attr("href").split(/#(.+)/)[1], to = data ? $(el).find(".mCSB_container").find(data) : el === ".demo-yx" ? eval("(" + href + ")") : href, outputTXTdata = el === ".demo-yx" ? data : "'" + data + "'", outputTXThref = el === ".demo-yx" ? href : "'" + href + "'", outputTXT = data ? "$('" + el + "').find('.mCSB_container').find(" + outputTXTdata + ")" : outputTXThref; $(el).mCustomScrollbar("scrollTo", to); }); page1(); $(window).resize(function () { page1(); }); function page1() { var windowWidth = $(window).width(); var windowHeight = $(window).height(); $("#content").css('height', windowHeight); var imgWidth = $('#frame1').width(); var imgHeight = $('#frame1').height(); $('#page-1').css('width', imgWidth); var imgWidth2 = $('#frame2').width(); var imgHeight2 = $('#frame2').height(); $('#page-2').css('width', imgWidth2); var imgWidth3 = $('#frame3').width(); var imgHeight3 = $('#frame3').height(); $('#page-3').css('width', imgWidth3); var imgWidth4 = $('#frame4').width(); var imgHeight4 = $('#frame4').height(); $('#page-4').css('width', imgWidth4); var imgWidth5 = $('#frame5').width(); var imgHeight5 = $('#frame5').height(); $('#page-5').css('width', imgWidth5); var gap1 = $('#g1').width(); var gap2 = $('#g2').width(); var gap3 = $('#g3').width(); var pages1 = imgWidth; var pages2 = imgWidth2; var pages3 = imgWidth3; var pages4 = imgWidth4; var pages5 = imgWidth5; var pagesWidth = pages1 + pages2 + pages3 + pages4 + pages5 + gap1 + gap2 + gap3; $("section #content .content").css("width", pagesWidth); if (mobile || $(window).width() <= 1024) { $("#demo").css("min-width", pagesWidth); } }
function fade(){var animation_height=$(window).innerWidth()*0.25;var ratio=Math.round((1/animation_height)*10000)/10000;$('.fxeffect').each(function(){var objectLeft=$(this).offset().left;var windowBottom=$(window).scrollLeft()+$(window).innerWidth();if(objectLeft<windowBottom){if(objectLeft<windowBottom-animation_height){$(this).css({transition:'opacity 0.1s linear',opacity:1});}else{$(this).css({transition:'opacity 0.25s linear',opacity:(windowBottom-objectLeft)*ratio});}}else{$(this).css('opacity',0);}});}
$('.fade').css('opacity',0);fade();StopWaiting();});})(jQuery);function ShowWaiting(){if($('#dvLoading').length){$('#dvLoading').show();$('#dvLoading').fadeIn(5);}}
function StopWaiting(){if($('#dvLoading').length){setTimeout(function(){$('#dvLoading').hide();$('#dvLoading').fadeOut(500);},200);}}