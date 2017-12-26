$(function(){
		
		var username = location.search;
		var  usernames= username.split("=")[1];
		$(".htop_content_right         li:nth-of-type(2)").hover(function(){
			$(".htop_content .qrCode").show();   //顶部数据
		})
		$(".htop_content_right li:nth-of-type(2)").mouseleave(function(){
			$(".htop_content .qrCode").hide();
		})
		$(".htop_content_right li:nth-of-type(3)").hover(function(){
			$(".htop_content_right div:nth-of-type(2)").show();
		})
		$(".htop_content_right li:nth-of-type(3)").mouseleave(function(){
			$(".htop_content_right div:nth-of-type(2)").hide();
		})
		$(".htop_content_right li:nth-of-type(4)").hover(function(){
			$(".htop_content_right div:nth-of-type(3)").show();
		})
		$(".htop_content_right li:nth-of-type(4)").mouseleave(function(){
			$(".htop_content_right div:nth-of-type(3)").hide();
		})
		$(".myfavorite").hover(function(){
			$(this).show();
		},function(){
			$(this).hide();
		});
		$(".myclub").hover(function(){
			$(this).show();
		},function(){
			$(this).hide();
		});
	$.ajax({                         //省份调用
		type:"get",
		url:"json/data_map.json",
		async:true,
		success:function(data){
			var str="";
			
			for(var i = 0 ; i<data.length ;i++ ){
				str+="<li><a>"+data[i]+"</a></li>";
				
			}
			$(".province").append(str);
			
			$(".province li").click(function(){
			$(this).css("background","skyblue").siblings().css("background","#fff");				
			$(this).children().css("color","#fff").parent().siblings().children().css("color","#000");
			$(".province_show").text($(this).children().html());
			$(".province").hide();
		})			
		}		
	});
	$(".province_show").hover(function(){
			$(".province").show();
			$(".province").mouseleave(function(){
				$(".province").hide();
			})
	})
	$(".search_content").on("input",function(){    //搜索框搜索
					$(".search_list").show();					
					$.ajax({
						type: "get",
						url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" +$(".search_content").val()+ "&cb=?",
						async: true,
						dataType: "jsonp",
						scriptCharset: "gbk",
						success: function(data) {							
							var data = data.s ;							
							var html = "";
							for(var i=0 ;i<data.length;i++){
								html += "<li>"+data[i]+"</li>" ;
							}
							$(".search_list").html(html);							
							$(".search_list li").click(function(){
								var val = $(this).text() ;								
								$(".search_content").val(val);
							$(".search_list").hide();
		
					})
						}
					})					
			})
	

		$.ajax({ // nav列表
			type: "get",
			url: "json/nav.json",
			async: true,
			success: function(data) {
					var str = "";
					for(var i in data) {
						str += "<li><a>" + data[i].title1 + "</a><span>" + data[i].num1 + "</span><a>" + data[i].title2 + "</a><span>" + data[i].num2 + "</span></li>"
					}
					$(".data_list").html(str);
					$(".data_list li").hover(function() {
								
								if($(this).index() == 0 || $(this).index() == 3){
									var dat = "data1" ;
								}else if($(this).index() == 1 || $(this).index() == 4){
									var dat = "data2" ;
								}else{
									var dat = "data3" ;
								}
								$(".data_list_detail").show();
								$.ajax({
									type: "get",
									url: "json/list.json",
									async: true,
									success: function(data) {
										var str = "";
										var str1 = "";
										var index = 0;
										for(var i in data[dat]) {
											str += "<li><a>" + data[dat][i].title + "</a><img src='img/" + data[dat][i].src + "'><ul class='datalist_ul'></ul></li>"
										}
										$(".data_list_detail").html(str);
										for(var i in data[dat]) {
											for(var j in data[dat][i]["content"]) {
												
												str1 += "<li><a>" + data[dat][i]["content"][j] + "</a></li>";
											}
											$(".datalist_ul").eq(index).html(str1);
											str1 = "";
											index++;
										}
									}
								});
					})
				$(".shopping_list").mouseleave(function(){
					$(".data_list_detail").hide();
				})
			}
			
		});
/*------------------------轮播------------------------------------*/	
	var index = 0 ;   
	var arr = ["#f0aa65","#e4c597","#9d7a26","#36a2d0","#ffcccc"];
	$(".lunbo li").eq(0).fadeIn().siblings().fadeOut();
	$(".click_num li").eq(0).css({"background":"#fff","color":"#000"});
	setInterval(function(){
		index++;	
		if(index>=5){
			index = 0 ;
		}
		$(".lunbo li").eq(index).fadeIn().siblings().fadeOut();
		$(".click_num li").eq(index).css({"background":"#fff","color":"#000"}).siblings().css({"background":"#999","color":"#fff"});
		$("#banner").css("background",arr[index]);
		//$(".nav>ul li").eq(0).css("background",arr[index]);
		$(".nav>ul>li").eq(1).css("background",arr[index]);
	},2000) ;
	$(".click_num li").click(function(){		
	$(".click_num li").eq($(this).text()-1).css({"background":"#fff","color":"#000"}).siblings().css({"background":"#999","color":"#fff"});
	$(".lunbo li").eq($(this).text()-1).fadeIn().siblings().fadeOut();
	index = $(this).text()-1;
});
 $(".click_num li").hover(function(){
 	$(".click_num li").eq($(this).text()-1).css({"background":"#fff","color":"#000"}).siblings().css({"background":"#999","color":"#fff"});
	$(".lunbo li").eq($(this).text()-1).fadeIn().siblings().fadeOut();
	index = $(this).text()-1;
 })

/*-----------------------------banner右侧-----------------------*/
$(".banner_right img").hover(function(){
	$(this).animate({"left":0},500) ;
	
},function(){
	$(this).animate({"left":20},500) ;
})
	
/*----------------------------------秒杀----------------------*/
setInterval(function(){
	
 var odata = new Date() ; 
 var odata1 = new Date("2017/12/22 12:30:0") ; 
 var sec_time = dateUtil.Date_Diff_Days(odata,odata1);
 $(".sec_time_count").html(sec_time);
 var hour = odata1.getHours();
 var minute = odata1.getMinutes();
 var times = " "+hour+":"+minute+" ";
 $(".sec_time").html(times);
},1000) ;
/*-----------------------秒杀商品--------------------------*/
action_time();
function action_time(){
	var oDiv =document.getElementsByClassName("action_time1")[0];
 	var oDate = new Date();
 	var hour = oDate.getHours();
 	var str="";
 	var count = "";
 	
 	for(var i = 12 ; i <=24 ; i ++ ){
 		if( i < hour){
 			count = "已结束！" ;
 			
 		}else if (i == hour){
 			count = "正在进行!" ; 
   			$(".action_goods li input").val("已抢光！");   			
 		}else{
 			count = "即将开始！" ;
 			$(".action_goods li input").val("提醒我！");
 		}
 		
 		str += "<div><p>"+i+":00</p><span>"+count+"</span></div>" ;
 		
 	}
 		oDiv.innerHTML = str;	
 }

	$(".action_time_left").click(function(){
			if($(".action_time1").position().left < 0){	
			var Left = $(".action_time1").position().left +110 ;
			$(".action_time1").css("left"," "+Left+"px");
		}
	})
	$(".action_time_right").click(function(){
		if($(".action_time1").position().left > -550){
			var Right = $(".action_time1").position().left -110 ;
			$(".action_time1").css("left"," "+Right+"px");
		}
	})
	$.ajax({
			type:"get",
			url:"json/sec_kill.json",
			async:true,
			success:function(data){
				var arr=[];
				for(var i in data){
					arr.push(data[i]);
				}
				var count = 0;
				var str = "";
				str += "<li><a href='listpage.html'><img src='img/"+arr[count]["list1"].img+"'></a><p>"+arr[count]["list1"].title+"</p><span>"+arr[count]["list1"].price+"</span><span>"+arr[count]["list1"].oldprice+"</span><input type='button' value='已结束'></li><li><a href='listpage.html'><img src='img/"+arr[count]["list2"].img+"'></a><p>"+arr[count]["list2"].title+"</p><span>"+arr[count]["list2"].price+"</span><span>"+arr[count]["list2"].oldprice+"</span><input type='button' value='已结束'></li><li><a href='listpage.html'><img src='img/"+arr[count]["list3"].img+"'></a><p>"+arr[count]["list3"].title+"</p><span>"+arr[count]["list3"].price+"</span><span>"+arr[count]["list3"].oldprice+"</span><input type='button' value='已结束'></li><li><a href='listpage.html'><img src='img/"+arr[count]["list4"].img+"'></a><p>"+arr[count]["list4"].title+"</p><span>"+arr[count]["list4"].price+"</span><span>"+arr[count]["list4"].oldprice+"</span><input type='button' value='已结束'></li>";
				$(".action_goods").html(str);
				$(".action_goods li img").hover(function(){
					$(this).animate({"top":-20},500) ;
				},function(){
					$(this).animate({"top":0},500) ;
				})
									
			}
		});
	$(".action_time1 div").hover(function(){
		$(this).css({"color":"#f67","font-size":"18px"}).siblings().css({"color":"#999","font-size":"12px"});
		var states = $(this).find("span").text() ;
		var _this = this ;
		$.ajax({
			type:"get",
			url:"json/sec_kill.json",
			async:true,
			success:function(data){
				var arr=[];
				for(var i in data){
					arr.push(data[i]);
				}
				var count = $(_this).index();
				var str = "";
				str += "<li><a href='listpage.html'><img src='img/"+arr[count]["list1"].img+"'></a><p>"+arr[count]["list1"].title+"</p><span>"+arr[count]["list1"].price+"</span><span>"+arr[count]["list1"].oldprice+"</span><input type='button' value="+states+"></li><li><a href='listpage.html'><img src='img/"+arr[count]["list2"].img+"'></a><p>"+arr[count]["list2"].title+"</p><span>"+arr[count]["list2"].price+"</span><span>"+arr[count]["list2"].oldprice+"</span><input type='button' value="+states+"></li><li><a href='listpage.html'><img src='img/"+arr[count]["list3"].img+"'></a><p>"+arr[count]["list3"].title+"</p><span>"+arr[count]["list3"].price+"</span><span>"+arr[count]["list3"].oldprice+"</span><input type='button' value="+states+"></li><li><a href='listpage.html'><img src='img/"+arr[count]["list4"].img+"'></a><p>"+arr[count]["list4"].title+"</p><span>"+arr[count]["list4"].price+"</span><span>"+arr[count]["list4"].oldprice+"</span><input type='button' value="+states+"></li>";
				$(".action_goods").html(str);
				$(".action_goods li img").hover(function(){
					$(this).animate({"top":-20},500) ;
				},function(){
					$(this).animate({"top":0},500) ;
				})
				$(".action_goods li input").css({"border":"none"});
				if($(".action_goods li input").val() != "已结束"){
					$(".action_goods li input").css({"background":"#e96c27","color":"#fff"});
				}
				$(".action_goods li input").click(function(){
					location.href = "listpage.html" ;
				})
			}
		});
	})

	/*---------------------------------------热门食物--------------------------------------*/
function hot_food(){	
	$.ajax({
		type:"get",
		url:"json/dogfood.json",
		async:true,
		success:function(data){
			var str = "";	
				str += 	"<a href='listpage.html?username="+usernames+"'><div class='div_style_1' style='background:url(img/"+data["ul_0"]["list1"].src+")'><p>"+data["ul_0"]["list1"].title+"</p><span>"+data["ul_0"]["list1"].content+"</span></div></a><a href='listpage.html?username="+usernames+"'><div class='div_style_2' style='background:url(img/"+data["ul_0"]["list2"].src+")'><p>"+data["ul_0"]["list2"].title+"</p><span>"+data["ul_0"]["list2"].content+"</span></div></a><a href='listpage.html?username="+usernames+"'><div class='div_style_2' style='background:url(img/"+data["ul_0"]["list3"].src+")'><p>"+data["ul_0"]["list3"].title+"</p><span>"+data["ul_0"]["list3"].content+"</span></div></a><a href='listpage.html?username="+usernames+"'><div class='div_style_3' style='background:url(img/"+data["ul_0"]["list4"].src+")'><p>"+data["ul_0"]["list4"].title+"</p><span>"+data["ul_0"]["list4"].content+"</span></div></a><a href='listpage.html?username="+usernames+"'><div class='div_style_3' style='background:url(img/"+data["ul_0"]["list5"].src+")'><p>"+data["ul_0"]["list5"].title+"</p><span>"+data["ul_0"]["list5"].content+"</span></div></a><a href='listpage.html?username="+usernames+"'><div class='div_style_3' style='background:url(img/"+data["ul_0"]["list6"].src+")'><p>"+data["ul_0"]["list6"].title+"</p><span>"+data["ul_0"]["list6"].content+"</span></div></a>";
			
			$(".dfarea_content_right").html(str);
			$(".dfarea_content_right>a").hover(function(){
				
				$(this).children().animate({"background-position-X":-20},500);
			},function(){
				$(this).children().animate({"background-position-X":0},500);
			})
		}
	});
}
hot_food();
	$(".dfarea_header_ul>li").hover(function(){		
		var _this = this ;
		$(this).addClass("dfareali_style").siblings().removeClass("dfareali_style");
		if($(this).index() != 0){
			$.ajax({
				type:"get",
				url:"json/dogfood.json",
				async:true,
				success:function(data){
					var arr = [] ;
					var str = "" ;
					for(var i in data){
						arr.push(data[i]);
					}
					var count = $(_this).index() ;
					for(var i in arr[count]){						
							str += "<div class='div_style_4'><a href='listpage.html'><img src='img/"+arr[count][i].img+"'></a><a href=''><p>"+arr[count][i].title+"</p></a><span>"+arr[count][i].price+"</span></div>"						
					}
					$(".dfarea_content_right").html(str);
					$(".div_style_4 img").hover(function(){
						$(this).animate({"top":0},300);
					},function(){
						$(this).animate({"top":10},300);
					})
				}
			});
		}else{
			hot_food();
		}
	});
	$(".footer_top_ul li ").hover(function(){
		$(this).animate({"top":5},500);
	//	$(".footer_top_ul li>a").animate({"color":"red"},500);
	},function(){
		$(this).animate({"top":20},500);
	});
	$.ajax({
		type:"get",
		url:"json/friendlylink.json",
		async:true,
		success:function(data){
			var str = "";
			for(var i = 0 ; i< data.length ; i ++){
				str += "<a href=''>"+data[i]+"</a>" ;
			}
			$(".friendly_link").html(str) ;
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
	
	/*----------------------登录---------------------------------------*/
	
	if(usernames !=""){	
		$("#username_1").text(usernames);
	}
	
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
			str1 +="<a href='cart.html'>立即结算!</a>" ;
			$("#cartbox").html(str1);
		
		//	$(".suspend_cart_num span").html(count);
			$(".cart_goods_num").html(count);
			$("#add_cart").click(function(){
				obj[dataId] = $(".goods_num").val();
				var str = JSON.stringify(obj);
				setCookie("cart",str,7);
				var count = 0 ;
				for(var i in obj){
					count += Number(obj[i]) ; 
				}
				$(".suspend_cart_num span").text(count);
			})	
			}
		});
});

 


 

	
