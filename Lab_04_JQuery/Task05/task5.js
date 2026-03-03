$(document).ready(function(){

    $("#small").click(function(){
        $("#editableText").css("font-size","16px");
    });

    $("#large").click(function(){
        $("#editableText").css("font-size","28px");
    });

    $("#color").click(function(){
        $("#editableText").css("color","#80c520");
    });

    $("#bg").click(function(){
        $("#editableText").css("background","#000000").css("padding","10px");
    });

    $("#bold").click(function(){
        $("#editableText").toggleClass("boldStyle");
    });

    $("#italic").click(function(){
        $("#editableText").toggleClass("italicStyle");
    });

    $("#reset").click(function(){
        $("#editableText")
            .removeClass("boldStyle italicStyle") 
            .css({
                "font-size":"18px",
                "color":"white",
                "background":"transparent",
                "padding":"0px"
            })
            .hide()
            .fadeIn(500);
    });

});
