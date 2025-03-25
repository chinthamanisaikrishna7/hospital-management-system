if (!localStorage.getItem("token")) {
    window.location.href = "../login.html";
}

async function fetchPatientData() {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:5000/api/patient/me", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("patientDetails").innerHTML = `
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Age:</strong> ${data.age}</p>
                <p><strong>Gender:</strong> ${data.gender}</p>
                <p><strong>Contact:</strong> ${data.contactNumber}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Address:</strong> ${data.address}</p>
                <p><strong>Blood Group:</strong> ${data.bloodGroup}</p>
                <p><strong>Disease:</strong> ${data.disease}</p>
            `;
        } else {
            document.getElementById("patientDetails").innerHTML = "<p>Error fetching data.</p>";
        }
    } catch (error) {
        document.getElementById("patientDetails").innerHTML = "<p>Error fetching data.</p>";
    }
}

fetchPatientData();

function logout() {
    localStorage.removeItem("token");
    window.location.href = "../pages/login.html";
}
