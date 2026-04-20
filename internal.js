document.addEventListener('DOMContentLoaded', () => {

    // --- Data Storage Helper Functions ---
    function getData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error(`Error parsing data for key ${key}:`, e);
            return [];
        }
    }

    function saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error(`Error saving data for key ${key}:`, e);
        }
    }

    // --- Helper to display messages ---
    function showMessage(elementId, message, type = 'info') {
        const element = document.getElementById(elementId);
        if (!element) return;

        let iconClass = '';
        switch (type) {
            case 'success': iconClass = 'fas fa-check-circle'; break;
            case 'error':   iconClass = 'fas fa-times-circle'; break;
            case 'warning': iconClass = 'fas fa-exclamation-triangle'; break;
            case 'info':    iconClass = 'fas fa-info-circle'; break;
            default:        iconClass = 'fas fa-info-circle'; break;
        }

        element.innerHTML = message ? `<i class="${iconClass}"></i> <span class="message-text">${message}</span>` : '';
        element.classList.remove('success', 'error', 'warning', 'info');
        
        if (message) {
            element.classList.add(type);
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }

        if (type !== 'error') {
            setTimeout(() => {
                if (element.innerHTML.includes(message) && message) {
                    element.innerHTML = '';
                    element.classList.remove(type);
                    element.style.display = 'none';
                }
             }, 5000);
        }
    }

    // --- Helper to display search results ---
    function displayResults(elementId, contentHTML, notFoundMessage = "No results found.", type = 'info', deleteAction = null) {
        const element = document.getElementById(elementId);
        if (!element) return;

        element.classList.remove('success', 'error', 'warning', 'info');
        if (contentHTML) {
            let html = `<div class="result-content">${contentHTML}</div>`;
            if (deleteAction) {
                html += `<button class="btn btn-secondary btn-sm delete-btn" style="margin-top: 1rem; color: var(--danger); border-color: var(--danger); font-size: 0.8rem;">
                            <i class="fas fa-trash-alt"></i> Delete Record
                         </button>`;
            }
            element.innerHTML = html;
            element.classList.add(type);
            element.style.display = 'flex';
            element.style.flexDirection = 'column';
            element.style.alignItems = 'flex-start';

            if (deleteAction) {
                element.querySelector('.delete-btn').addEventListener('click', deleteAction);
            }
        } else {
            element.innerHTML = `<i class="fas fa-exclamation-circle"></i> <span class="message-text">${notFoundMessage}</span>`;
            element.classList.add('error');
            element.style.display = 'flex';
        }
    }

    // --- DOM Elements ---
    const addRoomForm = document.getElementById('add-room-form');
    const searchRoomForm = document.getElementById('search-room-form');
    const addWorkerForm = document.getElementById('add-worker-form');
    const searchWorkerForm = document.getElementById('search-worker-form');

    // --- Event Listener: Add Room ---
    addRoomForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const number = document.getElementById('room-number').value.trim();
        const type = document.getElementById('room-type').value.trim();
        const availability = document.getElementById('room-availability').value.trim();
        const roomFor = document.getElementById('room-for').value.trim();
        const capacity = parseInt(document.getElementById('room-capacity').value);

        if (!number || !type || !availability || !roomFor || isNaN(capacity)) {
             showMessage('add-room-output', 'Please fill all fields correctly.', 'error');
             return;
        }

        const rooms = getData('hospitalRooms');
        if (rooms.some(r => r.number === number)) {
             showMessage('add-room-output', `Room Number ${number} already exists.`, 'error');
             return;
        }

        rooms.push({ number, type, availability, for: roomFor, capacity });
        saveData('hospitalRooms', rooms);
        showMessage('add-room-output', `Room ${number} added successfully!`, 'success');
        addRoomForm.reset();
    });

    // --- Event Listener: Search Room ---
    searchRoomForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchNumber = document.getElementById('search-room-number').value.trim();
        if (!searchNumber) return;

        const rooms = getData('hospitalRooms');
        const foundRoom = rooms.find(r => r.number === searchNumber);

        if (foundRoom) {
             const resultsHTML = `
                <strong>Room Details Found</strong><hr style="margin: 0.5rem 0; opacity: 0.2;">
                <strong>Number:</strong> ${foundRoom.number}<br>
                <strong>Type:</strong> ${foundRoom.type}<br>
                <strong>Status:</strong> ${foundRoom.availability}<br>
                <strong>Dept:</strong> ${foundRoom.for}<br>
                <strong>Capacity:</strong> ${foundRoom.capacity}
            `;
            displayResults('search-room-results', resultsHTML, '', 'info', () => {
                const updatedRooms = getData('hospitalRooms').filter(r => r.number !== foundRoom.number);
                saveData('hospitalRooms', updatedRooms);
                showMessage('add-room-output', `Room ${foundRoom.number} deleted.`, 'warning');
                document.getElementById('search-room-results').style.display = 'none';
            });
        } else {
            displayResults('search-room-results', null, `Room "${searchNumber}" not found!`);
        }
    });

    // --- Event Listener: Add Worker ---
    addWorkerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('worker-id').value.trim();
        const name = document.getElementById('worker-name').value.trim();
        const jobTitle = document.getElementById('worker-job-title').value.trim();
        const hours = document.getElementById('worker-hours').value.trim();
        const spec = document.getElementById('doctor-specialization').value.trim();
        const contact = document.getElementById('worker-contact').value.trim();

        if (!id || !name || !jobTitle || !hours || !contact || !spec) {
             showMessage('add-worker-output', 'Please fill all required fields.', 'error');
             return;
        }

        const workers = getData('hospitalWorkers');
        if (workers.some(w => w.id === id)) {
             showMessage('add-worker-output', `Worker ID ${id} already exists.`, 'error');
             return;
        }

        workers.push({ id, name, jobTitle, hours, specialization: spec, contact });
        saveData('hospitalWorkers', workers);
        showMessage('add-worker-output', `Worker ${name} added successfully!`, 'success');
        addWorkerForm.reset();
        document.getElementById('doctor-specialization').value = '0';
    });

    // --- Event Listener: Search Worker ---
    searchWorkerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchId = document.getElementById('search-worker-id').value.trim();
        if (!searchId) return;

        const workers = getData('hospitalWorkers');
        const foundWorker = workers.find(w => w.id === searchId);

        if (foundWorker) {
            let resultsHTML = `
                <strong>Worker Details Found</strong><hr style="margin: 0.5rem 0; opacity: 0.2;">
                <strong>ID:</strong> ${foundWorker.id}<br>
                <strong>Name:</strong> ${foundWorker.name}<br>
                <strong>Title:</strong> ${foundWorker.jobTitle}<br>
                <strong>Hours:</strong> ${foundWorker.hours}<br>`;

            if (foundWorker.jobTitle.toLowerCase() === 'doctor' && foundWorker.specialization !== '0') {
                 resultsHTML += `<strong>Spec:</strong> ${foundWorker.specialization}<br>`;
            }
            resultsHTML += `<strong>Contact:</strong> ${foundWorker.contact}`;
            
            displayResults('search-worker-results', resultsHTML, '', 'info', () => {
                const updatedWorkers = getData('hospitalWorkers').filter(w => w.id !== foundWorker.id);
                saveData('hospitalWorkers', updatedWorkers);
                showMessage('add-worker-output', `Worker ${foundWorker.name} deleted.`, 'warning');
                document.getElementById('search-worker-results').style.display = 'none';
            });
        } else {
             displayResults('search-worker-results', null, `Worker ID "${searchId}" not found!`);
        }
    });

});