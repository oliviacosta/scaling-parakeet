var x, y, intervalA, intervalB, intervalC, intervalD;

function LightenDarkenColor(color, percent) {   
    var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255,
    	p = percent < 0 ? percent * - 1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G)
    	* 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
} // stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors

$(document).ready(function() {
	$("input[type=checkbox]").switchButton();
	x = 2000; y = 2000; z = 2000;
	$('#background').hide(); $('.move').hide();
	$('#control').draggable({snap: "#snap", snapMode: "inner"});

	$("#showContent").click(function() {
		$("#dialog").dialog("open");
		$("#dialog").dialog('option', 'maxHeight', 0.5 * $(window).height());
	});

	$("#readMore").hide();
	$("#slideToggle").text(function(){return "Read More";});
	$("#slideToggle").click(function(){
		$("#readMore").slideToggle();
		$("#dialog").dialog('option', 'maxHeight', 0.5 * $(window).height());
		$(this).text(function(i, v){
			return v === 'Read More' ? 'Show Less' : 'Read More'
		})
	});
	
	$("#dialog").dialog({
		autoOpen: false, width: "40%", modal: true,
		show: { effect: "clip", duration: 500 },
		hide: { effect: "clip", duration: 500 },
		buttons: {
			"Show Webpage": function() {
				$(this).dialog("close"); $("#showContent").hide();
				$("#control").show(); $('#background').show(); $('.move').show();
				intervalC = setInterval(c, x); intervalD = setInterval(d, y); c(); d();
			},
			"Cancel": function() {
				$(this).dialog("close");
			}
		}
	});
});

$(function() {
	$("#pause").click(function() {
		$('#modal').show();
		$('.move').stop(true, false); $('#background').stop(true, false);
		clearInterval(intervalC); clearInterval(intervalD);
	});

	$("#resume").click(function() {
		$('#modal').hide();
		intervalC = setInterval(c, x); intervalD = setInterval(d, y);
		c(); d();
	});	

	$('#stop').click(function() { location.reload(); })

	$("#refresh").click(function() {
		x = 2000; y = x;
		clearInterval(intervalC); clearInterval(intervalD);
		intervalC = setInterval(c, x); intervalD = setInterval(d, y);
		c(); d();
	});

	$("#slowdown").click(function() {
		if (x < 6500 && y < 6500 && x > 50 && y > 50) {
			x *= 1.5; y = x; clearInterval(intervalC); clearInterval(intervalD);
			intervalC = setInterval(c, x); intervalD = setInterval(d, y); c(); d();
		} else if (x < 600 && y < 600) {
			x = 600; y = x; clearInterval(intervalC); clearInterval(intervalD);
			intervalC = setInterval(c, x); intervalD = setInterval(d, y); c(); d();
		}
	});

	$("#speedup").click(function() {
		if (x > 600 && y > 600) {
			x *= 0.75; y = x; clearInterval(intervalC); clearInterval(intervalD);
			intervalC = setInterval(c, x); intervalD = setInterval(d, y); c(); d();
		} else if (x <= 600 && y <= 600) {
			x = 50; y = x; clearInterval(intervalC); clearInterval(intervalD);
			intervalC = setInterval(c, x); intervalD = setInterval(d, y); c(); d();
		}
	});
});

var randomColor;

// function a(){
// 	randomColor = "#000000".replace(/0/g, function(){return (~~(Math.random()*16)).toString(16);})
// 	$('#background').animate({
// 		"background-color": randomColor
// 	}, { duration: x, queue: false });
// }

// function b(){
// 	var height = $(window).height();
// 	var width = $(window).width();
	
// 	$.each($('.move'), function(){
// 		randomColor = "#000000".replace(/0/g, function(){return (~~(Math.random()*16)).toString(16);})				
// 		$(this).animate({
// 			"top": Math.round(Math.random() * height),
// 			"left": Math.round(Math.random() * width),
// 			"width": Math.round(Math.random() * 200),
// 			"height": Math.round(Math.random() * 200),
// 			"border-radius": Math.round(Math.random() * 200),
// 			"background-color": randomColor
// 		}, { duration: y, queue: false });
// 	})		
// }

function c(){
	randomColor = "#000000".replace(/0/g, function(){return (~~(Math.random()*16)).toString(16);})
	$('#background').animate({
		"background-color": randomColor
	}, { duration: x, queue: false });
}

function d(){
	var height = $(window).height();
	var width = $(window).width();
	$.each($('.move'), function(){				
		$(this).animate({
			"top": Math.round(Math.random() * height),
			"left": Math.round(Math.random() * width),
			"width": Math.round(Math.random() * 200),
			"height": Math.round(Math.random() * 200),
			"border-radius": Math.round(Math.random() * 200),
			"background-color": LightenDarkenColor(randomColor, Math.random() * 2 - 1)
		}, { duration: y, queue: false });
	})		
}
