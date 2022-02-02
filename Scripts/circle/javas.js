$(document).ready(function(){
	$(".pointcircles").hide();
  $(".circlefill").hide();

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(startAngle, endAngle){
    var x = 400;
    var y = 400;
    var radius = 150;
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

  
    var sAngle = 0;
    var eAngle = 359.9;
      var atbts = describeArc(sAngle, eAngle);
      
   $('#arc1').attr("d", atbts);

	var cli = 0;
	var Stat = 0;
	$(".circlefill, .def").mouseenter(function () {
		var datapoint = $(this).attr('target');
		var a = "";
		if (Stat == 0) {
		for (var i =1 ; i <= 9; i++) {
			if (datapoint != i) {
				a = "#dottext" + i;
				if (i <= 5) {
					$(a).animate({right: "300px"}, 500);
				}else{
					$(a).animate({left: "300px"}, 500);
				}
				
			}
		}
		}
		else if (Stat == 1) {
			a = "#dottext"+datapoint;
			if (datapoint != cli) {
				$(".dotstext").finish();
				$(".dotstextf").finish();
			if (datapoint <= 5) {
					$(a).css({right: "300px"});
					$(a).animate({right: "0%"}, 500);
				}else{
					$(a).css({left: "300px"});
					$(a).animate({left: "0%"}, 500);
				}
			}			
		}	
	});

	$(".circlefill, .def").mouseleave(function(){
			$(".dotstext").finish();
			$(".dotstextf").finish();

		if (Stat == 0) {
			$("#dottext1").animate({right: "0%"}, 500);
			$("#dottext2").animate({right: "0%"}, 500);
			$("#dottext3").animate({right: "0%"}, 500);
      $("#dottext4").animate({right: "0%"}, 500);
      $("#dottext5").animate({right: "0%"}, 500);
			$("#dottext6").animate({left: "0%"}, 500);
			$("#dottext7").animate({left: "0%"}, 500);
      $("#dottext8").animate({left: "0%"}, 500);
      $("#dottext9").animate({left: "0%"}, 500);
		}else if (Stat == 1) {
			var dp = $(this).attr('target');
			var	a = "#dottext"+dp;

			if (dp != cli) {

				if (dp <= 5) {
					$(a).animate({right: "300px"}, 500);
				}else{
					$(a).animate({left: "300px"}, 500);
				}
			}	
		}
	});


    FirstIconShowTime = 4800;
    SecondIconShowTime = 400;
    ThirdIconShowTime = 1000;
    FourthIconShowTime = 1500;
    FifthIconShowTime = 2000;
    SixthIconShowTime = 2600;
    SeventhIconShowTime = 3100;
    EighthIconShowTime = 3600;
    NinthIconShowTime = 4200;

    setTimeout(function(){ $("#dottext1").animate({right: "0%"}, 500); }, FirstIconShowTime);
    setTimeout(function(){ $("#dottext2").animate({right: "0%"}, 500); }, SecondIconShowTime);
    setTimeout(function(){ $("#dottext3").animate({right: "0%"}, 500); }, ThirdIconShowTime);
    setTimeout(function(){ $("#dottext4").animate({right: "0%"}, 500); }, FourthIconShowTime);
    setTimeout(function(){ $("#dottext5").animate({right: "0%"}, 500); }, FifthIconShowTime);    
    setTimeout(function(){ $("#dottext6").animate({left: "0%"}, 500); }, SixthIconShowTime);
    setTimeout(function(){ $("#dottext7").animate({left: "0%"}, 500); }, SeventhIconShowTime);
    setTimeout(function(){ $("#dottext8").animate({left: "0%"}, 500); }, EighthIconShowTime);
    setTimeout(function(){ $("#dottext9").animate({left: "0%"}, 500); }, NinthIconShowTime);
    
    setTimeout(function(){ $("#pointcircle1").show(); }, FirstIconShowTime);
    setTimeout(function(){ $("#pointcircle2").show(); }, SecondIconShowTime);
    setTimeout(function(){ $("#pointcircle3").show(); }, ThirdIconShowTime);
    setTimeout(function(){ $("#pointcircle4").show(); }, FourthIconShowTime);
    setTimeout(function(){ $("#pointcircle5").show(); }, FifthIconShowTime);
    setTimeout(function(){ $("#pointcircle6").show(); }, SixthIconShowTime);
    setTimeout(function(){ $("#pointcircle7").show(); }, SeventhIconShowTime);
    setTimeout(function(){ $("#pointcircle8").show(); }, EighthIconShowTime);
    setTimeout(function(){ $("#pointcircle9").show(); }, NinthIconShowTime);

    setTimeout(function(){ $("#cir1").show(); }, FirstIconShowTime);
    setTimeout(function(){ $("#cir2").show(); }, SecondIconShowTime);
    setTimeout(function(){ $("#cir3").show(); }, ThirdIconShowTime);
    setTimeout(function(){ $("#cir4").show(); }, FourthIconShowTime);
    setTimeout(function(){ $("#cir5").show(); }, FifthIconShowTime);
    setTimeout(function(){ $("#cir6").show(); }, SixthIconShowTime);
    setTimeout(function(){ $("#cir7").show(); }, SeventhIconShowTime);
    setTimeout(function(){ $("#cir8").show(); }, EighthIconShowTime);
    setTimeout(function(){ $("#cir9").show(); }, NinthIconShowTime);

    $(".def, .circlefill").click(function () {
    var clickval = $(this).attr('target');
  	var val = 0
  	var vala = "";
  	if (clickval == 1) {
  		vala = "This is A B C";
  		//$("#CentralImg").attr("src", "images/download2.png");
  	}else if (clickval == 2) {
  		vala = "This is D E F";
  		//$("#CentralImg").attr("src", "images/images3.png");
  	}else if (clickval == 3) {
  		vala = "This is G H I";
  		//$("#CentralImg").attr("src", "images/download4.jpg");
  	}else if (clickval == 4) {
  		vala = "This is J K L";
  		//$("#CentralImg").attr("src", "images/download6.jpg");
  	}else if (clickval == 5) {
  		vala = "This is M N O";
  		//$("#CentralImg").attr("src", "images/download2.png");
  	}else if (clickval == 6) {
      vala = "This is P Q R";
      //$("#CentralImg").attr("src", "images/download2.png");
    }else if (clickval == 7) {
      vala = "This is S T U";
      //$("#CentralImg").attr("src", "images/download2.png");
    }else if (clickval == 8) {
      vala = "This is V W X";
      //$("#CentralImg").attr("src", "images/download2.png");
    }else if (clickval == 9) {
      vala = "This is Y Z";
      //$("#CentralImg").attr("src", "images/download2.png");
    }

	 
    $('#CentralContent').text(vala);

    $('.dotstext, .dotstextf').css({ color: "#168495"}); 
    var colr = "#dottext"+clickval;
    $(colr).css({ color: "#A09FAB" });
    var a = "";
		a = "#dottext" + cli;
	  var k = "#dottext" + clickval;
				if (cli <= 5) {
					$(a).animate({right: "300px"}, 500);
				}else{
					$(a).animate({left: "300px"}, 500);
				}
        if (clickval <= 5) {
          $(k).animate({right: "0%"}, 500);
        }else{
          $(k).animate({left: "0%"}, 500);
        }
    Stat = 1;
    cli = clickval;
  });
});