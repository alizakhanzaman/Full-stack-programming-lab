function addColors() {
    let colors = [
        document.getElementById("color1").value,
        document.getElementById("color2").value,
        document.getElementById("color3").value
    ];

    let boxContainer = document.getElementById("boxes");
    boxContainer.innerHTML = "";

    for (let i = 0; i < colors.length; i++) {
        if (colors[i] !== "") {
            let div = document.createElement("div");
            div.className = "color-box";
            div.style.backgroundColor = colors[i];
            boxContainer.appendChild(div);
        }
    }

    // BOM info
    info.innerHTML=
    "Window: "+window.innerWidth+" x "+window.innerHeight+
    "<br>Browser: "+navigator.userAgent;
}

function clearColors() {
    document.getElementById("boxes").innerHTML = "";
    document.getElementById("info").innerText = "";
}
