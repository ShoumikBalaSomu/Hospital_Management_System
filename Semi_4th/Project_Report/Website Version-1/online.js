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

    // --- Helper to display messages with CSS classes AND icons ---
     function showMessage(elementId, message, type = 'info') {
         const element = document.getElementById(elementId);
        if (!element) {
             console.error(`showMessage: Element with ID "${elementId}" not found!`);
             return;
        }
        let iconClass = '';
         switch (type) { /* ... cases as in internal.js ... */
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
             }, 6000);
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
        // Special handling for patient verification div
        if(elementId === 'pres-patient-info') {
            if (contentHTML) {
                element.innerHTML = `<div class="result-content">${contentHTML}</div>`; // Wrap content
                 element.classList.add(type); // Typically 'success'
                 element.style.display = 'flex'; // Make sure it's visible
             } else {
                 let iconClass = 'fas fa-exclamation-circle';
                 // Set default text or error text based on notFoundMessage
                  if(notFoundMessage){ // If error message provided
                      element.innerHTML = `<i class="${iconClass}"></i> <span class="message-text">${notFoundMessage}</span>`;
                      element.classList.add('error');
                      element.style.display = 'flex';
                  } else { // If just clearing (contentHTML is null, no error message)
                       element.innerHTML = '<i class="fas fa-info-circle"></i> <span class="message-text">Enter Patient ID above to verify patient details.</span>';
                       element.classList.add('info'); // Reset to info state
                       element.style.display = 'flex'; // Keep visible with default message
                 }
             }
        }
         // Handling for all other result divs
        else if (contentHTML) {
           element.innerHTML = `<div class="result-content">${contentHTML}</div>`; // Wrap content
           element.classList.add(type);
           element.style.display = 'flex';
       } else {
           let iconClass = 'fas fa-exclamation-circle';
           element.innerHTML = `<i class="${iconClass}"></i> <span class="message-text">${notFoundMessage}</span>`;
           element.classList.add('error');
           element.style.display = 'flex';
       }
    }

    // --- Get DOM Elements (Add all relevant elements) ---
    const addHospitalForm = document.getElementById('add-hospital-form');
    const addHospitalOutput = document.getElementById('add-hospital-output');
    const searchHospitalForm = document.getElementById('search-hospital-form');
    const searchHospitalResults = document.getElementById('search-hospital-results');
    const addAmbulanceForm = document.getElementById('add-ambulance-form');
    const addAmbulanceOutput = document.getElementById('add-ambulance-output');
    const searchAmbulanceForm = document.getElementById('search-ambulance-form');
    const searchAmbulanceResults = document.getElementById('search-ambulance-results');
    const addBloodForm = document.getElementById('add-blood-form');
    const addBloodOutput = document.getElementById('add-blood-output');
    const searchBloodForm = document.getElementById('search-blood-form');
    const searchBloodResults = document.getElementById('search-blood-results');
    const addDoctorForm = document.getElementById('add-doctor-form');
    const addDoctorOutput = document.getElementById('add-doctor-output');
    const searchDoctorForm = document.getElementById('search-doctor-form');
    const searchDoctorResults = document.getElementById('search-doctor-results');
    const addSymptomForm = document.getElementById('add-symptom-form');
    const addSymptomOutput = document.getElementById('add-symptom-output');
    const searchPatientForm = document.getElementById('search-patient-form');
    const searchPatientResults = document.getElementById('search-patient-results');
    const addPrescriptionForm = document.getElementById('add-prescription-form');
    const addPrescriptionOutput = document.getElementById('add-prescription-output');
    const presPatientIdInput = document.getElementById('pres-patient-id');
    const presPatientInfoDiv = document.getElementById('pres-patient-info');
    const searchPrescriptionForm = document.getElementById('search-prescription-form');
    const searchPrescriptionResults = document.getElementById('search-prescription-results');
    const medexRedirectForm = document.getElementById('medex-redirect-form');
    const medexRedirectOutput = document.getElementById('medex-redirect-output');

     // --- Initially hide all output/results areas ---
    const allOutputs = document.querySelectorAll('.output, .results');
    allOutputs.forEach(el => el.style.display = 'none');
    // Except patient verification div, which gets default text later
    if (presPatientInfoDiv) presPatientInfoDiv.style.display = 'flex'; // Start visible


    // --- Event Listener: Add Hospital ---
    addHospitalForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('hospital-name');
        const locationInput = document.getElementById('hospital-location');
        const numberInput = document.getElementById('hospital-number');
        const availabilityInput = document.getElementById('hospital-availability');

        const newHospital = {
            name: nameInput?.value.trim(),
            location: locationInput?.value.trim(),
            number: numberInput?.value.trim(),
            availability: availabilityInput?.value.trim()
        };

        if (!newHospital.name || !newHospital.location || !newHospital.number || !newHospital.availability) {
            showMessage('add-hospital-output', 'Error: Please fill all fields.', 'error'); return;
        }

        const hospitals = getData('onlineHospitals');
        if (Array.isArray(hospitals)) {
            hospitals.push(newHospital);
            saveData('onlineHospitals', hospitals);
            showMessage('add-hospital-output', `Hospital ${newHospital.name} added successfully!`, 'success');
            addHospitalForm.reset();
        } else {
             showMessage('add-hospital-output', 'Error: Could not retrieve hospital data.', 'error');
        }
    });

    // --- Event Listener: Search Hospital ---
    searchHospitalForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = document.getElementById('search-hospital-location');
        const searchLocation = searchInput?.value.trim().toLowerCase();
        const originalSearchTerm = searchInput?.value.trim(); // Keep original case for message

        if (!searchLocation) {
             displayResults('search-hospital-results', null, 'Please enter a location to search.');
            return;
        }

        const hospitals = getData('onlineHospitals');
        const foundHospitals = Array.isArray(hospitals) ? hospitals.filter(h => h && h.location && h.location.toLowerCase().includes(searchLocation)) : [];

        if (foundHospitals.length > 0) {
             let resultsHTML = `<strong><i class="fas fa-clinic-medical"></i> Found ${foundHospitals.length} Hospital(s):</strong>`;
            foundHospitals.forEach(h => {
                resultsHTML += `<hr>
                    <strong>Name:</strong> ${h.name}<br>
                    <strong>Location:</strong> ${h.location}<br>
                    <strong>Contact:</strong> ${h.number}<br>
                    <strong>Availability:</strong> ${h.availability}
                `;
            });
            displayResults('search-hospital-results', resultsHTML, '', 'info');
        } else {
            displayResults('search-hospital-results', null, `No hospitals found matching location "${originalSearchTerm}".`);
        }
        if (searchInput) searchInput.value = '';
    });

     // --- Event Listener: Add Ambulance ---
     addAmbulanceForm?.addEventListener('submit', (e) => {
         e.preventDefault();
          const nameInput = document.getElementById('ambulance-name');
          const driverInput = document.getElementById('ambulance-driver');
          const numberInput = document.getElementById('ambulance-number');
          const locationInput = document.getElementById('ambulance-location');
          const availabilityInput = document.getElementById('ambulance-availability');
          const statusInput = document.getElementById('ambulance-status');

          const newAmbulance = {
             name: nameInput?.value.trim(),
             driver: driverInput?.value.trim(),
             number: numberInput?.value.trim(),
             location: locationInput?.value.trim(),
             availability: availabilityInput?.value.trim(),
             status: statusInput?.value.trim()
         };

         if (!newAmbulance.name || !newAmbulance.driver || !newAmbulance.number || !newAmbulance.location || !newAmbulance.availability || !newAmbulance.status) {
            showMessage('add-ambulance-output', 'Error: Please fill all fields.', 'error'); return;
         }

          const ambulances = getData('onlineAmbulances');
          if(Array.isArray(ambulances)) {
            ambulances.push(newAmbulance);
            saveData('onlineAmbulances', ambulances);
            showMessage('add-ambulance-output', `Ambulance ${newAmbulance.name} added successfully!`, 'success');
            addAmbulanceForm.reset();
         } else {
              showMessage('add-ambulance-output', 'Error: Could not retrieve ambulance data.', 'error');
         }
     });

     // --- Event Listener: Search Ambulance ---
    searchAmbulanceForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = document.getElementById('search-ambulance-location');
        const searchLocation = searchInput?.value.trim().toLowerCase();
         const originalSearchTerm = searchInput?.value.trim();

         if (!searchLocation) {
             displayResults('search-ambulance-results', null, 'Please enter a location to search.');
             return;
         }

        const ambulances = getData('onlineAmbulances');
        const foundAmbulances = Array.isArray(ambulances) ? ambulances.filter(a => a && a.location && a.location.toLowerCase().includes(searchLocation)) : [];

        if (foundAmbulances.length > 0) {
            let resultsHTML = `<strong><i class="fas fa-ambulance"></i> Found ${foundAmbulances.length} Ambulance(s):</strong>`;
            foundAmbulances.forEach(a => {
                resultsHTML += `<hr>
                    <strong>Service:</strong> ${a.name}<br>
                    <strong>Driver:</strong> ${a.driver}<br>
                    <strong>Contact:</strong> ${a.number}<br>
                    <strong>Location:</strong> ${a.location}<br>
                    <strong>Availability:</strong> ${a.availability}<br>
                    <strong>Status:</strong> ${a.status}
                `;
            });
            displayResults('search-ambulance-results', resultsHTML, '', 'info');
        } else {
            displayResults('search-ambulance-results', null, `No ambulances found at location "${originalSearchTerm}".`);
        }
        if (searchInput) searchInput.value = '';
    });

    // --- Event Listener: Add Blood Bank Data ---
    addBloodForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const groupInput = document.getElementById('blood-group');
        const nameInput = document.getElementById('blood-bank-name');
        const numberInput = document.getElementById('blood-bank-number');
        const locationInput = document.getElementById('blood-bank-location');
        const availabilityInput = document.getElementById('blood-bank-availability');
        const statusInput = document.getElementById('blood-bank-status');

        const newBloodBank = {
             group: groupInput?.value.trim(),
             bankName: nameInput?.value.trim(),
             number: numberInput?.value.trim(),
             location: locationInput?.value.trim(),
             availability: availabilityInput?.value.trim(),
             status: statusInput?.value.trim()
         };

         if (!newBloodBank.group || !newBloodBank.bankName || !newBloodBank.number || !newBloodBank.location || !newBloodBank.availability || !newBloodBank.status) {
             showMessage('add-blood-output', 'Error: Please fill all fields.', 'error'); return;
         }

        const bloodBanks = getData('onlineBloodBanks');
         if (Array.isArray(bloodBanks)) {
             bloodBanks.push(newBloodBank);
             saveData('onlineBloodBanks', bloodBanks);
             showMessage('add-blood-output', `Blood Bank ${newBloodBank.bankName} info added successfully!`, 'success');
             addBloodForm.reset();
         } else {
             showMessage('add-blood-output', 'Error: Could not retrieve blood bank data.', 'error');
         }
     });

    // --- Event Listener: Search Blood Bank Data ---
    searchBloodForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = document.getElementById('search-blood-location');
        const searchLocation = searchInput?.value.trim().toLowerCase();
         const originalSearchTerm = searchInput?.value.trim();

         if (!searchLocation) {
             displayResults('search-blood-results', null, 'Please enter a location to search.');
             return;
         }

        const bloodBanks = getData('onlineBloodBanks');
        const foundBanks = Array.isArray(bloodBanks) ? bloodBanks.filter(b => b && b.location && b.location.toLowerCase().includes(searchLocation)) : [];

        if (foundBanks.length > 0) {
            let resultsHTML = `<strong><i class="fas fa-burn"></i> Found ${foundBanks.length} Blood Bank(s):</strong>`;
            foundBanks.forEach(b => {
                resultsHTML += `<hr>
                    <strong>Group:</strong> ${b.group}<br>
                    <strong>Bank Name:</strong> ${b.bankName}<br>
                    <strong>Contact:</strong> ${b.number}<br>
                    <strong>Location:</strong> ${b.location}<br>
                    <strong>Availability:</strong> ${b.availability}<br>
                    <strong>Status:</strong> ${b.status}
                `;
            });
            displayResults('search-blood-results', resultsHTML, '', 'info');
        } else {
            displayResults('search-blood-results', null, `No blood banks found matching location "${originalSearchTerm}".`);
        }
        if (searchInput) searchInput.value = '';
    });

    // --- Event Listener: Add Doctor Data ---
    addDoctorForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('doctor-name');
        const specInput = document.getElementById('online-doctor-specialization');
        const numberInput = document.getElementById('doctor-number');
        const locationInput = document.getElementById('doctor-location');
        const availabilityInput = document.getElementById('doctor-availability');
        const feesInput = document.getElementById('doctor-fees');
        const statusInput = document.getElementById('doctor-status');

        const newDoctor = {
             name: nameInput?.value.trim(),
             specialization: specInput?.value.trim(),
             number: numberInput?.value.trim(),
             location: locationInput?.value.trim(),
             availability: availabilityInput?.value.trim(),
             fees: parseFloat(feesInput?.value),
             status: statusInput?.value.trim()
         };
        if (!newDoctor.name || !newDoctor.specialization || !newDoctor.number || !newDoctor.location || !newDoctor.availability || isNaN(newDoctor.fees) || !newDoctor.status) {
             showMessage('add-doctor-output', 'Error: Please fill all fields correctly (including fees, use 0 if free).', 'error'); return;
         }
        const doctors = getData('onlineDoctors');
         if (Array.isArray(doctors)){
             doctors.push(newDoctor);
             saveData('onlineDoctors', doctors);
             showMessage('add-doctor-output', `Doctor ${newDoctor.name} added successfully!`, 'success');
             addDoctorForm.reset();
         } else {
             showMessage('add-doctor-output', 'Error: Could not retrieve doctor data.', 'error');
         }
     });

     // --- Event Listener: Search Doctor Data ---
     searchDoctorForm?.addEventListener('submit', (e) => {
         e.preventDefault();
        const searchInput = document.getElementById('search-doctor-location');
        const searchLocation = searchInput?.value.trim().toLowerCase();
         const originalSearchTerm = searchInput?.value.trim();

         if (!searchLocation) {
             displayResults('search-doctor-results', null, 'Please enter a location to search.');
             return;
         }

         const doctors = getData('onlineDoctors');
         const foundDoctors = Array.isArray(doctors) ? doctors.filter(d => d && d.location && d.location.toLowerCase().includes(searchLocation)) : [];


         if (foundDoctors.length > 0) {
            let resultsHTML = `<strong><i class="fas fa-user-md"></i> Found ${foundDoctors.length} Doctor(s):</strong>`;
            foundDoctors.forEach(d => {
                 resultsHTML += `<hr>
                     <strong>Name:</strong> ${d.name}<br>
                     <strong>Specialization:</strong> ${d.specialization}<br>
                     <strong>Contact:</strong> ${d.number}<br>
                     <strong>Location:</strong> ${d.location}<br>
                     <strong>Availability:</strong> ${d.availability}<br>
                     <strong>Fees:</strong> ${d.fees === 0 ? 'Free' : d.fees.toFixed(2)}<br>
                     <strong>Status:</strong> ${d.status}
                 `;
             });
              displayResults('search-doctor-results', resultsHTML, '', 'info');
         } else {
             displayResults('search-doctor-results', null, `No doctors found matching location "${originalSearchTerm}".`);
         }
        if (searchInput) searchInput.value = '';
     });

     // --- Event Listener: Patient Give Symptom ---
     addSymptomForm?.addEventListener('submit', (e) => {
         e.preventDefault();
        const idInput = document.getElementById('patient-id');
        const nameInput = document.getElementById('patient-name');
        const ageInput = document.getElementById('patient-age');
        const symptomInput = document.getElementById('patient-symptom');

         const newSymptomData = {
             id: idInput?.value.trim(),
             name: nameInput?.value.trim(),
             age: ageInput?.value.trim(),
             symptom: symptomInput?.value.trim()
         };
         if (!newSymptomData.id || !newSymptomData.name || !newSymptomData.age || !newSymptomData.symptom) {
            showMessage('add-symptom-output', 'Error: Please fill all fields.', 'error'); return;
         }

        const patientSymptoms = getData('onlinePatientSymptoms');
         if (Array.isArray(patientSymptoms) && patientSymptoms.some(p => p && p.id === newSymptomData.id)) {
              showMessage('add-symptom-output', `Error: Patient ID ${newSymptomData.id} already exists.`, 'error'); return;
         }

        if (Array.isArray(patientSymptoms)) {
            patientSymptoms.push(newSymptomData);
            saveData('onlinePatientSymptoms', patientSymptoms);
            showMessage('add-symptom-output', `Symptoms for Patient ID ${newSymptomData.id} submitted.`, 'success');
            addSymptomForm.reset();
        } else {
            showMessage('add-symptom-output', 'Error: Could not retrieve patient data.', 'error');
        }
     });

    // --- Event Listener: Doctor Search Patient Data ---
    searchPatientForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = document.getElementById('search-patient-id');
        const searchId = searchInput?.value.trim();

         if (!searchId) {
             displayResults('search-patient-results', null, 'Please enter a Patient ID to search.');
             return;
         }

        const patientSymptoms = getData('onlinePatientSymptoms');
        const foundPatient = Array.isArray(patientSymptoms) ? patientSymptoms.find(p => p && p.id === searchId) : undefined;

        if (foundPatient) {
           const resultsHTML = `
                <strong><i class="fas fa-user-injured"></i> Patient Details</strong><hr>
                <strong>Patient ID:</strong> ${foundPatient.id}<br>
                <strong>Name:</strong> ${foundPatient.name}<br>
                <strong>Age:</strong> ${foundPatient.age}<br>
                <strong>Symptoms:</strong> ${foundPatient.symptom}
            `;
             displayResults('search-patient-results', resultsHTML, '', 'info');
        } else {
             displayResults('search-patient-results', null, `Patient ID "${searchId}" not found.`);
        }
         if(searchInput) searchInput.value = '';
    });

    // --- Logic for Prescription Section ---
    function verifyPatientForPrescription() {
        const patientId = presPatientIdInput?.value.trim();

        // Use displayResults to show default message initially or when field is cleared
         if (!patientId) {
             displayResults('pres-patient-info', null, ''); // Clear content, no error message needed here
             return false;
         }

        const patientSymptoms = getData('onlinePatientSymptoms');
        const foundPatient = Array.isArray(patientSymptoms) ? patientSymptoms.find(p => p && p.id === patientId) : undefined;

         if (foundPatient) {
            const patientDetails = `
                 <strong><i class="fas fa-user-check"></i> Patient Verified</strong><hr>
                 <strong>ID:</strong> ${foundPatient.id}<br>
                 <strong>Name:</strong> ${foundPatient.name}<br>
                 <strong>Age:</strong> ${foundPatient.age}<br>
                 <strong>Symptoms Recorded:</strong> ${foundPatient.symptom}
             `;
             displayResults('pres-patient-info', patientDetails, '', 'success');
             return true;
         } else {
             displayResults('pres-patient-info', null, `Patient ID "${patientId}" not found.`); // Error msg
             return false;
         }
    }
    // Initial call to set default state for the patient info box
     verifyPatientForPrescription();

    presPatientIdInput?.addEventListener('input', verifyPatientForPrescription);
    presPatientIdInput?.addEventListener('change', verifyPatientForPrescription);

    // Event Listener: Doctor Give Prescription
    addPrescriptionForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const patientIdValue = presPatientIdInput?.value.trim();
        const medicineInput = document.getElementById('medicine-name');
        const timeInput = document.getElementById('medicine-time');
        const doseInput = document.getElementById('medicine-dose');
        const daysInput = document.getElementById('medicine-days');


        // Crucially, re-verify *at the time of submission*
        if (!patientIdValue || !verifyPatientForPrescription()) { // Verify function call inside check
             showMessage('add-prescription-output', 'Error: Patient ID must be valid and verified before adding prescription.', 'error');
             return;
         }

        const newPrescription = {
             patientId: patientIdValue,
             medicineName: medicineInput?.value.trim(),
             time: timeInput?.value.trim(),
             dose: doseInput?.value.trim(),
             days: daysInput?.value.trim(), // Value is string 'days', keep it simple
             timestamp: new Date().toLocaleString()
         };

        if (!newPrescription.medicineName || !newPrescription.time || !newPrescription.dose || !newPrescription.days) {
             showMessage('add-prescription-output', 'Error: Please fill all prescription fields.', 'error'); return;
         }

        const prescriptions = getData('onlinePrescriptions');
         if (Array.isArray(prescriptions)) {
             prescriptions.push(newPrescription);
             saveData('onlinePrescriptions', prescriptions);
             showMessage('add-prescription-output', `Prescription added for Patient ID ${patientIdValue}!`, 'success');
             addPrescriptionForm.reset();
            // Reset verification div after successful submission
            verifyPatientForPrescription(); // Resets to default or empty if ID is now cleared
         } else {
             showMessage('add-prescription-output', 'Error: Could not save prescription data.', 'error');
         }
     });

     // --- Event Listener: Patient Search Prescription ---
    searchPrescriptionForm?.addEventListener('submit', (e) => {
        e.preventDefault();
         const searchInput = document.getElementById('search-pres-patient-id');
        const searchId = searchInput?.value.trim();

        if (!searchId) {
             displayResults('search-prescription-results', null, 'Please enter your Patient ID.');
             return;
         }

        const patientSymptoms = getData('onlinePatientSymptoms');
        const prescriptions = getData('onlinePrescriptions');

        const foundPatient = Array.isArray(patientSymptoms) ? patientSymptoms.find(p => p && p.id === searchId) : undefined;
        const foundPrescriptions = Array.isArray(prescriptions) ? prescriptions
                                        .filter(pres => pres && pres.patientId === searchId)
                                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) : [];

        let resultsHTML = '';
        if (foundPatient) {
            resultsHTML = `
                <strong><i class="fas fa-user-tag"></i> Patient: ${foundPatient.name} (ID: ${foundPatient.id})</strong>
                <br><br>
                <strong><i class="fas fa-file-medical-alt"></i> Prescriptions Found (${foundPrescriptions.length}):</strong>`;

            if (foundPrescriptions.length > 0) {
                foundPrescriptions.forEach(pres => {
                    resultsHTML += `
                        <hr>
                        <strong>Date:</strong> ${pres.timestamp || 'N/A'}<br>
                        <strong>Medicine:</strong> ${pres.medicineName || 'N/A'}<br>
                        <strong>Timing:</strong> ${pres.time || 'N/A'}<br>
                        <strong>Dose:</strong> ${pres.dose || 'N/A'}<br>
                        <strong>Duration:</strong> ${pres.days || 'N/A'} ${parseInt(pres.days) === 1 ? 'day' : 'days'}
                    `;
                });
                displayResults('search-prescription-results', resultsHTML, '', 'info');
            } else {
                resultsHTML += "<hr>No prescriptions on record for this patient.";
                 displayResults('search-prescription-results', resultsHTML, '', 'warning');
            }
        } else {
            displayResults('search-prescription-results', null, `Patient ID "${searchId}" not found.`);
        }
        if (searchInput) searchInput.value = '';
    });

    // --- Event Listener: Medex Redirect ---
    medexRedirectForm?.addEventListener('submit', (e) => {
        e.preventDefault();
         const searchInput = document.getElementById('medex-medicine-name');
        const medicineName = searchInput?.value.trim();
        if (medicineName) {
            const url = `https://medex.com.bd/search?search=${encodeURIComponent(medicineName)}`;
            showMessage('medex-redirect-output', `Opening Medex search for "${medicineName}"...`, 'info');
            window.open(url, '_blank'); // Open in new tab
            if (searchInput) searchInput.value = '';
        } else {
             showMessage('medex-redirect-output', 'Error: Please enter a medicine name.', 'error');
        }
    });

}); // End DOMContentLoaded