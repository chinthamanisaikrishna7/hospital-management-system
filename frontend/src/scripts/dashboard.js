document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        alert("Unauthorized! Please log in.");
        window.location.href = "login.html";
        return;
    }

    async function fetchPatients() {
        try {
            const response = await fetch("http://localhost:5000/api/patient/getallpatients", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await response.json();

            if (response.ok) {
                displayPatients(data);
            } else {
                alert("Error fetching data: " + data.message);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }
    function displayPatients(patients, role) {
        let table = `
            <table border='1'>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Contact Number</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Blood Group</th>
                    <th>Disease</th>
                    <th>Created At</th>`;
    
        // If the role is admin, show the Actions column
        if (role === "admin") {
            table += "<th>Actions</th>";
        }
    
        table += "</tr>";
    
        patients.forEach(patient => {
            table += `
                <tr>
                    <td>${patient.name}</td>
                    <td>${patient.age}</td>
                    <td>${patient.gender}</td>
                    <td>${patient.contactNumber}</td>
                    <td>${patient.email || "N/A"}</td>
                    <td>${patient.address}</td>
                    <td>${patient.bloodGroup}</td>
                    <td>${patient.disease || "N/A"}</td>
                    <td>${new Date(patient.createdAt).toLocaleDateString()}</td>`;
    
            // If the role is admin, show Edit and Delete buttons
            if (role === "admin") {
                table += `
                    <td>
                        <button onclick="editPatient('${patient._id}')">Edit</button>
                        <button onclick="deletePatient('${patient._id}')">Delete</button>
                    </td>`;
            }
    
            table += "</tr>";
        });
    
        table += "</table>";
        document.getElementById("patientList").innerHTML = table;
    }
    
    // function displayPatients(patients) {
    //     let table = "<table border='1'><tr><th>Name</th><th>Condition</th>";

    //     if (role === "admin") {
    //         table += "<th>Actions</th>";
    //     }

    //     table += "</tr>";

    //     patients.forEach(patient => {
    //         table += `<tr>
    //             <td>${patient.name}</td>
    //             <td>${patient.condition}</td>`;

    //         if (role === "admin") {
    //             table += `<td>
    //                 <button onclick="editPatient('${patient.id}')">Edit</button>
    //                 <button onclick="deletePatient('${patient.id}')">Delete</button>
    //             </td>`;
    //         }

    //         table += "</tr>";
    //     });

    //     table += "</table>";
    //     document.getElementById("patientList").innerHTML = table;
    // }

    fetchPatients();
});
