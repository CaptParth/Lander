document.addEventListener("DOMContentLoaded", () => {
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
    const tableBody = document.querySelector("#data-table tbody");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const pageInfo = document.getElementById("page-info");
  
    let enquiries = [];
    let currentPage = 1;
    const rowsPerPage = 5;
  
    database.ref("enquiries").on("value", (snapshot) => {
      enquiries = [];
      snapshot.forEach((childSnapshot) => {
        enquiries.push(childSnapshot.val());
      });
      displayTable();
    });
  
    function displayTable() {
      tableBody.innerHTML = "";
      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      const paginatedData = enquiries.slice(start, end);
  
      paginatedData.forEach((data) => {
        const row = `
          <tr>
            <td>${data.name}</td>
            <td>${data.mobile}</td>
            <td>${data.email}</td>
            <td>${data.service}</td>
            <td>${data.location}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
  
      updatePaginationControls();
    }
  
    function updatePaginationControls() {
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage * rowsPerPage >= enquiries.length;
      pageInfo.textContent = `Page ${currentPage}`;
    }
  
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayTable();
      }
    });
  
    nextButton.addEventListener("click", () => {
      if (currentPage * rowsPerPage < enquiries.length) {
        currentPage++;
        displayTable();
      }
    });
  });
  