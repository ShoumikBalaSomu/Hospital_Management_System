document.addEventListener('DOMContentLoaded', () => {

    // --- Data Storage Helper Functions ---
    function getData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error(`Error parsing data for key ${key}:`, e);
            return []; // Return empty array on parsing error
        }
    }

    function saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error(`Error saving data for key ${key}:`, e);
        }
    }

    // --- Helper to display messages with CSS classes AND icons ---
    function showMessage(elementId, message, type = 'info') {
        const element = document.getElementById(elementId);
        if (!element) {
             console.error(`showMessage: Element with ID "${elementId}" not found!`);
             return;
        }
        let iconClass = '';
        switch (type) {
            case 'success': iconClass = 'fas fa-check-circle'; break;
            case 'error':   iconClass = 'fas fa-times-circle'; break;
            case 'warning': iconClass = 'fas fa-exclamation-triangle'; break;
            case 'info':    iconClass = 'fas fa-info-circle'; break;
            default:        iconClass = 'fas fa-info-circle'; break;
        }

        // Use innerHTML to include the icon, wrap message text
        element.innerHTML = message ? `<i class="${iconClass}"></i> <span class="message-text">${message}</span>` : '';

        // Clear existing type classes before adding the new one
        element.classList.remove('success', 'error', 'warning', 'info');
        if (message) { // Only add class if there is a message
            element.classList.add(type);
            element.style.display = 'flex'; // Make sure it's visible
        } else {
            element.style.display = 'none'; // Hide if empty
        }

        // Auto-clear non-error messages
        if (type !== 'error') {
            setTimeout(() => {
                // Check if the element still has the same message content structure
                if (element.innerHTML.includes(message) && message) {
                    element.innerHTML = ''; // Clear content
                    element.classList.remove(type);
                    element.style.display = 'none'; // Hide after clearing
                }
             }, 6000); // 6 seconds
        }
    }

    // --- Helper to display search results with icons ---
    function displayResults(elementId, contentHTML, notFoundMessage = "No results found.", type = 'info') {
       const element = document.getElementById(elementId);
        if (!element) {
            console.error(`displayResults: Element with ID "${elementId}" not found!`);
            return;
        }
       element.classList.remove('success', 'error', 'warning', 'info');
       if (contentHTML) {
           // Content already has structure/icons usually
           element.innerHTML = `<div class="result-content">${contentHTML}</div>`; // Wrap content
           element.classList.add(type);
           element.style.display = 'flex'; // Make visible
       } else {
           let iconClass = 'fas fa-exclamation-circle';
           element.innerHTML = `<i class="${iconClass}"></i> <span class="message-text">${notFoundMessage}</span>`;
           element.classList.add('error');
           element.style.display = 'flex'; // Make visible
       }
    }

    // --- Get DOM Elements ---
    const addRoomForm = document.getElementById('add-room-form');
    const addRoomOutput = document.getElementById('add-room-output');
    const searchRoomForm = document.getElementById('search-room-form');
    const searchRoomResults = document.getElementById('search-room-results');
    const addWorkerForm = document.getElementById('add-worker-form');
    const addWorkerOutput = document.getElementById('add-worker-output');
    const workerJobTitleInput = document.getElementById('worker-job-title');
    const doctorSpecField = document.getElementById('doctor-spec-field');
    const searchWorkerForm = document.getElementById('search-worker-form');
    const searchWorkerResults = document.getElementById('search-worker-results');

    // Initially hide output/results divs
     if(addRoomOutput) addRoomOutput.style.display = 'none';
     if(searchRoomResults) searchRoomResults.style.display = 'none';
     if(addWorkerOutput) addWorkerOutput.style.display = 'none';
     if(searchWorkerResults) searchWorkerResults.style.display = 'none';


    // --- Event Listener: Add Room ---
    addRoomForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const numberInput = document.getElementById('room-number');
        const typeInput = document.getElementById('room-type');
        const availabilityInput = document.getElementById('room-availability');
        const forInput = document.getElementById('room-for');
        const capacityInput = document.getElementById('room-capacity');

        const newRoom = {
            number: numberInput?.value.trim(),
            type: typeInput?.value.trim(),
            availability: availabilityInput?.value.trim(),
            for: forInput?.value.trim(),
            capacity: parseInt(capacityInput?.value)
        };

        if (!newRoom.number || !newRoom.type || !newRoom.availability || !newRoom.for || isNaN(newRoom.capacity)) {
             showMessage('add-room-output', 'Error: Please fill all fields correctly.', 'error');
             return;
        }

        const rooms = getData('hospitalRooms');
        if (Array.isArray(rooms) && rooms.some(room => room && room.number === newRoom.number)) {
             showMessage('add-room-output', `Error: Room Number ${newRoom.number} already exists.`, 'error');
             return;
        }

        if (Array.isArray(rooms)) {
            rooms.push(newRoom);
            saveData('hospitalRooms', rooms);
            showMessage('add-room-output', `Room ${newRoom.number} added successfully!`, 'success');
            addRoomForm.reset();
        } else {
             showMessage('add-room-output', 'Error: Could not retrieve room data correctly.', 'error');
        }
    });

    // --- Event Listener: Search Room ---
    searchRoomForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = document.getElementById('search-room-number');
        const searchNumber = searchInput?.value.trim();

        if (!searchNumber) {
            displayResults('search-room-results', null, 'Please enter a room number to search.');
            return;
        }

        const rooms = getData('hospitalRooms');
        const foundRoom = Array.isArray(rooms) ? rooms.find(room => room && room.number === searchNumber) : undefined;

        if (foundRoom) {
             const resultsHTML = `
                <strong><i class="fas fa-door-closed"></i> Room Details Found</strong><hr>
                <strong>Room Number:</strong> ${foundRoom.number}<br>
                <strong>Type:</strong> ${foundRoom.type}<br>
                <strong>Availability:</strong> ${foundRoom.availability}<br>
                <strong>For:</strong> ${foundRoom.for}<br>
                <strong>Capacity/Patient:</strong> ${foundRoom.capacity}
            `;
            displayResults('search-room-results', resultsHTML, '', 'info');
        } else {
            displayResults('search-room-results', null, `Room Number "${searchNumber}" not found!`);
        }
         if(searchInput) searchInput.value = ''; // Clear search field after search
    });

     // --- Event Listener: Add Worker ---
     addWorkerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const idInput = document.getElementById('worker-id');
        const nameInput = document.getElementById('worker-name');
        const jobTitleInput = document.getElementById('worker-job-title');
        const hoursInput = document.getElementById('worker-hours');
        const specInput = document.getElementById('doctor-specialization');
        const contactInput = document.getElementById('worker-contact');


         const newWorker = {
            id: idInput?.value.trim(),
            name: nameInput?.value.trim(),
            jobTitle: jobTitleInput?.value.trim(),
            hours: hoursInput?.value.trim(),
            specialization: specInput?.value.trim(),
            contact: contactInput?.value.trim()
         };

         if (!newWorker.id || !newWorker.name || !newWorker.jobTitle || !newWorker.hours || !newWorker.contact || !newWorker.specialization) {
             showMessage('add-worker-output', 'Error: Please fill all required fields, including specialization (use \'0\' if not Doctor).', 'error');
             return;
         }

        let warningMessage = '';
         if (newWorker.jobTitle.toLowerCase() !== 'doctor' && newWorker.specialization !== '0') {
            warningMessage = ' Warning: Specialization entered, but job title is not "Doctor". Set to "0".';
             newWorker.specialization = '0'; // Correct specialization if not a doctor
             if(specInput) specInput.value = '0'; // Update the form field too
         } else if (newWorker.jobTitle.toLowerCase() === 'doctor' && newWorker.specialization === '0') {
             warningMessage = ' Warning: Job title is Doctor, but specialization is "0". Please provide a specialization.';
             // Don't block saving, but warn prominently
         }

        const workers = getData('hospitalWorkers');
         if (Array.isArray(workers) && workers.some(worker => worker && worker.id === newWorker.id)) {
             showMessage('add-worker-output', `Error: Worker ID ${newWorker.id} already exists.`, 'error');
             return;
         }

         if (Array.isArray(workers)) {
            workers.push(newWorker);
            saveData('hospitalWorkers', workers);
            const finalMessage = `Worker ${newWorker.name} (ID: ${newWorker.id}) added!` + warningMessage;
            const messageType = warningMessage.includes('Doctor') && newWorker.specialization === '0' ? 'warning' : 'success'; // Show warning if spec is 0 for doctor
            showMessage('add-worker-output', finalMessage, messageType);
            addWorkerForm.reset();
            if(specInput) specInput.value = '0'; // Reset specialization field
         } else {
            showMessage('add-worker-output', 'Error: Could not retrieve worker data correctly.', 'error');
         }
     });

    // --- Event Listener: Search Worker ---
    searchWorkerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = document.getElementById('search-worker-id');
        const searchId = searchInput?.value.trim();

        if (!searchId) {
            displayResults('search-worker-results', null, 'Please enter a worker ID to search.');
            return;
        }

        const workers = getData('hospitalWorkers');
        const foundWorker = Array.isArray(workers) ? workers.find(worker => worker && worker.id === searchId) : undefined;


        if (foundWorker) {
            let resultsHTML = `
                <strong><i class="fas fa-user-check"></i> Worker Details Found</strong><hr>
                <strong>Worker ID:</strong> ${foundWorker.id}<br>
                <strong>Name:</strong> ${foundWorker.name}<br>
                <strong>Job Title:</strong> ${foundWorker.jobTitle}<br>
                <strong>Working Hours:</strong> ${foundWorker.hours}<br>`;

            if (foundWorker.jobTitle.toLowerCase() === 'doctor' && foundWorker.specialization && foundWorker.specialization !== '0') {
                 resultsHTML += `<strong>Specialization:</strong> ${foundWorker.specialization}<br>`;
            } // Only show non-zero spec for doctors

             resultsHTML += `<strong>Contact:</strong> ${foundWorker.contact}`;
             displayResults('search-worker-results', resultsHTML, '', 'info');
        } else {
             displayResults('search-worker-results', null, `Worker ID "${searchId}" not found!`);
        }
         if(searchInput) searchInput.value = ''; // Clear search field
    });

    // Optional: Show/hide specialization field based on job title input dynamically (remains less critical)
    // workerJobTitleInput?.addEventListener('input', () => { ... });

}); // End DOMContentLoaded