if (!localStorage.getItem("token")) {
    window.location.href = "../pages/login.html";
}

const token = localStorage.getItem("token");

function showForm(formId) {
    document.querySelectorAll(".form-container").forEach(form => form.style.display = "none");
    document.getElementById(formId).style.display = "block";
}

async function createPatient() {
    const patientData = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        contactNumber: document.getElementById("contactNumber").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        bloodGroup: document.getElementById("bloodGroup").value,
        disease: document.getElementById("disease").value
    };

    try {
        const res = await fetch("http://localhost:5000/api/patient/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(patientData)
        });

        if (res.ok) {
            alert("Patient Created Successfully!");
        } else {
            alert("Error Creating Patient");
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Error creating user", details: e.message });
    }
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

// Update Patient
async function updatePatient() {
    const id = document.getElementById("updateId").value;
    const field = document.getElementById("updateField").value;
    const value = document.getElementById("updateValue").value;

    try {
        const res = await fetch(`http://localhost:5000/api/patient/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ [field]: value })
        });

        if (res.ok) {
            alert("Patient Updated Successfully!");
        } else {
            alert("Error Updating Patient");
        }
    } catch (err) {
        console.error("Error:", err);
    }
}


// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "../pages/login.html";
}
