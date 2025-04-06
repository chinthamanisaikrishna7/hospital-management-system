console.log("✅ patient_prescriptions.js is running!");

document.addEventListener("DOMContentLoaded", async function () {
    const prescriptionsTable = document.getElementById("prescriptionsTable");
    const token = localStorage.getItem("token");
    const patientId = localStorage.getItem("patientId");

    if (!token || !patientId) {
        console.error("🚨 Missing Token or Patient ID");
        alert("Unauthorized! Please log in.");
        window.location.href = "../pages/login.html";
        return;
    }

    async function fetchPrescriptions() {
        console.log("📜 Fetching prescriptions for patient:", patientId);

        try {
            const response = await fetch(`http://localhost:5000/api/prescriptions/patient/${patientId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch prescriptions");
            }

            const prescriptions = await response.json();
            prescriptionsTable.innerHTML = ""; // Clear previous data

            if (prescriptions.length === 0) {
                prescriptionsTable.innerHTML = "<tr><td colspan='5'>No prescriptions found</td></tr>";
                return;
            }

            prescriptions.forEach(prescription => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${prescription.doctorName}</td>
                    <td>${prescription.doctorSpecialization}</td>
                    <td>${prescription.date}</td>
                    <td>${prescription.diseaseDescription}</td>
                    <td>${prescription.prescription}</td>
                `;
                prescriptionsTable.appendChild(row);
            });

        } catch (error) {
            console.error("Error fetching prescriptions:", error);
            alert("Error fetching prescriptions. Please try again.");
        }
    }

    fetchPrescriptions();
});
