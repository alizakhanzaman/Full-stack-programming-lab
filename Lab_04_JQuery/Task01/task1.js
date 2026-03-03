$(document).ready(function(){
  $("#addBtn").click(function(){
    let item = $("#itemInput").val();
    if(item.trim() !== ""){
      $("#itemList").append(`<li>${item} <button class="deleteBtn">Delete</button></li>`);
      $("#itemInput").val("");
    }
  });

  $("#itemList").on("click", ".deleteBtn", function(){
    $(this).parent().fadeOut(300, function(){ $(this).remove(); });
  });
});
