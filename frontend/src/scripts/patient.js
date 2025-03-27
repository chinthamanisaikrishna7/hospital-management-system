if (!localStorage.getItem("token")) {
    window.location.href = "../login.html";
}

async function fetchPatientData() {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("❌ No token found in localStorage");
        alert("No token found! Please log in again.");
        window.location.href = "../pages/login.html";
        return;
    }
    
    console.log("🔍 Sending Token in Request:", token);
    try {
        const response = await fetch("http://localhost:5000/api/patient/me", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}`}
        });

        const data = await response.json();

        if (response.ok) {
            // document.getElementById("patientDetails").innerHTML = `
            //     <p><strong>Name:</strong> ${data.name}</p>
            //     <p><strong>Age:</strong> ${data.age}</p>
            //     <p><strong>Gender:</strong> ${data.gender}</p>
            //     <p><strong>Contact:</strong> ${data.contactNumber}</p>
            //     <p><strong>Email:</strong> ${data.email}</p>
            //     <p><strong>Address:</strong> ${data.address}</p>
            //     <p><strong>Blood Group:</strong> ${data.bloodGroup}</p>
            //     <p><strong>Disease:</strong> ${data.disease}</p>
            // `;
            renderDashboard(data);
        } else {
            document.getElementById("patientDetails").innerHTML = "<p>Error fetching data.</p>";
        }
    } catch (error) {
        document.getElementById("patientDetails").innerHTML = "<p>Error fetching data.</p>";
    }
}
function renderDashboard(patient) {
    document.body.innerHTML = `
        <div class="sidebar">
            <h2>Patient Dashboard</h2>
            <ul>
                <li onclick="showSection('details')">My Details</li>
                <li onclick="window.location.href='../pages/appointments/book.html'">Book Appointment</li>
                <li onclick="window.location.href='../pages/appointments/history.html'">Appointment History</li>
                <li onclick="window.location.href='../pages/appointments/prescriptions.html'">Prescriptions</li>
            </ul>
            <button class="logout-btn" onclick="logout()">Logout</button>
        </div>

        <div class="content">
            <h2>Welcome, <span id="patientName">${patient.name}</span></h2>
            <div id="patientDetails">
                <p><strong>Name:</strong> ${patient.name}</p>
                <p><strong>Age:</strong> ${patient.age}</p>
                <p><strong>Gender:</strong> ${patient.gender}</p>
                <p><strong>Contact:</strong> ${patient.contactNumber}</p>
                <p><strong>Email:</strong> ${patient.email}</p>
                <p><strong>Address:</strong> ${patient.address}</p>
                <p><strong>Blood Group:</strong> ${patient.bloodGroup}</p>
                <p><strong>Disease:</strong> ${patient.disease}</p>
            </div>
        </div>
    `;

    applyStyles();
}

function applyStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
        body {
            display: flex;
            font-family: Arial, sans-serif;
            margin: 0;
        }
        .sidebar {
            width: 250px;
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            height: 100vh;
            position: fixed;
        }
        .sidebar h2 {
            text-align: center;
        }
        .sidebar ul {
            list-style: none;
            padding: 0;
        }
        .sidebar ul li {
            padding: 15px;
            text-align: center;
            cursor: pointer;
            border-bottom: 1px solid gray;
        }
        .sidebar ul li:hover {
            background-color: #34495e;
        }
        .logout-btn {
            background-color: red;
            color: white;
            border: none;
            padding: 10px;
            width: 100%;
            cursor: pointer;
            margin-top: 20px;
        }
        .logout-btn:hover {
            background-color: darkred;
        }
        .content {
            margin-left: 270px;
            padding: 20px;
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}

function showSection(section) {
    alert("This will show the " + section + " section (Implement later)");
}
function logout() {
    localStorage.removeItem("token");
    window.location.href = "../pages/login.html";
}
fetchPatientData();