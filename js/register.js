

/*---------------------------注册---------------------------*/
$(function(){
	var flag_1 = 0 ;
	var flag_2 = 0 ;
	var flag_3 = 0 ;
	var flag_4 = 0 ;
	var flag_5 = 0 ;
	var flag_6 = 0 ;
	$(".register_content input").blur(function(){
		var num = $(this).attr("id");
		
		
		if( num == "phone"){
			var reg = /^[1-3]\d{10}$/ ;
			if(!reg.test($(this).val())){
				$(".phone_error").show().next().hide();
				flag_1 = 0 ;
			}else{
				$(".phone_error").hide().next().show();
				flag_1 = 1 ;
			}
		}
		if(num == "verify"){
			if($(this).val() != $(".register_verifycode span").text()){
				$(".verify_error").show().next().hide();
				flag_2 = 0 ;
			}else{
				$(".verify_error").hide().next().show();
				flag_2 = 1 ;
			}
		}
		if(num == "note") {
			if(($(this).val() == $(".register_note>a>span").text()) && ($(this).val() != "获取验证码")) 	{
				$(".note_error").hide().next().show();
				$(".register_note>a>span").text("获取验证码");
				flag_3 = 1 ;
		
			} else {
				$(".note_error").show().next().hide();
				$(".register_note>a>span").text("获取验证码");
				flag_3 = 0 ;
			}
		}
		if(num == "username"){
			var reg = /^[a-zA-Z_\u4e00-\u9fa5][a-zA-Z_0-9\u4e00-\u9fa5]{3,19}$/ ;
			if(!reg.test($(this).val())){
				$(".username_error").show().next().hide();
				flag_4 = 0 ;
			}else{
				$(".username_error").hide().next().show();	
				flag_4 = 1 ;
			}
		}
		if(num == "password"){
			var reg = /^[a-zA-Z_]\w{7,19}$/ ;
			if(!reg.test($(this).val())){
				$(".password_error").show().next().hide();
				flag_5 = 0 ;
			}else{
				$(".password_error").hide().next().show();
				flag_5 = 1 ;
			}
		}
		if(num == "confirmpw"){
			if(($(this).val() == $("#password").val()) && ($(this).val() != "")){				
				$(".confirmpw_error").hide().next().show();
				flag_6 = 1 ;
			}else{
				$(".confirmpw_error").show().next().hide();	
				flag_6 = 0 ;
			}
		}
		if($("#check").prop("checked") == true){
			
			if((flag_1 == 1) && (flag_2 == 1) && (flag_3 == 1) && (flag_4 == 1) && (flag_5 == 1) && (flag_6 == 1)){
				$("#register_btn").css({"background":"#33cb98","color":"#fff"});
			}
		}
	});
	$(".register_verifycode a").click(function(){
		random();
	});
	function random(){
		var arr = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
		var str = "";
		var num  ;
		for(var i = 0 ; i <= 3 ; i++){
			 num = Math.floor(Math.random()*arr.length) ;			
			 str += arr[num] ;
		}
		$(".register_verifycode span").html(str) ;
	}
	random();
	$(".register_note>a").click(function(){
		var str = "";
		for(var i = 0 ; i <=5 ; i++){
			str += Math.floor(Math.random()*10);
		}
		$(".register_note>a>span").html(str) ;
	});
	
	/*-------------------------后台------------------------------*/
	$("#register_btn").click(function(){	
		console.log("aaa");
		$.getJSON("http://datainfo.duapp.com/shopdata/userinfo.php",{status:"register",userID:$("#username").val(),password:$("#password").val()},function(data){
			if(data == 1){
				location.href = "login.html" ;
			}
		})
	})
})
