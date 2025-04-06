console.log("✅ doctor_appointments.js script is running!")
document.addEventListener("DOMContentLoaded", function () {
    const fetchAppointmentsBtn = document.getElementById("fetchAppointments");
    const appointmentsTable = document.getElementById("appointmentsTable");
    const token = localStorage.getItem("token");
    const doctorId = localStorage.getItem("doctorId");

    if (!token || !doctorId) {
        console.log("🚨 Token or Doctor ID missing!");  // Debugging log
        console.log("Token from localStorage:", token);
        console.log("Doctor ID from localStorage:", doctorId);
        alert("Unauthorized! Please log in.");
        window.location.href = "../pages/login.html";
        return;
    }

    async function fetchAppointments() {
        console.log("Fetching Appointments...");  // ✅ Debug Log
        console.log("Stored doctorId:", doctorId);

        try {
            const response = await fetch(`http://localhost:5000/api/appointments/doctor/${doctorId}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch appointments");
            }

            const appointments = await response.json();
            appointmentsTable.innerHTML = ""; 

            if (appointments.length === 0) {
                appointmentsTable.innerHTML = "<tr><td colspan='7'>No Appointments Found</td></tr>";
                return;
            }

            appointments.forEach(appointment => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${appointment.patientId.name}</td>
                    <td>${appointment.patientId.age}</td>
                    <td>${appointment.patientId.gender}</td>
                    <td>${appointment.date}</td>
                    <td>${appointment.time}</td>
                    <td id="status-${appointment._id}">${appointment.status}</td>
                    <td>
                        <button onclick="markAsCompleted('${appointment._id}')">Mark as Completed</button>
                        <button onclick="openPrescriptionForm('${appointment._id}', '${appointment.patientId._id}', '${appointment.patientId.name}')">Prescribe Medicine</button>
                    </td>
                `;
                appointmentsTable.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching appointments:", error);
            alert("Error fetching appointments. Please try again.");
        }
    }
    fetchAppointments();
    fetchAppointmentsBtn.addEventListener("click", fetchAppointments);

    window.markAsCompleted = async function (appointmentId) {
        try {
            const res = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: "Completed" })
            });

            if (res.ok) {
                document.getElementById(`status-${appointmentId}`).innerText = "Completed";
                alert("Appointment marked as completed!");
            } else {
                alert("Error updating appointment status.");
            }
        } catch (error) {
            console.error("Error updating appointment status:", error);
        }
    };
    window.openPrescriptionForm = function openPrescriptionForm(appointmentId, patientId, patientName) {
        window.open(`../pages/prescriptions.html?appointmentId=${appointmentId}&patientId=${patientId}&patientName=${encodeURIComponent(patientName)}`, "_blank", "width=600,height=500");
    }    
});

