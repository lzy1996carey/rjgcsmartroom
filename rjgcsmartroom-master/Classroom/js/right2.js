$(document).ready(function(){
	var timeH = parseInt($('.time span').eq(0).text(),10),
		timeM = parseInt($('.time span').eq(1).text(),10),
		timeS = parseInt($('.time span').eq(2).text(),10),
		temp = parseInt($('.temp span').eq(0).text(),10),
		isWorking = false,
		canStop = false,
		timer,
		way;
	$('#right2 li:eq(0) a').each(function(index){
		$(this).bind({
			'click':function(){
				if (index==0) {
					if (timeM != 0) {
						timeM -= 5;
					}else if (timeH != 0) {
						timeM = 55;
						--timeH;
					}
				}else{
					if (timeH != 6) {
						if (timeM != 55) {
							timeM += 5;
						}else{
							timeM = 0;
							++timeH;
						}
					}
				}
				edit();
				$('.selected').removeClass('selected');
				$(this).addClass('selected');
				return false;
			}
		})
	})
	$('#right2 li:eq(1) a').each(function(index){
		$(this).bind({
			'click':function(){
				if (index==0) {
					temp = temp==0?temp=0:temp-10;
				}else{
					temp = temp==260?temp=260:temp+10;
				}
				$('.selected').removeClass('selected');
				$(this).addClass('selected');
				$('.temp span').eq(0).text(temp);
				return false;
			}
		})
	})
	$('.control:lt(3)').each(function(index){
		$(this).click(function(){
			if ($(this).hasClass('bgchange')) {
				$(this).removeClass('bgchange selected').find('span').removeClass('linechange');
			}else{
				$(this).addClass('bgchange selected').find('span').addClass('linechange');
			}
			$(this).siblings('li:lt(4)').removeClass('bgchange').find('span').removeClass('linechange');
			$(this).siblings('li:not(:eq('+index+'))').removeClass('selected');
			isWorking = false;
			for (var i = 0; i < 3; i++) {
				if($('.control').eq(i).hasClass('bgchange')){
					isWorking = true;
				}
			}
		})
	})
	$('.control:gt(2)').each(function(index){
		$(this).click(function(){
			if ($(this).hasClass('bgchange')) {
				$(this).removeClass('bgchange selected').find('i').removeClass('iconchange');
			}else{
				$(this).addClass('bgchange selected').find('i').addClass('iconchange');
			}
			$(this).siblings('.selected').removeClass('selected');
			$('.stop,.start').removeClass('selected');
		})
	})
	$('.start').click(function(){
		way = (timeH || timeM || timeS)?true:false;
		if (temp!=0 || isWorking || way) {
			if(!timer){
				timer = setInterval(update,1000/60);
				$('.start').css('color','#747474');
				$('.stop').css('color','#000');
			}
		}else{
			$('.stop,.start').css('color','#747474');
		}
		if (!$(this).hasClass('selected')) {
			$(this).addClass('selected');
		}else{
			$(this).removeClass('selected');
		}
		$(this).siblings('.selected').removeClass('selected');

	})
	$('.stop').click(function(){
		if (!$(this).hasClass('selected')) {
			$(this).addClass('selected');
		}else{
			$(this).removeClass('selected');
		}
		$(this).siblings('.selected').removeClass('selected');
		if (timer) {
			clearInterval(timer);
			timeH = timeM =timeS =0;
			edit();
			timer = false;
			$('.stop').css('color','#747474');
		}
	})
	function edit(){
		var editH,
			editM,
			editS;
		editH = timeH +':';
		if (timeM>=10) {
			editM = timeM+':';
		}else{
			editM = '0'+timeM+':';
		}
		editS = (timeS>=10)?timeS:'0'+timeS;
		$('.time span').eq(0).text(editH);
		$('.time span').eq(1).text(editM);
		$('.time span').eq(2).text(editS);
	}
	var update = function(i){
		if (way) {
			if (timeS !=0) {
				--timeS;
			}else if (timeM!=0) {
				timeS = 59;
				--timeM;
			}else if (timeH!=0) {
				timeM = timeS = 59;
				--timeH;
			}
		}else{
			if (timeS == 59) {
				timeS = 0;
				if (timeM == 59) {
					timeM = 0;
					++timeH;
				}else{
					++timeM;
				}
			}else{
				++timeS;
			}
		}
		edit();
	}
})