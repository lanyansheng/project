


//$(function(){
//	$.ajax({
//		type:"get",
//		url:"json/detailpage.json",
//		async:true,
//		success:function(data){
//			console.log(data);
//			var str = "" ;
//				str += "<div><img class='mid_image' src='img/"+data["list1"][0]["bigimg_src"]+"'><div>";
//				for(var j = 0 ; j< data["list1"].length ; j++){
//					str += "<img src='img/"+data["list1"][j].smallimg_src+"'>" ;
//				}
//				str += "</div></div>";
//				$(".detailpage_image").html(str);
//		}
//	});
//})

$(function(){
	var idnum = location.search;
	var proId = idnum.split("=")[1];
	console.log(proId);
	var count = 0 ;
	$.ajax({
		type:"get",
		url:"json/list_page.json",
		async:true,
		success:function(data){
			//console.log(data);
			var arr = [] ;
			var str = "" ;			
			var dataId ;
			for(var i in data){
				for( var j in data[i]){
					arr.push(data[i][j]);
				}				
			}
			for(var i = 0 ; i <arr.length ; i++){
				if(proId == arr[i].data_id){
					dataId = arr[i].data_id ;
					str += "<div class='mid_area'><img class='mid_image' src='img/"+arr[i].bigimg_src+"'><div class='zoom'></div></div><div class='big_Area'><img class='big_image' src='img/"+arr[i].bigimg_src+"'></div><div><p>"+arr[i].title+"</p><span>"+arr[i].oldprice+"</span><span>"+arr[i].price+"</span></div>";
					$(".detailpage_image").html(str);
				}
			}
			$(".mid_area").mousemove(function(e){     //在中间区域鼠标移动事件
				
					var evt = e || event ;
					$(".zoom").show();
					$(".big_Area").show();
					var zoom = $(".zoom") ;
					var x = evt.pageX - $(this).parent().parent().position().left - $(".zoom").outerWidth()/2 -50;
					var y = evt.pageY - $(this).parent().parent().position().top - $(".zoom").outerHeight()/2 -50;
					if(x <= 0 ){
						x = 0 ;
					}
					if(y <= 0 ){
						y = 0 ;
					}
					if(x >= $(this).outerWidth()-$(".zoom").outerWidth()-50){
						x = $(this).outerWidth()-$(".zoom").outerWidth()-50 ;
					}
					if(y >= $(this).outerHeight()-$(".zoom").outerHeight()){
						y = $(this).outerHeight()-$(".zoom").outerHeight() ;
					}
					$(".zoom").css({"left":x+"px","top":y+"px"}) ;
					console.log($(".mid_area").outerWidth());
					$(".big_Area img").css({"left":-zoom.position().left/ $(".mid_area").outerWidth()*$(".big_Area img").outerWidth()+"px","top":-zoom.position().top/$(".mid_area").outerHeight()*$(".big_Area img").outerHeight()+"px"})
		})
			$(".mid_area").mouseleave(function(){
				$(".zoom").hide();
					$(".big_Area").hide();
			})
			if(getCookie("cart")){
                   	var obj = JSON.parse(getCookie("cart"));
                   }
                   else{
                   	 var obj={};
                   }			
                   var count = 0 ;
               var str1 = "" ;    
			for( var i in obj){		
				count += Number(obj[i]) ;				
				for(j=0;j<arr.length;j++){					
					if(i == arr[j].data_id ){
							str1 += "<div><img src='img/"+arr[j].smallimg_src+"'><p>"+arr[j].title+"</p><span>"+arr[j].price+"</span><span>"+obj[i]+"件</span></div>" ;
					}	
				}				
			}
			str1 +="<a href=''>立即结算!</a>" ;
			$("#cartbox").html(str1);
			$(".suspend_cart_num span").html(count);
			$(".cart_goods_num").html(count);	
			$("#add_cart").click(function(){
				obj[dataId] = $(".goods_num").val();
				var str = JSON.stringify(obj);
				setCookie("cart",str,7);
				var count = 0 ;
				var str1="" ;
				for(var i in obj){
					count += Number(obj[i]) ; 
					for(j=0;j<arr.length;j++){					
					if(i == arr[j].data_id ){
							str1 += "<div><img src='img/"+arr[j].smallimg_src+"'><p>"+arr[j].title+"</p><span>"+arr[j].price+"</span><span>"+obj[i]+"件</span></div>" ;
						}	
					}
					
				}
				str1 +="<a href='cart.html'>立即结算!</a>" ;
			//	$(".suspend_cart_num span").text(count);
					$(".cart_goods_num").html(count);	
					$("#cartbox").html(str1);
					
			})						
	}
		
})
	
	/*---------------------------悬浮窗口效果----------------------------*/
	$(".suspend_personal").hover(function(){
		$(".suspend_personal_hide").show();
	},function(){
		$(".suspend_personal_hide").hide();
	});
	$(".suspend_cart").hover(function(){
		$("#cartbox").show();
	},function(){
		$("#cartbox").hide();
	});
	$("#cartbox").mousemove(function(){
		$("#cartbox").show();
	});
	$("#cartbox").mouseleave(function(){
		$("#cartbox").hide();
	});
	$(".online_server").hover(function(){
		$(".online_server_hide").show();
	},function(){
		$(".online_server_hide").hide();
	});
	$(".suspend_text").hover(function(){
		$(".suspend_text_hide").show();
	},function(){
		$(".suspend_text_hide").hide();
	});
	$(".return_top").hover(function(){
		$(".return_top div").animate({"opacity":1,"right":35},1000);
	},function(){
		$(".return_top div").animate({"opacity":0,"right":80},1000);
	});
	$(".return_top>a").click(function(){
		
		$("html,body").animate({"scrollTop":0},1000);
	})
	
	/*------------------------------购物车-----------------------------*/
	var num = 1;
	$(".add_num").click(function(e){
		var evt = e || event ;
		evt.preventDefault();
		$(".goods_num").val(++num);
		
	})
	$(".reduce_num").click(function(e){
		var evt = e || event ;
		evt.preventDefault();
		if(num == 1){
			$(".goods_num").val(num);
			return;
		}
		$(".goods_num").val(--num);			
	})	
	
});	
