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
        console.error("Error:", err);
    }
}

async function fetchAppointments() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/appointments/all", {
        method: "GET",headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const appointments = await res.json();
  
    const pending = appointments.filter(a => a.status === "Pending");
    const confirmed = appointments.filter(a => a.status === "Confirmed");
  
    // Render Pending
    const pendingDiv = document.getElementById("pendingAppointments");
    pendingDiv.innerHTML = "";
    pending.forEach(app => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>Patient ID: ${app.patientId.name || app.patientId}</p>
        <p>Doctor: ${app.doctorId.name}</p>
        <p>Date: ${app.date} | Time: ${app.time}</p>
        <button onclick="confirmAppointment('${app._id}')">Confirm</button>
      `;
      pendingDiv.appendChild(div);
    });
  
    // Render Confirmed
    const confirmedDiv = document.getElementById("confirmedAppointments");
    confirmedDiv.innerHTML = "";
    confirmed.forEach(app => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>✅ Patient: ${app.patientId.name || app.patientId}, Doctor: ${app.doctorId.name}, Date: ${app.date}</p>
      `;
      confirmedDiv.appendChild(div);
    });
  }
  
  async function confirmAppointment(appointmentId) {
    const res = await fetch("http://localhost:5000/api/appointments/update-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ appointmentId, status: "Confirmed" }),
    });
    if (res.ok) {
      alert("Appointment confirmed!");
      fetchAppointments(); // refresh list
    }
  }
  async function fetchAllAppointments() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/appointments/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    const data = await response.json();
    console.log("📋 All Appointments:", data);
  
    const container = document.getElementById("allAppointments");
    container.innerHTML = "";
  
    data.forEach(appointment => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>Patient:</strong> ${appointment.patientId.name}</p>
        <p><strong>Doctor:</strong> ${appointment.doctorId.name}</p>
        <p><strong>Date:</strong> ${appointment.date}</p>
        <p><strong>Status:</strong> ${appointment.status}</p>
        <hr/>
      `;
      container.appendChild(div);
    });
  }
  

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "../pages/login.html";
}
