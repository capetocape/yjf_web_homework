;(function()
{
	var phone_display=document.getElementById("phone_display"),
	phone=document.getElementById("phone");
		// 手机框输入同步显示功能
		phone.oninput = function()
		{
			var i=0,
			phone_num=phone.value,
			highlight_phone_num="";
			for(;i<phone_num.length;i++){
				if(isNaN(phone_num[i])){
					highlight_phone_num+="<span id='highlight'>"+phone_num[i]+"</span>";
				}
				else{
					highlight_phone_num+=phone_num[i];
				}

			}
			phone_display.innerHTML = highlight_phone_num;

		};
		phone.onblur = function()
		{
			phone_display.style.display="none";

		};
		phone.onfocus = function()
		{
			phone_display.style.display="inline-block";

		};

	//密码框强度显示功能
	var password1=document.getElementById("password1"),
	password2=document.getElementById("password2"),
	strenth_pointer=document.getElementById("strenth_pointer");

	password1.oninput=function()
	{
		var value=password1.value;
		var i=1,strenth=0;
		for(;i<value.length;i++){
			strenth+=Math.abs(value[i].charCodeAt()-value[i-1].charCodeAt());
		}
		if(strenth>100)
			strenth=100;
		strenth_pointer.style.left=strenth+"%";
	};

	// 密码比对
	password2.oninput=function()
	{
		if (password1.value !== password2.value) {
			password2.style.backgroundColor="#e11ac7";
		}
		else{
			password2.style.backgroundColor="#939393";
		}
	};

})();