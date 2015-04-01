(function(){
	'use strict';

	$(document).ready(function(){
		var main = $('#lockscreen');
		var height = main.height(), width = main.width(), circleRadius = 200;
		var originX = width/2, originY = height/2;

		var canvas = new Raphael(main[0], width, height);
		main.append(canvas);

		//Outer Animated Circles 
		canvas.setStart();
		for(var i= 0; i<2*Math.PI;i+=0.25){
			canvas.circle(originX + circleRadius * Math.cos(i), originY + circleRadius * Math.sin(i), Math.random()*150);
		}
		var animatedCircles = canvas.setFinish();
		animatedCircles.attr({'stroke-width': '0',
							'fill': 'white', 
							'fill-opacity': 0});
		var animationCycles = setInterval(function(){
			var aCircle = animatedCircles[Math.floor(Math.random()*animatedCircles.length)];
			if (aCircle) 
				aCircle.animate({
					'fill-opacity': Math.random()*0.15,
					'r': Math.random()*170+30
				}, 25000, 'ease-in-out');
		},1000);
		//Outer Animated Circles End

		//Inner Circles
		var circleShadow = canvas.circle(originX, originY, circleRadius+3);
		circleShadow.attr({'fill': 'black',
						'fill-opacity': '0.25',
						'stroke-width': '0'});

		var circle = canvas.circle(originX, originY, circleRadius);
		circle.attr({'fill': '#2C001E',
					'fill-opacity': '0.8',
					'stroke-width': '0'});
		canvas.setStart();
		for(var i = 0; i<2*Math.PI-0.25;i+=0.25){
			canvas.circle(originX + (circleRadius-40) * Math.cos(i), originY + (circleRadius-40) * Math.sin(i), 3)
		}
		var circleTicks = canvas.setFinish();
		circleTicks.attr({'stroke': 'white',
						'stroke-width': '2'});
		//Inner Circles End

		//Inner Text
		var currentDate = new Date();
		var timeString = (currentDate.getHours()).toString() +':'+ (currentDate.getMinutes()<10?'0':'')+currentDate.getMinutes();
		var time = canvas.text(originX, originY, timeString);
		time.attr({
			fill: 'white',
			'font-size': '50'
		});
		var dateString = (currentDate.getDate()<10?'0':'')+currentDate.getDate() +'.'+ (currentDate.getMonth()<10?'0':'')+currentDate.getMonth() +'.'+ (1900+currentDate.getYear()).toString();
		var date = canvas.text(originX, originY+30, dateString);
		date.attr({
			fill: 'white',
			'font-size': '22'
		});
		var timeInterval = setInterval(function(){
			currentDate = new Date();
			var temp = (currentDate.getHours()).toString() +':'+ (currentDate.getMinutes()<10?'0':'')+currentDate.getMinutes();
			if (timeString != temp) {
				timeString = temp;
				time.attr({
					text: timeString
				});
			}
			temp = (currentDate.getDate()<10?'0':'')+currentDate.getDate() +'.'+ (currentDate.getMonth()<10?'0':'')+currentDate.getMonth() +'.'+ (1900+currentDate.getYear()).toString();
			if (dateString != temp) {
				dateString = temp;
				date.attr({
					text: dateString
				});
			};
		}, 1000);
		//Inner Text End
	});

})(this);