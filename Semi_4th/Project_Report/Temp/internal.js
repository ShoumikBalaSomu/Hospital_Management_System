document.addEventListener('DOMContentLoaded', () => {
    // --- Data Storage Helper Functions (using localStorage) ---
    function getData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
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


    // --- Event Listener: Add Room ---
    addRoomForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newRoom = {
            number: document.getElementById('room-number').value.trim(),
            type: document.getElementById('room-type').value.trim(),
            availability: document.getElementById('room-availability').value.trim(),
            for: document.getElementById('room-for').value.trim(),
            capacity: parseInt(document.getElementById('room-capacity').value)
        };

        if (!newRoom.number || !newRoom.type || !newRoom.availability || !newRoom.for || isNaN(newRoom.capacity)) {
             addRoomOutput.textContent = 'Error: Please fill all fields correctly.';
             addRoomOutput.style.color = 'red';
             return;
        }

        const rooms = getData('hospitalRooms');
        // Basic check for duplicate room number
        if (rooms.some(room => room.number === newRoom.number)) {
             addRoomOutput.textContent = `Error: Room Number ${newRoom.number} already exists.`;
             addRoomOutput.style.color = 'red';
             return;
        }

        rooms.push(newRoom);
        saveData('hospitalRooms', rooms);

        addRoomOutput.textContent = `Room ${newRoom.number} added successfully!`;
        addRoomOutput.style.color = 'green';
        addRoomForm.reset();
    });

    // --- Event Listener: Search Room ---
    searchRoomForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchNumber = document.getElementById('search-room-number').value.trim();
        const rooms = getData('hospitalRooms');
        const foundRoom = rooms.find(room => room.number === searchNumber);

        if (foundRoom) {
            searchRoomResults.innerHTML = `
                <strong>Room Found:</strong><br>
                Room Number: ${foundRoom.number}<br>
                Room Type: ${foundRoom.type}<br>
                Room Availability: ${foundRoom.availability}<br>
                Room For: ${foundRoom.for}<br>
                Capacity per patient: ${foundRoom.capacity}
            `;
            searchRoomResults.style.color = 'black';
        } else {
            searchRoomResults.textContent = 'Room Number not found!';
            searchRoomResults.style.color = 'red';
        }
    });

     // --- Event Listener: Add Worker ---
     addWorkerForm.addEventListener('submit', (e) => {
        e.preventDefault();
         const newWorker = {
            id: document.getElementById('worker-id').value.trim(),
            name: document.getElementById('worker-name').value.trim(),
            jobTitle: document.getElementById('worker-job-title').value.trim(),
            hours: document.getElementById('worker-hours').value.trim(),
            specialization: document.getElementById('doctor-specialization').value.trim(),
            contact: document.getElementById('worker-contact').value.trim()
         };

         if (!newWorker.id || !newWorker.name || !newWorker.jobTitle || !newWorker.hours || !newWorker.contact) {
             addWorkerOutput.textContent = 'Error: Please fill all required fields.';
             addWorkerOutput.style.color = 'red';
             return;
         }

        // Ensure specialization is '0' if job title is not 'Doctor' (case-insensitive)
         if (newWorker.jobTitle.toLowerCase() !== 'doctor') {
            newWorker.specialization = '0';
         } else if (!newWorker.specialization || newWorker.specialization === '0') {
             // If it IS a doctor, specialization should not be empty or '0' unless intended
             addWorkerOutput.textContent = 'Warning: Job title is Doctor, but specialization is missing or set to 0.';
             addWorkerOutput.style.color = 'orange';
             // Allow adding anyway, but show warning. Could add stricter validation here.
         }


        const workers = getData('hospitalWorkers');
         // Basic check for duplicate worker ID
         if (workers.some(worker => worker.id === newWorker.id)) {
             addWorkerOutput.textContent = `Error: Worker ID ${newWorker.id} already exists.`;
             addWorkerOutput.style.color = 'red';
             return;
         }

        workers.push(newWorker);
        saveData('hospitalWorkers', workers);

        addWorkerOutput.textContent = `Worker ${newWorker.name} (ID: ${newWorker.id}) added successfully!`;
        addWorkerOutput.style.color = 'green';
        addWorkerForm.reset();
        // Reset specialization field visibility logic if needed after reset
        doctorSpecField.style.display = 'block'; // Show by default after reset or hide based on title logic
        document.getElementById('doctor-specialization').value = '0'; // Reset spec field value
     });

    // --- Event Listener: Search Worker ---
    searchWorkerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchId = document.getElementById('search-worker-id').value.trim();
        const workers = getData('hospitalWorkers');
        const foundWorker = workers.find(worker => worker.id === searchId);

        if (foundWorker) {
            let details = `
                <strong>Worker Found:</strong><br>
                Worker ID: ${foundWorker.id}<br>
                Worker Name: ${foundWorker.name}<br>
                Job Title: ${foundWorker.jobTitle}<br>
                Working Hours: ${foundWorker.hours}<br>`;

            // Only show specialization if it's not '0'
            if (foundWorker.specialization && foundWorker.specialization !== '0') {
                details += `Doctor Specialization: ${foundWorker.specialization}<br>`;
            }

            details += `Contact Number: ${foundWorker.contact}`;
            searchWorkerResults.innerHTML = details;
            searchWorkerResults.style.color = 'black';
        } else {
            searchWorkerResults.textContent = 'Worker ID not found!';
            searchWorkerResults.style.color = 'red';
        }
    });

    // Optional: Dynamically show/hide specialization based on job title input
    // You might want more robust logic here depending on exact requirements
    workerJobTitleInput.addEventListener('input', () => {
         if (workerJobTitleInput.value.trim().toLowerCase() === 'doctor') {
            doctorSpecField.style.display = 'block';
         } else {
             doctorSpecField.style.display = 'block'; // Keep visible but remind user to enter '0'
             // Or hide it completely: doctorSpecField.style.display = 'none';
             // document.getElementById('doctor-specialization').value = '0'; // Optionally reset if hidden
         }
    });
     // Initial check in case the page loads with 'Doctor' pre-filled (unlikely here)
     if (workerJobTitleInput.value.trim().toLowerCase() === 'doctor') {
         doctorSpecField.style.display = 'block';
     }
});