let questions = [
    {
        question: "Which library simplifies DOM manipulation?",
        options: ["React", "jQuery", "Laravel", "Django"],
        answer: "jQuery"
    },
    {
        question: "Which jQuery method is used for Ajax GET?",
        options: ["$.post()", "$.get()", ".css()", ".animate()"],
        answer: "$.get()"
    },
    {
        question: "Which method hides elements with animation?",
        options: [".hide()", ".fadeOut()", ".text()", ".val()"],
        answer: ".fadeOut()"
    }
];

let current = 0;
let score = 0;
let selectedAnswer = null;

function loadQuestion() {
    let q = questions[current];

    $("#question").fadeOut(200, function () {
        $(this).text(q.question).fadeIn(200);
    });

    $("#options").empty();

    q.options.forEach(option => {
        $("#options").append(`<div>${option}</div>`);
    });

    $(".options div").click(function () {
        $(".options div").removeClass("selected");
        $(this).addClass("selected");
        selectedAnswer = $(this).text();
    });

    updateProgress();
}

function updateProgress() {
    let progress = ((current) / questions.length) * 100;
    $(".progress-fill").css("width", progress + "%");
}

$(document).ready(function () {

    loadQuestion();

    $("#nextBtn").click(function () {

        if (!selectedAnswer) {
            alert("Please select an answer!");
            return;
        }

        if (selectedAnswer === questions[current].answer) {
            score++;
        }

        selectedAnswer = null;
        current++;

        if (current < questions.length) {
            loadQuestion();
        } else {
            $(".progress-fill").css("width", "100%");
            $(".quiz-body, .quiz-footer").fadeOut(300);
            $("#resultBox")
                .text("🎉 Your Final Score: " + score + " / " + questions.length)
                .fadeIn(500);
        }
    });

});