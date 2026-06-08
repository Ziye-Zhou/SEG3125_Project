// Custom JavaScript for SEG 3125 Assignment 1 Portfolio

document.addEventListener("DOMContentLoaded", function () {

    // 1. Automatically highlight the current navigation link
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {
        const linkPage = link.getAttribute("href");

        link.classList.remove("active");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });


    // 2. Show / hide technical requirements message
    const techButton = document.getElementById("techButton");
    const techMessage = document.getElementById("techMessage");

    if (techButton && techMessage) {
        techButton.addEventListener("click", function () {
            techMessage.classList.toggle("d-none");

            if (techMessage.classList.contains("d-none")) {
                techButton.textContent = "Show Technical Requirements";
            } else {
                techButton.textContent = "Hide Technical Requirements";
            }
        });
    }


    // 3. Show / hide Private Coaching details
    const privateCoachBtn = document.getElementById("privateCoachBtn");
    const privateCoachDetails = document.getElementById("privateCoachDetails");

    if (privateCoachBtn && privateCoachDetails) {
        privateCoachBtn.addEventListener("click", function () {
            privateCoachDetails.classList.toggle("d-none");

            if (privateCoachDetails.classList.contains("d-none")) {
                privateCoachBtn.textContent = "Learn More";
            } else {
                privateCoachBtn.textContent = "Hide Details";
            }
        });
    }


    // 4. Show / hide Personalized Training Plan details
    const trainingPlanBtn = document.getElementById("trainingPlanBtn");
    const trainingPlanDetails = document.getElementById("trainingPlanDetails");

    if (trainingPlanBtn && trainingPlanDetails) {
        trainingPlanBtn.addEventListener("click", function () {
            trainingPlanDetails.classList.toggle("d-none");

            if (trainingPlanDetails.classList.contains("d-none")) {
                trainingPlanBtn.textContent = "Learn More";
            } else {
                trainingPlanBtn.textContent = "Hide Details";
            }
        });
    }


    // 5. Show / hide Nutrition Plan details
    const nutritionPlanBtn = document.getElementById("nutritionPlanBtn");
    const nutritionPlanDetails = document.getElementById("nutritionPlanDetails");

    if (nutritionPlanBtn && nutritionPlanDetails) {
        nutritionPlanBtn.addEventListener("click", function () {
            nutritionPlanDetails.classList.toggle("d-none");

            if (nutritionPlanDetails.classList.contains("d-none")) {
                nutritionPlanBtn.textContent = "Learn More";
            } else {
                nutritionPlanBtn.textContent = "Hide Details";
            }
        });
    }

});

// 6. Appointment form submission
const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.href = "confirmation.html";
    });
}

// 7. FAQ show / hide answers
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
        const targetId = question.getAttribute("data-target");
        const answer = document.getElementById(targetId);
        const arrow = question.querySelector(".faq-arrow");

        if (answer) {
            answer.classList.toggle("d-none");

            if (answer.classList.contains("d-none")) {
                arrow.textContent = "▼";
            } else {
                arrow.textContent = "▲";
            }
        }
    });
});