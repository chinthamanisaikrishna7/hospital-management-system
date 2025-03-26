if (!localStorage.getItem("token")) {
    window.location.href = "../../login.html";
}

async function fetchDoctors() {
    const specialization = document.getElementById("specialization").value;
    if (!specialization) return;

    try {
        console.log(`Fetching doctors for specialization: ${specialization}`);
        // const response = await fetch(`http://localhost:5000/api/doctors?specialization=${specialization}`);
        const response = await fetch(`http://localhost:5000/api/doctors?specialization=${specialization}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) {
            console.error("Error fetching doctors. Status:", response.status);
            return;
        }

        const doctors = await response.json();
        console.log("Fetched doctors:", doctors); // Debugging log
        const doctorDropdown = document.getElementById("doctor");
        doctorDropdown.innerHTML = '<option value="">Select Doctor</option>'; // Reset dropdown
        if (doctors.length === 0) {
            console.warn("No doctors found for this specialization.");
        }
        doctors.forEach(doctor => {
            const option = document.createElement("option");
            option.value = doctor._id;
            option.textContent = `${doctor.name} (Fee: ₹${doctor.fees})`;
            option.dataset.fee = doctor.fees;
            doctorDropdown.appendChild(option);
        });

    } catch (error) {
        console.error("Error fetching doctors:", error);
    }
}

function updateFee() {
    const doctorDropdown = document.getElementById("doctor");
    const selectedDoctor = doctorDropdown.options[doctorDropdown.selectedIndex];
    
    if (selectedDoctor && selectedDoctor.dataset.fee) {
        document.getElementById("fee").value = `₹${selectedDoctor.dataset.fee}`;
    } else {
        document.getElementById("fee").value = "N/A";
    }
    // document.getElementById("fee").value = selectedDoctor.dataset.fee || "N/A";
}

document.getElementById("appointmentForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const doctorDropdown = document.getElementById("doctor");
    const selectedDoctor = doctorDropdown.value; // Get selected doctor's ID
    if (!selectedDoctor) {
        alert("Please select a doctor.");
        return;
    }
    const appointmentDate = document.getElementById("date").value;
const appointmentTime = document.getElementById("time").value;

if (!appointmentDate || !appointmentTime) {
    alert("Please select a date and time for the appointment.");
    return;
}

    const PatientId = localStorage.getItem("patientId");
    const appointmentData = {
        // specialization: document.getElementById("specialization").value,
        // doctorId: document.getElementById("doctor").value,
        // date: document.getElementById("date").value,
        // time: document.getElementById("time").value,
        // patientId:PatientId, 
        doctorId: selectedDoctor,
        date: appointmentDate.trim(),
        time: appointmentTime.trim()
        // patientId: localStorage.getItem("patientId") 
    };

    console.log("Sending Appointment Data:", appointmentData);
    // console.log("PatientId:", PatientId);
    // console.log(
    //     "DoctorId:", appointmentData.doctorId,
    //     "Date:", appointmentData.date,
    //     "Time:", appointmentData.time
    // );
    
    if (!appointmentData.doctorId || !appointmentData.date || !appointmentData.time ) {
        alert("Please fill all fields before submitting.");
        return;
    }
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:5000/api/appointments/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(appointmentData)
        });

        const result = await response.json();
        console.log("Server Response:", result); 
        if (response.ok) {
            alert("Appointment booked successfully!");
            window.location.href = "../../pages/patient.html";
        } else {
            alert(result.message || "Error booking appointment");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
