$(function(){
  $("#sortable").sortable({
    placeholder: "ui-sortable-placeholder",
    start: function(event, ui){
      ui.item.addClass("dragging"); // highlight dragged item
    },
    stop: function(event, ui){
      ui.item.removeClass("dragging"); // remove highlight after drop
    },
    update: function(event, ui){
      let order = $("#sortable").sortable("toArray", { attribute: "class" });
      console.log("New order:", order);
    }
  });
});
