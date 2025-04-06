document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const appointmentId = urlParams.get("appointmentId");
    const patientId = urlParams.get("patientId");
    const patientName = urlParams.get("patientName");

    document.getElementById("appointmentId").value = appointmentId;
    document.getElementById("patientId").value = patientId;
    document.getElementById("patientName").innerText = patientName;

    if (!appointmentId || !patientId) {
        alert("Missing appointment or patient details.");
        window.close();
        return;
    }

    const form = document.getElementById("prescriptionForm");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const diseaseDescription = document.getElementById("diseaseDescription").value;
        const prescription = document.getElementById("prescription").value;
        const doctorId = localStorage.getItem("doctorId");
        const token = localStorage.getItem("token");

        if (!doctorId || !token) {
            alert("Unauthorized! Please log in again.");
            return;
        }

        if (!diseaseDescription || !prescription) {
            alert("⚠️ Please fill in all fields.");
            return;
        }

        try {

            const submitBtn = form.querySelector("button[type='submit']");
            submitBtn.disabled = true;
            submitBtn.innerText = "Saving...";


            const response = await fetch("http://localhost:5000/api/prescriptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    appointmentId,
                    patientId,
                    doctorId,
                    diseaseDescription,
                    prescription
                })
            });
            const result = await response.json();
            console.log("📜 Prescription Response:", result);
            if (response.ok) {
                alert("Prescription saved successfully!");
                window.close();
            } else {
                alert("Error saving prescription.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
        finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerText = "Save Prescription";
        }
    });
});
