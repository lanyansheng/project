



$(function(){
	
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
	
	$(".province_show").hover(function(){
			$(".province").show();
			$(".province").mouseleave(function(){
				$(".province").hide();
			})
	})	
	
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
	})	