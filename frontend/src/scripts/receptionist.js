if (!localStorage.getItem("token")) {
    window.location.href = "../pages/login.html";
}

const token = localStorage.getItem("token");

function showForm(formId) {
    document.querySelectorAll(".form-container").forEach(form => form.style.display = "none");
    document.getElementById(formId).style.display = "block";
}

// Create Patient
// async function createPatient() {
//     const patientData = {
//         name: document.getElementById("name").value,
//         age: document.getElementById("age").value,
//         gender: document.getElementById("gender").value,
//         contactNumber: document.getElementById("contactNumber").value,
//         email: document.getElementById("email").value,
//         address: document.getElementById("address").value,
//         bloodGroup: document.getElementById("bloodGroup").value,
//         disease: document.getElementById("disease").value
//     };

//     try {
//         const res = await fetch("http://localhost:5000/api/patient/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify(patientData)
//         });

//         if (res.ok) {
//             alert("Patient Created Successfully!");
//         } else {
//             alert("Error Creating Patient");
//         }
//     } catch (err) {
//         console.error("Error:", err);
//         res.status(500).json({ error: "Error registering user", details: e.message });
//     }
// }


// Spinner
const spinner = document.createElement("div");
spinner.id = "spinner";
spinner.style.display = "none";
spinner.innerHTML = `<div class="spinner"></div>`;
document.body.appendChild(spinner);

function toggleSpinner(show) {
    spinner.style.display = show ? "flex" : "none";
}


// Search Patient
async function searchPatient() {
    const id = document.getElementById("searchId").value;

    try {
        const res = await fetch(`http://localhost:5000/api/patient/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();

        if (res.ok) {
            document.getElementById("searchResult").innerHTML = `
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Age:</strong> ${data.age}</p>
                <p><strong>Gender:</strong> ${data.gender}</p>
            `;
        } else {
            alert("Patient not found.");
        }
    } catch (err) {
      toggleSpinner(false);
        console.error("Error:", err);
    }
}

// Get All Patients
async function getAllPatients() {
    try {
        const res = await fetch("http://localhost:5000/api/patient/getallpatients", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();
        if (res.ok) {
            document.getElementById("allPatientsList").innerHTML = data.map(patient =>
                `<p>${patient.name} - ${patient.age} - ${patient.gender}</p>`
            ).join("");
        } else {
            alert("Error fetching patients.");
        }
    } catch (err) {
      toggleSpinner(false);
        console.error("Error:", err);
    }
}

async function fetchAppointments() {
    const token = localStorage.getItem("token");
    toggleSpinner(true);
    const res = await fetch("http://localhost:5000/api/appointments/all", {
        method: "GET",headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const appointments = await res.json();
    toggleSpinner(false);
    const pending = appointments.filter(a => a.status === "Pending");
    const confirmed = appointments.filter(a => a.status === "Booked");
  
    // Render Pending
    const pendingDiv = document.getElementById("pendingAppointments");
    pendingDiv.innerHTML = "";
    // pending.forEach(app => {
    //   const div = document.createElement("div");
    //   div.innerHTML = `
    //     <p>Patient ID: ${app.patientId.name || app.patientId}</p>
    //     <p>Doctor: ${app.doctorId.name}</p>
    //     <p>Date: ${app.date} | Time: ${app.time}</p>
    //     <button onclick="confirmAppointment('${app._id}')">Confirm</button>

    // <button onclick="cancelAppointment('${app._id}')">Cancel</button>
    //   `;
    //   pendingDiv.appendChild(div);
    // });
    pendingDiv.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Patient</th>
          <th>Doctor</th>
          <th>Date</th>
          <th>Time</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${pending.map(app => `
          <tr>
            <td>${app.patientId.name || app.patientId}</td>
            <td>${app.doctorId.name}</td>
            <td>${app.date}</td>
            <td>${app.time}</td>
            <td><span class="badge pending">🟡 Pending</span></td>
            <td>
              <button class="confirm-btn" onclick="openConfirmModal('${app._id}')">Confirm</button>
              <button class="cancel-btn" onclick="openCancelModal('${app._id}')">Cancel</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
  
    // Render Confirmed
    const confirmedDiv = document.getElementById("confirmedAppointments");
    confirmedDiv.innerHTML = `

     <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${confirmed.map(app => `
            <tr>
              <td>${app.patientId.name || app.patientId}</td>
              <td>${app.doctorId.name}</td>
              <td>${app.date}</td>
              <td>${app.time}</td>
              <td><span class="badge confirmed">✅ Confirmed</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
}
function openConfirmModal(id) {
  if (confirm("Confirm this appointment?")) {
      confirmAppointment(id);
  }
}

function openCancelModal(id) {
  if (confirm("Cancel this appointment?")) {
      cancelAppointment(id);
  }
}     
  
  async function confirmAppointment(appointmentId) {
    const res = await fetch("http://localhost:5000/api/appointments/update-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    //   body: JSON.stringify({ appointmentId, status: "Confirmed" }),
      body: JSON.stringify({ appointmentId, status: "Booked" }),
    });
    if (res.ok) {
      alert("Appointment confirmed!");
      fetchAppointments(); // refresh list
      buttons.forEach(btn => btn.disabled = false);
    }
    else {
        alert("Failed to confirm.");
        
      }
  }
  async function fetchAllAppointments(status) {
    const token = localStorage.getItem("token");
    toggleSpinner(true);
    const response = await fetch("http://localhost:5000/api/appointments/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    const data = await response.json();
    console.log("", data);
    toggleSpinner(false);
    const container = document.getElementById("allAppointments");
    container.innerHTML = "The appoinmtents are:";
  
    data.forEach(appointment => {
      let statusText = "";
let statusClass = "";

if (appointment.status === "Booked") {
  statusText = "✅ Booked";
  statusClass = "Booked";
} else if (appointment.status === "Cancelled") {
  statusText = "❌ Cancelled";
  statusClass = "Cancelled";
} else if (appointment.status === "Completed") {
  statusText = "🟢 Completed";
  statusClass = "Completed";
} else {
  statusText = "🟡 Pending";
  statusClass = "Pending";
}
      container.innerHTML += `
      <div>
        <p><strong>Patient:</strong> ${appointment.patientId.name}</p>
        <p><strong>Doctor:</strong> ${appointment.doctorId.name}</p>
        <p><strong>Date:</strong> ${appointment.date}</p>
        <p><strong>Time:</strong> ${appointment.time}</p>
         <p><strong>Status:</strong> <span class="badge ${statusClass}">${statusText}</span></p>
        <hr/>
      </div>
    `;
  });
  }

  async function cancelAppointment(appointmentId) {
    const confirmCancel = confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;
  
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/appointments/update-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        appointmentId,
        status: "Cancelled"
      })
    });
  
    const result = await response.json();
    if (response.ok) {
      alert("Appointment cancelled successfully.");
      // Optional: reload current list to reflect changes
      fetchAppointments("Pending");
      buttons.forEach(btn => btn.disabled = false);
    } else {
      alert("Failed to cancel appointment: " + result.message);
      alert("Failed to cancel: " + result.message);
      buttons.forEach(btn => btn.disabled = false);
    }
  }
  

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "../pages/login.html";
}
