$(document).ready(function(){
  $("#registerForm input").on("blur", function(){
    if($(this).val().trim() === ""){
      $(this).addClass("error");
    } else {
      $(this).removeClass("error");
    }
  });

  $("#registerForm").on("submit", function(e){
    e.preventDefault();
    let valid = true;
    $("#registerForm input").each(function(){
      if($(this).val().trim() === ""){
        $(this).addClass("error");
        valid = false;
      }
    });
   
    if(valid){
      $("#formMessage").css("color","#1a2a6c").text("✅ Account created successfully!");
    } else {
      $("#formMessage").css("color","crimson").text("❌ Please fill all fields correctly.");
    }
  });
});
