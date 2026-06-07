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

});