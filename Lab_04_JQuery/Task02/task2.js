$(document).ready(function () {

    const images = [
        {src: "https://picsum.photos/id/1015/600/400", caption: "Mountain View"},
        {src: "https://picsum.photos/id/1025/600/400", caption: "Cute Dog"},
        {src: "https://picsum.photos/id/1035/600/400", caption: "Forest Path"}
    ];

    let index = 0;

    function updateImage() {
        $("#galleryImage")
            .fadeOut(300, function () {
                $(this).attr("src", images[index].src).fadeIn(300);
            });
        $("#caption").text(images[index].caption);
    }

    $("#next").click(function () {
        index = (index + 1) % images.length;
        updateImage();
    });

    $("#prev").click(function () {
        index = (index - 1 + images.length) % images.length;
        updateImage();
    });

});