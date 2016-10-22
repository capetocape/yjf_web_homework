;(function($){
    var socket=io.connect();
    var validate_input = function(user_name,content)
    {   
        if(user_name =="")
        {
            alert("user name can not be blank!");
            return false;
        }
        if(content=="")
        {
            alert("article content can not be blank!");
            return false;
        }
        return true;
    }

    //listening on article number
    var content= document.getElementById("content");
    var calculate_input_num = function()
    {
        var surplus_num = 170 - content.value.length;
        $("#surplus_num").text(surplus_num);
    }
    content.oninput = calculate_input_num;

    content.onpropertychange = calculate_input_num;
    //submit article
    $("#article_sbm_btn").click(function(){
        {    
            var user_name = $("#user_name").val().trim(),
            content = $("#content").val().trim();
            if(validate_input(user_name,content))
            {
                var data = {"user_name":user_name,"content":content};
                socket.emit("post_article",data);
                $("#content").val("");
                $("#user_name").attr("disabled","disabled");
                calculate_input_num();
            }
        }
    });
    // when remote had new article publish
    socket.on("add_article",function(data)
    {
        var li = '<li>'+
                    '<span class="left_area"> <span class="avatar">'+data.user_name[0]+'</span></span>'+
                    '<span class="right_area">'+
                      ' <p class="user_name">'+data.user_name +'</p>'+
                       ' <p class="message_content">'+
                        data.content+'</p>'+             
                        '<p class="create_time">'+data.date+'</p>'+
                    '</span>'+
                '</li>';
        $(li).hide().prependTo($('#content_ul')).slideDown();
    });
})(jQuery);