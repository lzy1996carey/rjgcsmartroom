$(document).ready(function(){
	var temp = parseInt($('.show span:eq(0)').text(),10),
		arrow = parseInt($('.show span:eq(2)').text(),10),
		currPower = 0,
		currFlow = 0,
		currModel = 0,
		isWorking = false;
	$('.show li').children().hide();
	$('.block a').toggle(function(){
		$(this).parent().animate({
			'top':820 + 'px'
		},1000,'linear');
		$('.control div').removeClass('clic');
	},function(){
		$(this).parent().animate({
			'top':538 + 'px'
		},1000,'linear');
		$('.control div').removeClass('clic');
	});
	$('.control div').each(function(index){
		if (index==0) {
			$(this).bind({
				'mousedown':function(){
					$(this).addClass('selected');
				},
				'mouseup':function(){
					$(this).removeClass('selected');
					if ($('.show span').css('display') == 'none') {
						$('.show li').children().show();
						isWorking = true;
					}else{
						$('.show li').children().hide();
						isWorking = false;
					}
				}
			})
		}else{
			$(this).click(function(){
				if (isWorking) {
					if (index==1) {
						temp = temp==30?30:++temp;
						$('.show span:eq(0)').text(temp);
					}else if (index==2) {
						temp = temp==10?10:--temp;
						$('.show span:eq(0)').text(temp);
					}else if (index==3) {
						if (currModel == 0) {
							$('.show img:eq(2)').attr('src','img/mode1Gray.png');
							currModel =1;
						}else{
							$('.show img:eq(2)').attr('src','img/mode0Gray.png');
							currModel = 0;
						}
					}else if (index==4) {
						if (currPower == 3) {
							currPower = 0;
						}else{
							++currPower;
						}
						$('.show img:eq(0)').attr('src','img/power'+currPower+'Gray.png');
					}else if (index==5) {
						arrow = arrow==60?60:++arrow;
						$('.show span:eq(2)').text(arrow);
					}else if (index==6) {
						arrow = arrow==40?40:--arrow;
						$('.show span:eq(2)').text(arrow);
					}else{
						if (currFlow == 3) {
							currFlow = 0;
						}else{
							++currFlow;
						}
						$('.show img:eq(1)').attr('src','img/flow'+currFlow+'Gray.png');
					}
					if (index>=3) {
						$(this).addClass('clic').parent().siblings().find('div').removeClass('clic');
					}
				}
			})
		}
	})
})