$(document).ready(function(){
	var temp = parseInt($('#right1 li:eq(1)').find('span').eq(0).text(),10);
	$('#right1 li').each(function(index){
		$(this).click(function(){
			if (index==0) {
				temp = temp==0?temp=0:--temp;
			}else if (index==2) {
				temp = temp==15?temp=15:++temp;
			}else if (index==3) {
				temp = 5;
			}else if (index==4) {
				temp = 3;
			}else if (index==5) {
				temp = 0;
			}
			$('#right1 li:eq(1)').find('span').eq(0).text(temp);
			$(this).siblings().removeClass('selected');
		})
		if (index==0 || index==2) {
			$(this).bind({
				'mousedown':function(){
					$(this).addClass('selected');
					$(this).css('background-color','#222');
				},
				'mouseup':function(){
					$(this).css('background-color','#555555');
				}
			})
		}else if (index>=3) {
			$(this).bind({
				'mousedown':function(){
					$(this).addClass('selected');
					$(this).css('background-color','#6190B8');
				},
				'mouseup':function(){
					$(this).css('background-color','#6F90B8');
				}
			})
		}
	})
})