if (!localStorage.getItem("token")) {
    window.location.href = "../../login.html";
}

async function fetchAppointmentHistory() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You need to log in first!");
        window.location.href = "../../login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/appointments/history", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error("Error fetching appointments. Status:", response.status);
            alert("Failed to load appointment history.");
            return;
        }

        const appointments = await response.json();
        console.log("Fetched Appointments:", appointments); // Debugging

        const historyContainer = document.getElementById("appointmentHistory");
        historyContainer.innerHTML = "";

        if (!appointments || appointments.length === 0) {
            console.warn("⚠ No appointments found for this patient.");
            historyContainer.innerHTML = "<p>No appointment history available.</p>";
            return;
        }
        const wrapper = document.createElement("div");
        wrapper.classList.add("history-wrapper");
        appointments.forEach(appointment => {
            const div = document.createElement("div");
            div.classList.add("appointment-card");
            div.innerHTML = `
                <h3>${appointment.doctorId?.name || "Unknown"}</h3>
                <p><strong>Doctor:</strong> ${appointment.doctorId?.name || "Unknown"}</p>
                <p><strong>Specialization:</strong> ${appointment.doctorId?.specialization || "N/A"}</p>
                <p><strong>Date:</strong> ${appointment.date}</p>
                <p><strong>Time:</strong> ${appointment.time}</p>
                <p><strong>Status:</strong> ${appointment.status}</p>
            `;
            wrapper.appendChild(div);
        });
        historyContainer.appendChild(wrapper);
    } catch (error) {
        console.error("Error fetching history:", error);
        alert("Error fetching appointment history.");
    }
}

// Call this function when the patient dashboard loads
document.addEventListener("DOMContentLoaded", fetchAppointmentHistory);
fetchAppointmentHistory();
