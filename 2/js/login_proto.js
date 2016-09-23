;(function()
{
	//面向对象写法，真正引入html的
	
	var FormControl = function()
	{
		this.phone_display=document.getElementById("phone_display"),
		this.phone=document.getElementById("phone"),
		this.password1=document.getElementById("password1"),
		this.password2=document.getElementById("password2"),
		this.strenth_pointer=document.getElementById("strenth_pointer");
		this.phone.oninput = function()
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
		this.phone.onblur = function()
		{
			phone_display.style.display="none";

		};
		this.phone.onfocus = function()
		{
			phone_display.style.display="inline-block";

		};
		this.password1.oninput=function()
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
		this.password2.oninput=function()
		{
			if (password1.value !== password2.value) {
				password2.style.backgroundColor="#e11ac7";
			}
			else{
				password2.style.backgroundColor="#939393";
			}
		};

	};

	var form_control =new FormControl();
})();