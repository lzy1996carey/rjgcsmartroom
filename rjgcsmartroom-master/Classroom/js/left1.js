$(document).ready(function(){
	var temp = $('a:eq(1)').text(),
		timeH = $('a:eq(4)').text(),
		timeM = $('a:eq(5)').text(),
		timeS = $('a:eq(6)').text();
	$('.choose li').each(function(index){
		$(this).click(function(){
			if ($('.choose li:last').hasClass('rest')) {
				return false;
			}
			var rel = check();
			var has = $(this).hasClass('active');
			if (index == 7) {
				if ($('.prev').css('display') !== 'none') {
					$('.prev , .next').hide();
				}else{
					$('.prev , .next').show();
					$(this).siblings().removeClass('active');
					temp = 'No Heat';
					timeH = '0';
					timeM = '0';
					timeS = '0';
				}
			}else if (index==0) {
				$('.prev , .next').hide();
				if ($.inArray(3,rel)!= -1) {
					temp = has?'Low':'Medium';
				}else if ($.inArray(5,rel)!= -1) {
					timeM = has?'0':'30';
				}else if ($.inArray(6,rel)!= -1) {
					temp = has?'High':'Medium';
					timeH = has?'0':'1';
				}else if (!($.inArray(2,rel) != -1 || $.inArray(4,rel) != -1)){
					temp = has?'No Heat':'Medium';
					timeH = has?'0':'2';
				}
				$(this).toggleClass('active');
				$(this).next().removeClass('active');
			}else if (index==1) {
				$('.prev , .next').hide();
				if ($.inArray(2,rel)!= -1) {
					timeH = has?'2':'1';
				}else if ($.inArray(3,rel)!= -1) {
					temp = has?'Low':'Medium';
					timeH = has?'2':'1';
				}else if ($.inArray(4,rel)!= -1) {
					timeH = has?'2':'1';
				}else if ($.inArray(5,rel)!= -1) {
					timeH = has?'1':'0';
					timeM = has?'0':'30';
				}else if($.inArray(6,rel)!= -1){
					temp = has?'High':'Medium';
				}else{
					temp = has?'No Heat':'Medium';
					timeH = has?'0':'1';
				}
				$(this).toggleClass('active');
				$(this).prev().removeClass('active');
			}else{
				$('.prev , .next').hide();
				if (index==2) {
					if ($.inArray(0,rel)!= -1 || $.inArray(1,rel)!= -1) {
						timeM = has?'0':'30';
					}else{
						temp = has?'No Heat':'Medium';
						timeH =has?'0':'2';
						timeM =has?'0':'30';
					}
				}else if (index==3) {
					if ($.inArray(0,rel)!= -1 || $.inArray(1,rel)!= -1) {
						timeM = has?'0':'30';
					}else{
						temp = has?'No Heat':'Low';
						timeH =has?'0':'2';
						timeM =has?'0':'30';
					}
				}else if (index==4) {
					if ($.inArray(0,rel)!= -1 || $.inArray(1,rel)!= -1) {
						timeM = has?'0':'10';
					}else{
						temp = has?'No Heat':'Medium';
						timeH =has?'0':'2';
						timeM =has?'0':'10';
					}
				}else if (index==5) {
					if ($.inArray(0,rel)!= -1) {
						timeH = has?'2':'1';
						timeM = has?'0':'30';
					}else if ($.inArray(1,rel)!= -1) {
						timeH = has?'1':'0';
						timeM = has?'0':'30';
					}else{
						temp = has?'No Heat':'Medium';
						timeH =has?'0':'1';
					}
				}else if (index==6) {
					if ($.inArray(0,rel)!= -1) {
						timeH = has?'2':'1';
						timeM = has?'0':'30';
					}else if ($.inArray(1,rel)!= -1) {
						timeH = has?'1':'0';
						timeM = has?'0':'30';
					}else{
						temp = has?'No Heat':'High';
						timeM =has?'0':'30';
					}
				}
				$(this).toggleClass('active');
				$(this).siblings('li:gt(1)').removeClass('active');
			}
			edit();
		})
	})
	function check(){
		var arr = [];
		$('.choose li').each(function(index){
			if ($(this).hasClass('active')) {
				arr.push(index);
			}
		})
		return arr;
	}
	var tempArr = ['No Heat','Low','Medium','High'];
	$('.next:first').on('click',function(){
		var curr = $.inArray(temp,tempArr);
		if (curr != tempArr.length-1) {
			temp = tempArr[curr+1];
		}
		$(this).addClass('clic').siblings().removeClass('clic');
		$('a:eq(1)').text(temp);
	})
	$('.prev:first').on('click',function(){
		var curr = $.inArray(temp,tempArr);
		if (curr != 0) {
			temp = tempArr[curr-1];
		}
		$(this).addClass('clic').siblings().removeClass('clic');
		$('a:eq(1)').text(temp);
	})
	$('.prev:last').on('click',function(){
		timeH = parseInt(timeH,10);
		timeM = parseInt(timeM,10);
		if (timeM != 0) {
			timeM = parseInt(timeM,10);
			timeM -= 5;
		}else if (timeH != 0) {
			timeM = '55';
			timeH = (parseInt(timeH,10)-1>0)?(parseInt(timeH,10)-1):'0'
		}
		$(this).addClass('clic').siblings().removeClass('clic');
		timeM = (timeM!=5&&timeM!=0)?timeM:'0'+timeM;
		$('a:eq(4)').text(timeH);
		$('a:eq(5)').text(timeM);
		return false;
	})
	$('.next:last').on('click',function(){
		timeH = parseInt(timeH,10);
		timeM = parseInt(timeM,10);
		if (timeH<2) {
			if (timeM<55) {
				timeM += 5;
				(timeM>10)
			}else{
				timeM = '00';
				++timeH;
			}
		}else{
			if (timeM != 30) {
				timeM += 5;
			}
		}
		$(this).addClass('clic').siblings().removeClass('clic');
		timeM = (timeM!=5)?timeM:'0'+timeM;
		$('a:eq(4)').text(timeH);
		$('a:eq(5)').text(timeM);
		return false;
	})
	$('.stop').click(function(){
		$('.choose li').removeClass('rest active');
		temp = 'No Heat';
		timeH = '0';
		timeM = timeS = '00';
		$(this).hide();
		$('.start').text('Start');
		edit();
		clearInterval(timer);
	})
	var timer;
	$('.start').click(function(){
		if (parseInt(timeH,10)||parseInt(timeM,10)||parseInt(timeS,10)) {
			if ($(this).text()=='Start' || $(this).text()=='Resume') {
				$('.stop').show();
				$(this).text('Pause');
				$('.choose li:not(.active)').addClass('rest');
				timer = setInterval(updateTime,1000/60);
				eidt();
			}else{
				$(this).text('Resume');
				clearInterval(timer);
			}
		}
	})
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
			$('.choose li').removeClass('rest active');
			$('.stop').hide();
			$('.start').text('Start');
			clearInterval(timer);
		}
		edit();
	}
	function edit(){
		timeM = parseInt(timeM,10);
		timeS = parseInt(timeS,10);
		timeM = (timeM>=10)?timeM:'0'+timeM;
		timeS = (timeS>=10)?timeS:'0'+timeS;
		$('a:eq(1)').text(temp);
		$('a:eq(4)').text(timeH);
		$('a:eq(5)').text(timeM);
		$('a:eq(6)').text(timeS);
	}
})