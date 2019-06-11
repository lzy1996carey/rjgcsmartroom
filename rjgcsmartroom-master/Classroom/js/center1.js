$(document).ready(function(){
	var video = $('video')[0],
		vol,
		currLi = 0,
		timer;
	video.volume = 0.5;
	vol = video.volume * 100;
	$('.show a,.menu').click(function(){
		if ($('.menu').hasClass('active')) {
			$('.block').hide();
			$('.menu').removeClass('active');
		}else{
			$('.block').show();
			$('.menu').addClass('active');
		}
	});
	$('.show a').bind({
		'mousedown':function(){
			$(this).addClass('shadow');
		},
		'mouseup':function(){
			$(this).removeClass('shadow');
		}
	});
	$('.mute').toggle(function(){
		vol = video.volume*100;
		video.volume = 0;
		$(this).addClass('active');
		$('.block li').eq(3).find('a:eq(1)').text(0);
	},function(){
		video.volume = vol/100;
		$(this).removeClass('active');
		$('.block li').eq(3).find('a:eq(1)').text(vol);
	});
	$('.power').toggle(function(){
		video.pause();
		video.currentTime = 0;
		$(this).addClass('active');
	},function(){
		video.play();
		$(this).removeClass('active');
	});
	$('.volume a').each(function(index){
		$(this).click(function(){
			if (index==1) {
				vol = (vol==100)?100:++vol;
			}else{
				vol = (vol==0)?0:--vol;
			}
			video.volume = vol/100;
			$('.block li').eq(3).find('a:eq(1)').text(vol);
		}).bind({
			'mousedown':function(e){
				$(this).addClass('active');
			},
			'mouseup':function(){
				$(this).removeClass('active');
			}
		});
	});
	$('.block li').each(function(index){
		$(this).bind({
			'mouseover':function(){
				$(this).addClass('hov').siblings().removeClass('hov');
				currLi = index;
			}
		});
	})
	var posit = ['bottom','right','left','top'];
	$('.change li').each(function(index){
		$(this).click(function(){
			var $li = $('.block li').eq(currLi),
				change = $li.hasClass('change'),
				$span = $li.find('span:eq(1)');
			if (index == 0) {
				if (currLi == 0) {
					change?($span.text('Off')):($span.text('On'));
					if ($('.sub').hasClass('active')) {
						$('.sub').removeClass('active');
					}else{
						$('.sub').addClass('active');
					}
				}else if (currLi == 4) {
					change?($span.text('en')):($span.text('Change'));
				}
				change?($li.removeClass('change')):($li.addClass('change'))
			}else if (index == 1) {
				(currLi == 0)?(currLi = 4):(--currLi);
				$li.parent().find('li').eq(currLi).trigger('mouseover');
			}else if (index==4) {
				(currLi == 4)?(currLi = 0):(++currLi);
				$li.parent().find('li').eq(currLi).trigger('mouseover');
			}else if (index == 2) {
				if (currLi == 1) {
					$('.block li a:eq(0)').trigger('mousedown');
				}else if (currLi == 2) {
					$('.block li a:eq(3)').trigger('mousedown');
				}else if (currLi == 3) {
					$('.block li a:eq(6)').trigger('mousedown');
				}
			}else if (index == 3) {
				if (currLi == 1) {
					$('.block li a:eq(2)').trigger('mousedown');
				}else if (currLi == 2) {
					$('.block li a:eq(5)').trigger('mousedown');
				}else if (currLi == 3) {
					$('.block li a:eq(8)').trigger('mousedown');
				}
			}
		}).bind({
			'mousedown':function(e){
				if (index == 0) {
					$(this).css('background-color','#3A3A3A');
				}else{
					$(this).css('border-'+posit[index-1]+'-color','#3A3A3A');
				}
			},
			'mouseup':function(){
				if (index == 0) {
					$(this).css('background-color','#6C6969');
				}else{
					$(this).css('border-'+posit[index-1]+'-color','#6C6969');
				}
			}
		});
	});
	$('.block li').each(function(index){
		$(this).click(function(){
			$(this).addClass('selected').siblings().removeClass('selected');
			$(this).find('a').css('border', '2px solid  transparent');
			if (index==0 || index==4) {
				$('.change li').eq(0).trigger('click');
			}
		})
	})
	$('.block li a:eq(0)').bind({
		'mousedown':function(){
			$(this).css('border-color','#000');
			$('.block a:not(:eq(0))').css('border', '2px solid  transparent');
			adjust(1,0);
		}
	});
	$('.block li a:eq(2)').bind({
		'mousedown':function(){
			$(this).css('border-color','#000');
			$('.block a:not(:eq(2))').css('border', '2px solid  transparent');
			adjust(1,1);
		}
	});
	$('.block li a:eq(3)').bind({
		'mousedown':function(){
			$(this).css('border-color','#000');
			$('.block a:not(:eq(3))').css('border', '2px solid  transparent');
			adjust(2,0);
		}
	});
	$('.block li a:eq(5)').bind({
		'mousedown':function(){
			$(this).css('border-color','#000');
			$('.block a:not(:eq(5))').css('border', '2px solid  transparent');
			adjust(2,1);
		}
	});
	$('.block li a:eq(6)').bind({
		'mousedown':function(){
			$(this).css('border-color','#000');
			$('.block a:not(:eq(6))').css('border', '2px solid  transparent');
			adjust(3,0);
		}
	});
	$('.block li a:eq(8)').bind({
		'mousedown':function(){
			$(this).css('border-color','#000');
			$('.block a:not(:eq(8))').css('border', '2px solid  transparent');
			adjust(3,1);
		}
	});
	function adjust(i,j){
		var $that = $('.block li').eq(i);
		var Num = parseInt($that.find('a').eq(1).text(),10);
		if (j==0) {
			Num==0?Num:--Num;
			$that.find('a').eq(1).text(Num);
		}else{
			Num==100?Num:++Num;
			$that.find('a').eq(1).text(Num);
		}
		if (i==1) {
			if (Num>=50) {
				var adj = (Num-50)/50;
				$('.adjust').css('background-color','rgba(255,255,255,'+adj+')');
			}else if (Num<50) {
				var adj = (50 - Num)/50;
				$('.adjust').css('background-color','rgba(0,0,0,'+adj+')');
			}
		}else if (i==3) {
			video.volume = Num/100;
			vol = Num;
		}
	}
	$('.sub').click(function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.block li:eq(0)').find('span:eq(1)').text('Off');
		}else{
			$(this).addClass('active');
			$('.block li:eq(0)').find('span:eq(1)').text('On');
		}
	});
})