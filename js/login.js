

/*-----------------------------登录--------------------------------------*/
$(function(){
	$(".dynamic_login").click(function(){
		$(".login_input").css("height","201px").parent().css("height","460px");
		$(".dynamic_code").show();
		$(this).css("border-bottom","1px solid #33cb98").siblings().css("border-bottom","1px solid #ddd");
		$(".login_phone>span").css({"background":"url(img/login_ico.png) no-repeat 0 -37px"}).next().val("已注册的手机号");
		$(".login_password>span").css({"background":"url(img/login_ico.png) no-repeat 0 -68px"}).next().val("验证码").css({"width":"150px"}).next().show().parent().css({"width":"197px"});
	});
	
	
	$(".normal_login").click(function(){
		$(".login_input").css("height","134px").parent().css("height","393px");
		$(this).css("border-bottom","1px solid #33cb98").siblings().css("border-bottom","1px solid #ddd");
		$(".login_phone>span").css({"background":"url(img/ico.png) no-repeat 0 0"}).next().val("手机号/邮箱/用户名");
		$(".login_password>span").css({"background":"url(img/ico.png) no-repeat 0 -28px"}).next().val("密码");
	});
	
	
	
	$(".verify_code").click(function(){
	random();	
});
	$(".dynamic_code_click").click(function(){
		var str = "";
		for(var i = 0 ; i <=5 ; i++){
			str += Math.floor(Math.random()*10);
		}
		$(this).html(str) ;
	})

function random(){
		var arr = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
		var str = "";
		var num  ;
		for(var i = 0 ; i <= 3 ; i++){
			 num = Math.floor(Math.random()*arr.length) ;			
			 str += arr[num] ;
		}
		$(".login_password>div").html(str) ;
	}
random();


/*--------------------------后台-------------------------------------------*/

		$("#login_btn").click(function(){
			$.getJSON("http://datainfo.duapp.com/shopdata/userinfo.php",{status:"login",userID:$("#login_phone").val(),password:$("#login_password").val()},function(data){				
				console.log(data);
				if(data[1] == $("#login_phone").val() && $("#login_phone").val() != ""){
					location.href = "home.html?username="+$("#login_phone").val()+"" ;
				}else if (data == 0){
					alert("用户名不存在");
				}else{
					alert("用户名密码不符");
				}
			})
		})

});



