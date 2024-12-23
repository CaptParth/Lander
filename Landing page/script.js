document.addEventListener("DOMContentLoaded", () => {
    // Your Firebase Configuration
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
  
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
    // Reference the Realtime Database
    const database = firebase.database();
  
    // Handle Form Submission
    document.getElementById("enquiry-form").addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Collect Form Data
      const name = document.querySelector("input[name='name']").value;
      const mobile = document.querySelector("input[name='number']").value;
      const email = document.querySelector("input[name='email']").value;
      const service = document.querySelector("select[name='services']").value;
      const location = document.querySelector("input[name='add']").value;
  
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
  
          document.querySelector("form").reset();
        })
        .catch((error) => {
          console.error("Error saving data: ", error);
          alert("Failed to submit your enquiry. Please try again.");
        });
    });
  });
  