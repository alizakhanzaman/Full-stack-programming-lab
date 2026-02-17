const answers = {
    q1: "javascript",
    q2: "let",
    q3: "getelementbyid"
};

function submitQuiz(){
    let score = 0;

    for(let key in answers){
        let userAnswer = document.getElementById(key).value.toLowerCase().trim();
        if(userAnswer === answers[key]){
            score++;
        }
    }

    let resultBox = document.getElementById("result");

    if(score === 3){
        resultBox.innerHTML = "🎉 Excellent! Score: 3/3";
        resultBox.style.background = "rgba(0,255,0,0.3)";
    }
    else if(score === 2){
        resultBox.innerHTML = "👍 Good Job! Score: 2/3";
        resultBox.style.background = "rgba(255,255,0,0.3)";
    }
    else{
        resultBox.innerHTML = "❌ Keep Practicing! Score: " + score + "/3";
        resultBox.style.background = "rgba(255,0,0,0.3)";
    }
}

function resetQuiz(){
    document.querySelectorAll("input").forEach(input => input.value = "");
    document.getElementById("result").innerHTML = "";
}
