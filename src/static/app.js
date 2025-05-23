document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const unregisterActivitySelect = document.getElementById("unregister-activity");
  const signupForm = document.getElementById("signup-form");
  const unregisterForm = document.getElementById("unregister-form");
  const messageDiv = document.getElementById("message");
  const unregisterMessageDiv = document.getElementById("unregister-message");

  // Add debug logging
  console.log("Activity select:", activitySelect);
  console.log("Unregister activity select:", unregisterActivitySelect);

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // Clear loading message
      activitiesList.innerHTML = "";
      
      // Clear both dropdowns
      activitySelect.innerHTML = '<option value="">-- Select an activity --</option>';
      unregisterActivitySelect.innerHTML = '<option value="">-- Select an activity --</option>';

      console.log("Activities loaded:", Object.keys(activities).length);
      
      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;

        const participantsList = details.participants
          .map((participant) => `<li>${participant}</li>`)
          .join("");

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
          <div>
            <strong>Participants:</strong>
            <ul>${participantsList || "<li>No participants yet</li>"}</ul>
          </div>
        `;

        activitiesList.appendChild(activityCard);

        // Add option to select dropdowns
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
        
        const unregisterOption = document.createElement("option");
        unregisterOption.value = name;
        unregisterOption.textContent = name;
        unregisterActivitySelect.appendChild(unregisterOption);
        
        console.log(`Added option "${name}" to both dropdowns`);
      });
      
      // Log the number of options in each dropdown after population
      console.log("Activity select options count:", activitySelect.options.length);
      console.log("Unregister activity select options count:", unregisterActivitySelect ? unregisterActivitySelect.options.length : "Element not found");
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "message success";
        signupForm.reset();
        // Refresh activities to show updated list
        fetchActivities();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "message error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "message error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });
  
  // Handle unregister form submission
  unregisterForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("unregister-email").value;
    const activity = document.getElementById("unregister-activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/unregister?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        unregisterMessageDiv.textContent = result.message;
        unregisterMessageDiv.className = "message success";
        unregisterForm.reset();
        // Refresh activities to show updated list
        fetchActivities();
      } else {
        unregisterMessageDiv.textContent = result.detail || "An error occurred";
        unregisterMessageDiv.className = "message error";
      }

      unregisterMessageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        unregisterMessageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      unregisterMessageDiv.textContent = "Failed to unregister. Please try again.";
      unregisterMessageDiv.className = "message error";
      unregisterMessageDiv.classList.remove("hidden");
      console.error("Error unregistering:", error);
    }
  });

  // Initialize app
  fetchActivities();
});
