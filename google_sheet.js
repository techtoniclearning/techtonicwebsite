const scriptURL =
  "https://script.google.com/macros/s/AKfycbwRSGSdmUzbikBVgH49riWFxFZoYsN0lod8PI5D1S8sgiORxZjsmYkzLuHykJnkLOXc/exec";

const form = document.forms["contact-form"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      form.reset(); // Clear the form
      form.querySelector(".sent-message").style.display = "block"; // Show the success message
      form.querySelector(".loading").style.display = "none"; // Hide the loading message
    })
    .then((response) => {
      //  console.log("****************", response)
      // alert("Thank you! your form is submitted successfully.", response);
      //   window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      form.querySelector(".error-message").innerHTML =
        "An error occurred. Please try again later.";
      form.querySelector(".error-message").style.display = "block"; // Show the error message
      form.querySelector(".loading").style.display = "none"; // Hide the loading message
    });
});
