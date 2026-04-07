var x = 5;
var y = 7;
var z = x + y;
console.log(z);

var A = "Hello ";
var B = "world!";
var C = A + B;
console.log(C);

function sumnPrint(x1, x2) {
    console.log(x1 + x2);
}

sumnPrint(x, y);
sumnPrint(A, B);

if (C.length > z) {
    console.log(C);
} else if (C.length < z) {
    console.log(z);
} else {
    console.log("good job!");
}

var L1 = ["Watermelon", "Pineapple", "Pear", "Banana"];
var L2 = ["Apple", "Banana", "Kiwi", "Orange"];

function findTheBanana(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "Banana") {
            alert("Banana found!");
        }
    }
}

function findTheBananaForEach(arr) {
    arr.forEach(function(item) {
        if (item === "Banana") {
            alert("Banana found!");
        }
    });
}

/* Uncomment only when testing
findTheBanana(L1);
findTheBanana(L2);
findTheBananaForEach(L1);
findTheBananaForEach(L2);
*/

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

    links.forEach(link => {
        if (window.location.href === link.href) {
            link.classList.add("active");
        }
    });
}

function showForm(selectedInfo) {
    var form = document.getElementById("ticketForm");
    var dateField = document.getElementById("selectedDate");

    if (form) {
        form.style.display = "block";
    }

    if (dateField) {
        dateField.value = selectedInfo;
    }
}

function submitTicket() {
    alert("Redirecting to payment system.");
}

document.addEventListener("DOMContentLoaded", function () {
    greeting(hour);
    ActiveNav();

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
});