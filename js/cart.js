
$(function() {
	$.ajax({
		type: "get",
		url: "json/list_page.json",
		async: true,
		success: function(data) {
			var str = "";
			var arr =[];
			for(var i in data) {
				for(var j in data[i]) {
					arr.push(data[i][j]);
				}
			}
			if(getCookie("cart")) {
				var obj = JSON.parse(getCookie("cart"));
			} else {
				var obj = {};
			}
			var count = 0;
			var total_price =0;
			var one_price ;
			for(var i in obj){
				count ++ ;
				for( var j = 0 ; j<arr.length ; j++){
					if( i == arr[j].data_id){
						one_price =arr[j].price.split("¥")[1];
						
						total_price += one_price*Number(obj[i]) ; 
						str += "<li data_id='"+arr[j].data_id+"'><input type='checkbox' class='checked' checked='checked'><img src='img/"+arr[j].smallimg_src+"'><a><p>"+arr[j].title+"</p></a><div   data_id='"+arr[j].data_id+"'><span class='reduce_number'>-</span><input type='text'  value='"+obj[i]+"'><span class='add_number'>+</span></div><p>"+arr[j].price+"</p><a class='remove_goods' data_id='"+arr[j].data_id+"'>[删除]</a></li>"
					}
				}
			}
			$(".goods_kind").html(count);
			$("#cart_ul").html(str);
			$(".total_price").html(total_price);
			$(".add_number").click(function(){
				var num = Number($(this).prev().val());
				$(this).prev().val(++num);
				var data_id = $(this).parent().attr("data_id") ;
				obj[data_id] = num ;
				var str = JSON.stringify(obj);
				setCookie("cart",str,7);				
					for( var j = 0 ; j<arr.length ; j++){
						if( data_id == arr[j].data_id){
							one_price =arr[j].price.split("¥")[1];					
							total_price += Number(one_price);
						}
					}					
				$(".total_price").html(total_price);
			})
			$(".reduce_number").click(function(){
				var num = Number($(this).next().val());
				if( num == 1){
					$(this).next().val(num);
					return ;
				}
				$(this).next().val(--num);
				var data_id = $(this).parent().attr("data_id") ;
				obj[data_id] = num ;
				var str = JSON.stringify(obj);
				setCookie("cart",str,7);				
					for( var j = 0 ; j<arr.length ; j++){
						if( data_id == arr[j].data_id){
							one_price =arr[j].price.split("¥")[1];					
							total_price -= Number(one_price);
						}
					}					
				$(".total_price").html(total_price);
			});
			$(".remove_goods").click(function(){
				var data_id = $(this).attr("data_id") ;				
				$(this).parent().remove();
				count -- ;
				for( var j = 0 ; j<arr.length ; j++){
						if( data_id == arr[j].data_id){
							one_price =arr[j].price.split("¥")[1];					
							total_price -= Number(one_price)*Number(obj[data_id]);
						}
					}
				delete obj[data_id] ;
				var str = JSON.stringify(obj);
				setCookie("cart",str,7);
				$(".total_price").html(total_price);
				$(".goods_kind").html(count);
			})
			$(".all_select").click(function(){
				var flag =  $(this).prop("checked");
				$("body input[type=checkbox]").prop("checked",flag);
				if(!flag){
					$(".total_price").html(0);
				}else{
					$(".total_price").html(total_price);
				}
			})
			$(".checked").click(function(){
				var flag = $(this).prop("checked");
				var data_id = $(this).parent().attr("data_id") ; 
				for( var j = 0 ; j<arr.length ; j++){
						if( data_id == arr[j].data_id){
							one_price =arr[j].price.split("¥")[1];	
							if(!flag){
								total_price -= Number(one_price)*Number(obj[data_id]);
							}else{
								total_price += Number(one_price)*Number(obj[data_id]);
							}							
						}
					}
				$(".total_price").html(total_price);
			})
			$(".remove_selected").click(function(){
				$(".checked").each(function(){
					
					var flag = $(this).prop("checked"); 
					if(flag){
						
						var data_id = $(this).parent().attr("data_id") ;				
						$(this).parent().remove();
						count -- ;
						for( var j = 0 ; j<arr.length ; j++){
						if( data_id == arr[j].data_id){
							one_price =arr[j].price.split("¥")[1];					
							total_price -= Number(one_price)*Number(obj[data_id]);
						}
					}
						$(".total_price").html(0);						
						delete obj[data_id] ;
						var str = JSON.stringify(obj);
						setCookie("cart",str,7);						
					}					
				})
				$(".total_price").html(total_price);
						$(".goods_kind").html(count);
			})
		}
	});
})
