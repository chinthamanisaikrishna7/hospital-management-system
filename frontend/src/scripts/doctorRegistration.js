document.addEventListener("DOMContentLoaded", function () {
    // Extract userId from URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    
    if (!userId) {
        alert("User ID is missing. Please register again.");
        window.location.href = "register.html";
        return;
    }

    // Set userId in the hidden field
    document.getElementById("userId").value = userId;

    // Handle form submission
    document.getElementById("doctorRegistrationForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const specialization = document.getElementById("specialization").value;
        const fees = document.getElementById("fees").value;

        try {
            // Create doctor profile
            const response = await fetch("http://localhost:5000/api/doctors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, name, email, specialization, fees })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Doctor registration failed");

            alert("Doctor profile created successfully!");
            window.location.href = "../pages/login.html"; // Redirect to login after success

        } catch (error) {
            console.error("Doctor Registration Error:", error);
            alert(error.message);
        }
    });
});
