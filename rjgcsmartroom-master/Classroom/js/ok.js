$(document).ready(function(){
	$('#ok area').each(function(index){
		$(this).hover(function(){
			$('#ok li').eq(index).show();
		},function(){
			$('#ok li').eq(index).hide();
		});
/*		$(this).click(function(){
			alert('hh');
			$('#ok img').attr('src','img/'+$(this).attr('alt')+'.gif');
			$('#ok li').remove();
			$('#ok area').remove();
			updateMap(index);
			return false;
		})
*/
	})
/*	var updateMap = function(index){
		var coord = [];
		switch(index) {
			case 0:
				coord[0] = {
						coords:"200,112,144,180,175,260,238,296,245,282,236,232,276,168,275,142",
						alt:"left1"
					};
				coord[1] = {
						coords:"290,148,240,230,256,306,330,345,374,275,382,190",
						alt:"left2"
					};
				break;
			case 1:
				coord[0] = {
						coords:"305,75,305,150,436,215,445,130",
						alt:"center1"
					};
				coord[1] = {
						coords:"356,0,400,0,445,15,440,62,356,35",
						alt:"center2"
					};
				break;
			case 2:
				coord[0] = {
						coords:"42,106,126,50,154,235,82,282",
						alt:"right1"
					};
				coord[1] = {
						coords:"442,145,536,166,520,278,430,250",
						alt:"right2"
					};
				break;
		}
		for (var i = 0; i < coord.length; i++) {
			$('#ok map').append('<area shape="poly" coords="'+coord[i].coords+'" alt="'+coord[i].alt+'" />');	
			$('#ok ul').show().append('<li>'+coord[i].alt+'</li>');
		}
	}
*/

})