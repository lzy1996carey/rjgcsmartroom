$(document).ready(function(){
	var color = ['color','dark','white'],
		timeH = parseInt($('.main span').eq(1).text(),10),
		timeM = parseInt($('.main span').eq(2).text(),10),
		timeS = parseInt($('.main span').eq(3).text(),10);
	var currTime = {
		'currTimeH' : timeH,
		'currTimeM' : timeM,
		'currTimeS' : 1
	};
	function currSave(){
		currTime.currTimeH = timeH;
		currTime.currTimeM = timeM;
	}
	$('.title').bind({
		'mousedown':function(){
				$(this).addClass('active');
			},
		'mouseup':function(){
			if (!$(this).hasClass('rest')) {
				$('.show').show();
				$(this).removeClass('active').text('Choose Fabric');
			}
		}
	})
	$('.show li').each(function(){
		$(this).bind({
			'mousedown':function(){
				$(this).addClass('active');
			},
			'mouseup':function(){
				$('.title').text($(this).text());
				$(this).parent().hide();
				$(this).removeClass('active');
			}
		})
	});
	$('.main li').each(function(index){
		$(this).bind({
			'mousedown':function(){
				$(this).addClass('active').siblings().removeClass('active');
			},
			'mouseup':function(){
				if (!$('.title').hasClass('rest')) {
					if (index==0) {
						var currColor = $(this).text();
						var currIndex = $.inArray(currColor,color);
						if (currIndex == color.length-1) {
							$(this).text(color[0]);
						}else{
							$(this).text(color[currIndex+1]);
						}
						if (currIndex ==0) {
							if (timeM>10) {
								timeM -= 10;
							}else if (timeM ==0) {
								timeH -= 1;
								timeM = 50;
							}else{
								timeM = 0;
							}
						}else{
							if (timeM==55) {
								timeM =0;
								timeH += 1;
							}else{
								timeM +=5;
							}
						}
					}else if (index==1) {
						var currTemp = parseInt($(this).text(),10);
						$(this).text((currTemp==60)?currTemp=20:(currTemp+=10));
					}else if (index==2) {
						var currIron = $(this).text();
						if (currIron == 'Easy Iron：On'){
							$(this).text('Easy Iron：Off');
							if (timeM >= 20) {
								timeM -= 20;
							}else{
								timeH -= 1;
								timeM += 40; 
							}
						}else{
							$(this).text('Easy Iron：On');
							if (timeM<40) {
								timeM += 20;
							}else{
								timeH += 1;
								timeM -= 40;
							}
						}
					}else if (index==3) {
						var currRpm = parseInt($(this).find('span').text(),10);
						$(this).find('span').text((currRpm==1000)?currRpm=600:(currRpm+=100));
					}else if (index==4) {
						var currRinse = $(this).text();
						if (currRinse == 'Rinse：On'){
							$(this).text('Rinse：Off');
							if (timeM >= 15) {
								timeM -= 15;
							}else{
								timeH -= 1;
								timeM += 45; 
							}
						}else{
							$(this).text('Rinse：On');
							if (timeM<45) {
								timeM += 15;
							}else{
								timeH += 1;
								timeM -= 45;
							}
						}
					}else if (index==5){
						var currQuick = $(this).text();
						if (currQuick == 'Quick：Off'){
							$(this).text('Quick：On');
							if (timeM >= 20) {
								timeM -= 20;
							}else{
								timeH -= 1;
								timeM += 40; 
							}
						}else{
							$(this).text('Quick：Off');
							if (timeM<40) {
								timeM += 20;
							}else{
								timeH += 1;
								timeM -= 40;
							}
						}
					}
					currSave();
					edit();
				}
			}
		})
	})
	$('.main li:last').toggle(function(){
		$(this).text('Stop').siblings('li:lt(6)').addClass('rest');
		$('.title').addClass('rest');
		timer = setInterval(updateTime,1000/60);
	},function(){
		edit(currTime);
		clearInterval(timer);
		$(this).text('Start').siblings().removeClass('rest');
		$('.title').removeClass('rest');

	})
	var timer;
	var updateTime = function(){
		timeH = parseInt(timeH,10);
		timeM = parseInt(timeM,10);
		timeS = parseInt(timeS,10);
		if (timeS!=0) {
			--timeS;
		}else if(timeM!=0){
			--timeM;
			timeS = 59;
		}else if (timeH!=0) {
			--timeH;
			timeM = timeS = 59;
		}else{
			$(this).text('Start').siblings().removeClass('rest');
			edit(currTime);
			clearInterval(timer);
		}
		edit();
	}
	function edit(object){
		var object = object || {};
		if (object.currTimeS) {
			timeH = object.currTimeH
			timeM = object.currTimeM
			timeS =0;
		}else{
			timeH = parseInt(timeH,10);
			timeM = parseInt(timeM,10);
			timeS = parseInt(timeS,10);
		}
		timeM = (timeM>=10)?timeM:'0'+timeM;
		timeS = (timeS>=10)?timeS:'0'+timeS;
		$('.main span').eq(1).text(timeH);
		$('.main span').eq(2).text(timeM);
		$('.main span').eq(3).text(timeS);
		timeH = parseInt(timeH,10);
		timeM = parseInt(timeM,10);
		timeS = parseInt(timeS,10);
	}
})