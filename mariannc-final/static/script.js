var now = new Date();
var hour = now.getHours();

function greeting(x) {
    var greetingElement = document.getElementById("greeting");

    if (greetingElement) {
        if (x < 5 || x >= 20) {
            greetingElement.innerHTML = "Good night! Welcome to MonoMuse";
        } else if (x < 12) {
            greetingElement.innerHTML = "Good morning! Welcome to MonoMuse";
        } else if (x < 18) {
            greetingElement.innerHTML = "Good afternoon! Welcome to MonoMuse";
        } else {
            greetingElement.innerHTML = "Good evening! Welcome to MonoMuse";
        }
    }
}

function addYear() {
    var yearElement = document.getElementById("copyYear");
    var currentYear = new Date().getFullYear();

    if (yearElement) {
        yearElement.innerHTML = "&copy; " + currentYear + " MonoMuse. All rights reserved.";
    }
}

function ActiveNav() {
    const links = document.querySelectorAll("nav a");

    links.forEach(function(link) {
        if (window.location.href === link.href) {
            link.classList.add("active");
        }
    });
}

function toggleMenu() {
    var nav = document.getElementById("navLinks");
    if (nav) {
        nav.classList.toggle("responsive");
    }
}

function getTicketPrice() {
    var membershipStatus = document.getElementById("membershipStatus");

    if (!membershipStatus) {
        return 0;
    }

    if (membershipStatus.value === "Guest") {
        return 18;
    } else if (membershipStatus.value === "Student") {
        return 12;
    } else if (membershipStatus.value === "Member") {
        return 0;
    }

    return 0;
}

function updateOrderTotal() {
    var quantityInput = document.getElementById("ticketQuantity");
    var totalElement = document.getElementById("orderTotal");
    var priceElement = document.getElementById("pricePerTicket");

    if (!quantityInput || !totalElement || !priceElement) {
        return;
    }

    var quantity = parseInt(quantityInput.value, 10);
    var pricePerTicket = getTicketPrice();

    priceElement.textContent = "$" + pricePerTicket;

    if (isNaN(quantity) || quantity < 1) {
        totalElement.textContent = "$0";
        return;
    }

    totalElement.textContent = "$" + (quantity * pricePerTicket);
}

function clearCheckoutErrors() {
    var errorIds = [
        "visitDateError",
        "membershipStatusError",
        "ticketTypeError",
        "ticketQuantityError",
        "emailError",
        "zipCodeError"
    ];

    errorIds.forEach(function(id) {
        var element = document.getElementById(id);
        if (element) {
            element.textContent = "";
        }
    });
}

function placeOrder() {
    clearCheckoutErrors();

    var visitDate = document.getElementById("visitDate");
    var membershipStatus = document.getElementById("membershipStatus");
    var ticketType = document.getElementById("ticketType");
    var ticketQuantity = document.getElementById("ticketQuantity");
    var email = document.getElementById("email");
    var zipCode = document.getElementById("zipCode");
    var mailingList = document.getElementById("mailingList");

    if (!visitDate || !membershipStatus || !ticketType || !ticketQuantity || !email || !zipCode || !mailingList) {
        return;
    }

    var hasError = false;
    var quantity = parseInt(ticketQuantity.value, 10);
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var zipPattern = /^\d{5}$/;

    if (visitDate.value === "") {
        document.getElementById("visitDateError").textContent = "Please select a visit date.";
        hasError = true;
    }

    if (membershipStatus.value === "") {
        document.getElementById("membershipStatusError").textContent = "Please select your membership status.";
        hasError = true;
    }

    if (ticketType.value === "") {
        document.getElementById("ticketTypeError").textContent = "Please select a ticket type.";
        hasError = true;
    }

    if (isNaN(quantity) || quantity < 1 || quantity > 10) {
        document.getElementById("ticketQuantityError").textContent = "Please enter a quantity from 1 to 10.";
        hasError = true;
    }

    if (!emailPattern.test(email.value.trim())) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        hasError = true;
    }

    if (zipCode.value.trim() !== "" && !zipPattern.test(zipCode.value.trim())) {
        document.getElementById("zipCodeError").textContent = "Zip code must be a 5-digit code.";
        hasError = true;
    }

    if (hasError) {
        return;
    }

    var pricePerTicket = getTicketPrice();
    var total = quantity * pricePerTicket;

    var params = new URLSearchParams({
        date: visitDate.value,
        membership: membershipStatus.value,
        type: ticketType.value,
        quantity: quantity,
        email: email.value.trim(),
        total: "$" + total,
        mailingList: mailingList.checked ? "Yes" : "No"
    });

    window.location.href = "confirmation.html?" + params.toString();
}

