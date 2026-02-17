function calculate(){
    let n1 = parseFloat(document.getElementById("num1").value);
    let n2 = parseFloat(document.getElementById("num2").value);
    let op = document.getElementById("operation").value;
    let resultBox = document.getElementById("result");

    if(isNaN(n1) || isNaN(n2)){
        resultBox.innerHTML = "⚠ Enter valid numbers";
        resultBox.style.background = "rgba(255,0,0,0.3)";
        return;
    }

    if(op === "/" && n2 === 0){
        resultBox.innerHTML = "❌ Cannot divide by zero";
        resultBox.style.background = "rgba(255,0,0,0.3)";
        return;
    }

    let result;
    switch(op){
        case "+": result = n1 + n2; break;
        case "-": result = n1 - n2; break;
        case "*": result = n1 * n2; break;
        case "/": result = n1 / n2; break;
    }

    resultBox.innerHTML = "Result: " + result;
    resultBox.style.background = result >= 0 
        ? "rgba(0,255,0,0.3)" 
        : "rgba(255,0,0,0.3)";
}
