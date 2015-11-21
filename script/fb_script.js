var user ={
    usrname:"",
    //email:""
};

window.fbAsyncInit = function() {
    FB.init({
        appId      : '925328200856188',
        xfbml      : true,
        version    : 'v2.5'
    });
    
    console.log(FB);
    
    var fb_btn = document.getElementById("fb_signup_button");
    
    fb_btn.onclick = function (){
        
        FB.login(function(resp){
           if(resp.status==="connected"){
               console.log("IN");
               FB.api("/me?fields=name,email", function(resp2){
                   
                   console.log(resp2);
                   
                   user.usrname =resp2.name;
                   //user.email = resp2.email;
                   console.log(user);
                   
                   $.ajax({
                       url:"./server/signup_session.php",
                       data:user,
                       type:"post",
                       dataType:"json",
                       success:function(resp3){
                           console.log(resp3);
                       },
                       error: function(jqXHR, textStatus, errorThrown) {
                           console.log(jqXHR.statusText, textStatus);
                      }
                   
                   });
               });
               
           } else if (resp.status ==="unknown") {
               alert("OUT");
           }
            
        });
        
        
    }
    
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));