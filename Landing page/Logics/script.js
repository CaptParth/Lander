document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.querySelector("#phone");
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "in", 
    preferredCountries: ["in", "us", "gb"], 
    autoPlaceholder: "polite",
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  const enquiryForm = document.getElementById("enquiry-form");

  enquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!iti.isValidNumber()) {
      alert("Please enter a valid phone number.");
      return;
    }

    const name = document.querySelector("input[name='name']").value;
    const mobile = iti.getNumber();
    const email = document.querySelector("input[name='email']").value;
    const service = document.querySelector("select[name='services']").value;
    const location = document.querySelector("input[name='add']").value;

    // Firebase Configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBlLTh5ReW7BqXOCcpcs-_IYVwvCwfDbtI",
      authDomain: "landing-demo-28d4c.firebaseapp.com",
      databaseURL: "https://landing-demo-28d4c-default-rtdb.firebaseio.com",
      projectId: "landing-demo-28d4c",
      storageBucket: "landing-demo-28d4c.appspot.com",
      messagingSenderId: "578703396014",
      appId: "1:578703396014:web:8dde8338e536f3ed85313f",
      measurementId: "G-N1RC29SZ50",
    };

    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    const newEnquiryRef = database.ref("enquiries").push();
    newEnquiryRef
      .set({
        name: name,
        mobile: mobile,
        email: email,
        service: service,
        location: location,
      })
      .then(() => {
        alert("Your enquiry has been submitted successfully!");
        setTimeout(() => {
          window.location.href = "./healthcare.html"; 
        }, 1000);
        enquiryForm.reset(); 
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("Failed to submit your enquiry. Please try again.");
      });
  });
});
