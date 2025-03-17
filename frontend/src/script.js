document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("patientForm");
    const patientList = document.getElementById("patientList");
    const patientIdField = document.getElementById("patientId");

    // ✅ Fetch Patients from API
    async function fetchPatients() {
        try {
            const res = await fetch("http://localhost:3000/api/patient");
            const patients = await res.json();
            patientList.innerHTML = "";
            patients.forEach(patient => {
                const row = `<tr>
                    <td>${patient.name}</td>
                    <td>${patient.age}</td>
                    <td>${patient.gender}</td>
                    <td>${patient.contactNumber}</td>
                    <td>${patient.email || "N/A"}</td>
                    <td>${patient.address}</td>
                    <td>${patient.bloodGroup}</td>
                    <td>${patient.disease || "N/A"}</td>
                    <td>
                        <button onclick="editPatient('${patient._id}')">Edit</button>
                        <button onclick="deletePatient('${patient._id}')">Delete</button>
                    </td>
                </tr>`;
                patientList.innerHTML += row;
            });
        } catch (err) {
            console.error("Error fetching patients:", err);
        }
    }

    // ✅ Add or Update Patient
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
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

        const patientId = patientIdField.value;

        try {
            const url = patientId
                ? `http://localhost:3000/api/patient/${patientId}` // Update if ID exists
                : "http://localhost:3000/api/patient"; // Create new if no ID

            const method = patientId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patientData)
            });

            if (res.ok) {
                alert(patientId ? "Patient updated successfully!" : "Patient added successfully!");
                form.reset();
                patientIdField.value = ""; // Reset hidden field
                fetchPatients(); // Refresh the patient list
            } else {
                alert("Error processing patient.");
            }
        } catch (err) {
            console.error("Error:", err);
        }
    });

    // ✅ Edit Patient - Prefill the form
    window.editPatient = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/patient/${id}`);
            const patient = await res.json();
            
            document.getElementById("name").value = patient.name;
            document.getElementById("age").value = patient.age;
            document.getElementById("gender").value = patient.gender;
            document.getElementById("contactNumber").value = patient.contactNumber;
            document.getElementById("email").value = patient.email;
            document.getElementById("address").value = patient.address;
            document.getElementById("bloodGroup").value = patient.bloodGroup;
            document.getElementById("disease").value = patient.disease;

            patientIdField.value = id; // Store ID for updating
        } catch (err) {
            console.error("Error editing patient:", err);
        }
    };

    // ✅ Delete Patient
    window.deletePatient = async (id) => {
        if (confirm("Are you sure you want to delete this patient?")) {
            try {
                const res = await fetch(`http://localhost:3000/api/patient/${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    alert("Patient deleted successfully!");
                    fetchPatients(); // Refresh list
                } else {
                    alert("Error deleting patient.");
                }
            } catch (err) {
                console.error("Error deleting patient:", err);
            }
        }
    };

    fetchPatients(); // Load patients when page loads
});
