


$(function(){
		var username = location.search;
		var  usernames=username.split("=")[1];
	if(getCookie("userId")){
		var obj = JSON.parse(getCookie("userId"));
		usernames = obj["usernames"] ;	
	}	
		if(usernames != "undefined"){	
			$usernames = decodeURI(usernames);
			$("#username_1").text($usernames);
			$(".suspend_personal_hide div").html("尊敬的 "+$usernames+" ,您好");
			$(".online_server_hide div").html("尊敬的 "+$usernames+" ,您好");
			$(".suspend_text_hide div").html("尊敬的 "+$usernames+" ,您好");
		}	
		if(getCookie("userId")) {
				var obj = JSON.parse(getCookie("userId"));
				obj["usernames"] = usernames ;
				var str = JSON.stringify(obj);
				setCookie("userId",str,7) ; 
			} else {
				var obj = {};
				obj["usernames"] = usernames ;
				var str = JSON.stringify(obj);
				setCookie("userId",str,7) ;
			}
			
	/*-----------------------------------------------------------------------*/		
	$.ajax({
		type:"get",
		url:"json/list_page.json",
		async:true,
		success:function(data){
			var arr=[];
			var str="";
			console.log(data);
			for(var i in data){
				arr.push(data[i]);
				str += "<div class='listpage_detail'><a href='detailpage.html?id="+data[i][0].data_id+"&username="+usernames+"'><img class='big_img' src='img/"+data[i][0].bigimg_src+"'></a><div>";
				for(var j = 0 ; j < data[i].length ; j++){
					str += "<img class='hover_change' src='img/"+data[i][j].smallimg_src+"'>" ; 
				}
				str += "</div><div><p>"+data[i][0].title+"</p><span>"+data[i][0].oldprice+"</span><span>"+data[i][0].price+"</span></div></div>" ;
			}
			$(".content_test").html(str);
			$(".hover_change").hover(function(){
				var index = $(this).parent().parent().index();
				var index1 = $(this).index() ;			
			//	console.log($(this).parent().parent().children().eq(2));
				var str1 = "";
				$(this).parent().parent().children().eq(0).attr("href","detailpage.html?id="+arr[index][index1].data_id+"").children().attr("src","img/"+arr[index][index1].bigimg_src+"");
				
				$(this).parent().parent().children().eq(2).children().eq(0).text(arr[index][index1].title);
				$(this).parent().parent().children().eq(2).children().eq(1).text(arr[index][index1].oldprice);
				$(this).parent().parent().children().eq(2).children().eq(2).text(arr[index][index1].price);
			})
		}
	});
	
	/*----------------------------悬浮框操作-------------------------------------*/
		$.ajax({
			type:"get",
			url:"json/list_page.json",
			async:true,
			success:function(data){
				console.log(data);
				var arr = [] ;
				var str = "" ;			
				var dataId ;
				for(var i in data){
				for( var j in data[i]){
					arr.push(data[i][j]);
					}				
				}
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
			str1 +="<a href='cart.html?usernames="+usernames+"'>立即结算!</a>" ;
			$("#cartbox").html(str1);
		//	$(".suspend_cart_num span").html(count);
		$(".cart_goods_num").html(count);
//			$("#add_cart").click(function(){
//				obj[dataId] = $(".goods_num").val();
//				var str = JSON.stringify(obj);
//				setCookie("cart",str,7);
//				var count = 0 ;
//				var str1="" ;
//				for(var i in obj){
//					count += Number(obj[i]) ; 
//					for(j=0;j<arr.length;j++){					
//					if(i == arr[j].data_id ){
//							str1 += "<div><img src='img/"+arr[j].smallimg_src+"'><p>"+arr[j].title+"</p><span>"+arr[j].price+"</span><span>"+obj[i]+"件</span></div>" ;
//						}	
//					}
//					str1 +="<a href=''>立即结算!</a>" ;
//				}
//				$(".suspend_cart_num span").text(count);
//					$("#cartbox").html(str1);
//			})	
		}
		});
		
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
	/*-------------------------------登录---------------------------*/
//	if(usernames !=undefined){	
//		$("#username_1").text(usernames);
//	}
	$(".shopping_cart").click(function(){
			location.href = "cart.html";
		})
});
