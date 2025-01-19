document.addEventListener("DOMContentLoaded", function () {
    const disagreeButton = document.getElementById("disagree-btn");
    const buttonsContainer = document.querySelector(".buttons");
    const explanationContainer = document.getElementById("explanation-container");
    const submitBtn = document.getElementById("submit-button");

    disagreeButton.addEventListener("click", function () {
        buttonsContainer.style.display = "none";
        explanationContainer.style.display = "flex";
        document.getElementById("explanation-input").disabled = false;
        submitBtn.style.display = "inline-block";
    });

    submitBtn.addEventListener("click", function () {
        buttonsContainer.style.display = "none";
        document.getElementById("explanation-input").disabled = true;
        submitBtn.style.display = "none";
    });
});