function loadConfirmation() {
    var dateField = document.getElementById("confirmDate");
    var membershipField = document.getElementById("confirmMembership");
    var typeField = document.getElementById("confirmType");
    var quantityField = document.getElementById("confirmQuantity");
    var emailField = document.getElementById("confirmEmail");
    var totalField = document.getElementById("confirmTotal");
    var messageField = document.getElementById("confirmationMessage");

    if (!dateField || !membershipField || !typeField || !quantityField || !emailField || !totalField || !messageField) {
        return;
    }

    var params = new URLSearchParams(window.location.search);

    dateField.textContent = params.get("date") || "Not provided";
    membershipField.textContent = params.get("membership") || "Not provided";
    typeField.textContent = params.get("type") || "Not provided";
    quantityField.textContent = params.get("quantity") || "Not provided";
    emailField.textContent = params.get("email") || "Not provided";
    totalField.textContent = params.get("total") || "$0";

    messageField.textContent = "Your simulated checkout is complete. We look forward to seeing you at MonoMuse.";
}

function initMap() {
    var mapElement = document.getElementById("map");

    if (mapElement && typeof L !== "undefined") {
        var map = L.map("map").setView([40.444, -79.943], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors"
        }).addTo(map);

        L.marker([40.444, -79.943]).addTo(map)
            .bindPopup("MonoMuse - Pittsburgh")
            .openPopup();
    }
}

var galleryImages = [
    {
        src: "./static/museum.jpg",
        alt: "Exterior view of MonoMuse museum building",
        caption: "Exterior view of MonoMuse museum building"
    },
    {
        src: "./static/museum2.jpg",
        alt: "Interior gallery space at MonoMuse",
        caption: "Interior gallery space at MonoMuse"
    },
    {
        src: "./static/museum3.jpg",
        alt: "Interactive exhibit area inside MonoMuse",
        caption: "Interactive exhibit area inside MonoMuse"
    }
];

var currentSlideIndex = 0;

function renderGallery() {
    var galleryImage = document.getElementById("galleryImage");
    var galleryCaption = document.getElementById("galleryCaption");

    if (!galleryImage || !galleryCaption) {
        return;
    }

    galleryImage.src = galleryImages[currentSlideIndex].src;
    galleryImage.alt = galleryImages[currentSlideIndex].alt;
    galleryCaption.textContent = galleryImages[currentSlideIndex].caption;
}

function changeSlide(step) {
    currentSlideIndex = currentSlideIndex + step;

    if (currentSlideIndex < 0) {
        currentSlideIndex = galleryImages.length - 1;
    }

    if (currentSlideIndex >= galleryImages.length) {
        currentSlideIndex = 0;
    }

    renderGallery();
}

document.addEventListener("DOMContentLoaded", function () {
    greeting(hour);
    ActiveNav();
    initMap();
    loadConfirmation();
    renderGallery();

    var quantityInput = document.getElementById("ticketQuantity");
    var membershipInput = document.getElementById("membershipStatus");
    var readMore = document.getElementById("readMore");
    var readLess = document.getElementById("readLess");

    if (quantityInput) {
        quantityInput.addEventListener("input", updateOrderTotal);
    }

    if (membershipInput) {
        membershipInput.addEventListener("change", updateOrderTotal);
    }

    updateOrderTotal();

    if (typeof $ !== "undefined") {
        $("#readMore").click(function () {
            $("#longIntro").show();
            $("#readLess").show();
            $("#readMore").hide();
        });

        $("#readLess").click(function () {
            $("#longIntro").hide();
            $("#readLess").hide();
            $("#readMore").show();
        });
    }

    if (readMore) {
        readMore.addEventListener("keypress", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                readMore.click();
            }
        });
    }

    if (readLess) {
        readLess.addEventListener("keypress", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                readLess.click();
            }
        });
    }
});