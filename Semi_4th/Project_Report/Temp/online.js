document.addEventListener('DOMContentLoaded', () => {
    // --- Data Storage Helper Functions (using localStorage) ---
    function getData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // --- Helper to display messages ---
    function showMessage(elementId, message, isError = false) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.style.color = isError ? 'red' : 'green';
        }
    }

     // --- Helper to display search results ---
     function displayResults(elementId, content, notFoundMessage = "No results found.") {
        const element = document.getElementById(elementId);
         if (element) {
             if (content) {
                element.innerHTML = content; // Use innerHTML to allow formatting
                element.style.color = 'black';
             } else {
                 element.textContent = notFoundMessage;
                 element.style.color = 'red';
             }
         }
     }

    // --- Get DOM Elements (Add more as needed for each section) ---
    const addHospitalForm = document.getElementById('add-hospital-form');
    const searchHospitalForm = document.getElementById('search-hospital-form');

    const addAmbulanceForm = document.getElementById('add-ambulance-form');
    const searchAmbulanceForm = document.getElementById('search-ambulance-form');

    const addBloodForm = document.getElementById('add-blood-form');
    const searchBloodForm = document.getElementById('search-blood-form');

    const addDoctorForm = document.getElementById('add-doctor-form');
    const searchDoctorForm = document.getElementById('search-doctor-form');

    const addSymptomForm = document.getElementById('add-symptom-form');
    const searchPatientForm = document.getElementById('search-patient-form');

    const addPrescriptionForm = document.getElementById('add-prescription-form');
    const presPatientIdInput = document.getElementById('pres-patient-id');
    const presPatientInfoDiv = document.getElementById('pres-patient-info');

    const searchPrescriptionForm = document.getElementById('search-prescription-form');
    const medexRedirectForm = document.getElementById('medex-redirect-form');


    // --- Event Listener: Add Hospital ---
    addHospitalForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const newHospital = {
            name: document.getElementById('hospital-name').value.trim(),
            location: document.getElementById('hospital-location').value.trim(),
            number: document.getElementById('hospital-number').value.trim(),
            availability: document.getElementById('hospital-availability').value.trim()
        };
        if (Object.values(newHospital).some(val => !val)) {
            showMessage('add-hospital-output', 'Error: Please fill all fields.', true); return;
        }
        const hospitals = getData('onlineHospitals');
        hospitals.push(newHospital);
        saveData('onlineHospitals', hospitals);
        showMessage('add-hospital-output', `Hospital ${newHospital.name} added successfully!`);
        addHospitalForm.reset();
    });

    // --- Event Listener: Search Hospital ---
    searchHospitalForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchLocation = document.getElementById('search-hospital-location').value.trim().toLowerCase();
        const hospitals = getData('onlineHospitals');
        const foundHospitals = hospitals.filter(h => h.location.toLowerCase().includes(searchLocation)); // Use includes for partial match

        let resultsHTML = '';
        if (foundHospitals.length > 0) {
            resultsHTML = '<strong>Hospitals Found:</strong><br>';
            foundHospitals.forEach(h => {
                resultsHTML += `
                    --------------------<br>
                    Name: ${h.name}<br>
                    Location: ${h.location}<br>
                    Contact: ${h.number}<br>
                    Availability: ${h.availability}<br>
                `;
            });
        }
        displayResults('search-hospital-results', resultsHTML, 'No hospitals found at that location.');
    });

     // --- Event Listener: Add Ambulance ---
     addAmbulanceForm?.addEventListener('submit', (e) => {
         e.preventDefault();
         const newAmbulance = {
             name: document.getElementById('ambulance-name').value.trim(),
             driver: document.getElementById('ambulance-driver').value.trim(),
             number: document.getElementById('ambulance-number').value.trim(),
             location: document.getElementById('ambulance-location').value.trim(),
             availability: document.getElementById('ambulance-availability').value.trim(),
             status: document.getElementById('ambulance-status').value.trim()
         };
         if (Object.values(newAmbulance).some(val => !val)) {
            showMessage('add-ambulance-output', 'Error: Please fill all fields.', true); return;
         }
         const ambulances = getData('onlineAmbulances');
         ambulances.push(newAmbulance);
         saveData('onlineAmbulances', ambulances);
         showMessage('add-ambulance-output', `Ambulance ${newAmbulance.name} added successfully!`);
         addAmbulanceForm.reset();
     });

     // --- Event Listener: Search Ambulance ---
    searchAmbulanceForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchLocation = document.getElementById('search-ambulance-location').value.trim().toLowerCase();
        const ambulances = getData('onlineAmbulances');
        const foundAmbulances = ambulances.filter(a => a.location.toLowerCase().includes(searchLocation));

        let resultsHTML = '';
        if (foundAmbulances.length > 0) {
            resultsHTML = '<strong>Ambulances Found:</strong><br>';
            foundAmbulances.forEach(a => {
                resultsHTML += `
                    --------------------<br>
                    Service Name: ${a.name}<br>
                    Driver: ${a.driver}<br>
                    Contact: ${a.number}<br>
                    Location: ${a.location}<br>
                    Availability: ${a.availability}<br>
                    Status: ${a.status}<br>
                `;
            });
        }
        displayResults('search-ambulance-results', resultsHTML, 'No ambulances found at that location.');
    });

     // --- Event Listener: Add Blood Bank Data ---
     addBloodForm?.addEventListener('submit', (e) => {
         e.preventDefault();
         const newBloodBank = {
             group: document.getElementById('blood-group').value.trim(),
             bankName: document.getElementById('blood-bank-name').value.trim(),
             number: document.getElementById('blood-bank-number').value.trim(),
             location: document.getElementById('blood-bank-location').value.trim(),
             availability: document.getElementById('blood-bank-availability').value.trim(),
             status: document.getElementById('blood-bank-status').value.trim()
         };
         if (Object.values(newBloodBank).some(val => !val)) {
             showMessage('add-blood-output', 'Error: Please fill all fields.', true); return;
         }
         const bloodBanks = getData('onlineBloodBanks');
         bloodBanks.push(newBloodBank);
         saveData('onlineBloodBanks', bloodBanks);
         showMessage('add-blood-output', `Blood Bank ${newBloodBank.bankName} info added successfully!`);
         addBloodForm.reset();
     });

    // --- Event Listener: Search Blood Bank Data ---
    searchBloodForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchLocation = document.getElementById('search-blood-location').value.trim().toLowerCase();
        const bloodBanks = getData('onlineBloodBanks');
        const foundBanks = bloodBanks.filter(b => b.location.toLowerCase().includes(searchLocation));

        let resultsHTML = '';
        if (foundBanks.length > 0) {
            resultsHTML = '<strong>Blood Banks Found:</strong><br>';
            foundBanks.forEach(b => {
                resultsHTML += `
                    --------------------<br>
                    Blood Group: ${b.group}<br>
                    Bank Name: ${b.bankName}<br>
                    Contact: ${b.number}<br>
                    Location: ${b.location}<br>
                    Availability: ${b.availability}<br>
                    Status: ${b.status}<br>
                `;
            });
        }
        displayResults('search-blood-results', resultsHTML, 'No blood banks found at that location.');
    });

    // --- Event Listener: Add Doctor Data ---
    addDoctorForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const newDoctor = {
             name: document.getElementById('doctor-name').value.trim(),
             specialization: document.getElementById('online-doctor-specialization').value.trim(),
             number: document.getElementById('doctor-number').value.trim(),
             location: document.getElementById('doctor-location').value.trim(),
             availability: document.getElementById('doctor-availability').value.trim(),
             fees: parseFloat(document.getElementById('doctor-fees').value),
             status: document.getElementById('doctor-status').value.trim()
         };
        if (Object.values(newDoctor).some(val => val === '' || val === null || (typeof val === 'number' && isNaN(val)))) {
             showMessage('add-doctor-output', 'Error: Please fill all fields correctly.', true); return;
         }
         const doctors = getData('onlineDoctors');
         doctors.push(newDoctor);
         saveData('onlineDoctors', doctors);
         showMessage('add-doctor-output', `Doctor ${newDoctor.name} added successfully!`);
         addDoctorForm.reset();
     });

     // --- Event Listener: Search Doctor Data ---
     searchDoctorForm?.addEventListener('submit', (e) => {
         e.preventDefault();
         const searchLocation = document.getElementById('search-doctor-location').value.trim().toLowerCase();
         const doctors = getData('onlineDoctors');
         const foundDoctors = doctors.filter(d => d.location.toLowerCase().includes(searchLocation));

         let resultsHTML = '';
         if (foundDoctors.length > 0) {
             resultsHTML = '<strong>Doctors Found:</strong><br>';
             foundDoctors.forEach(d => {
                 resultsHTML += `
                     --------------------<br>
                     Name: ${d.name}<br>
                     Specialization: ${d.specialization}<br>
                     Contact: ${d.number}<br>
                     Location: ${d.location}<br>
                     Availability: ${d.availability}<br>
                     Fees: ${d.fees === 0 ? 'Free' : d.fees}<br>
                     Status: ${d.status}<br>
                 `;
             });
         }
         displayResults('search-doctor-results', resultsHTML, 'No doctors found at that location.');
     });

     // --- Event Listener: Patient Give Symptom ---
     addSymptomForm?.addEventListener('submit', (e) => {
         e.preventDefault();
         const newSymptomData = {
             id: document.getElementById('patient-id').value.trim(),
             name: document.getElementById('patient-name').value.trim(),
             age: document.getElementById('patient-age').value.trim(), // Keep as string
             symptom: document.getElementById('patient-symptom').value.trim()
         };
         if (Object.values(newSymptomData).some(val => !val)) {
            showMessage('add-symptom-output', 'Error: Please fill all fields.', true); return;
         }
         const patientSymptoms = getData('onlinePatientSymptoms');
         // Check for duplicate Patient ID
         if (patientSymptoms.some(p => p.id === newSymptomData.id)) {
              showMessage('add-symptom-output', `Error: Patient ID ${newSymptomData.id} already exists. Use a unique ID.`, true); return;
         }

         patientSymptoms.push(newSymptomData);
         saveData('onlinePatientSymptoms', patientSymptoms);
         showMessage('add-symptom-output', `Symptoms for Patient ID ${newSymptomData.id} submitted successfully.`);
         addSymptomForm.reset();
     });

    // --- Event Listener: Doctor Search Patient Data ---
    searchPatientForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchId = document.getElementById('search-patient-id').value.trim();
        const patientSymptoms = getData('onlinePatientSymptoms');
        const foundPatient = patientSymptoms.find(p => p.id === searchId);

        let resultsHTML = '';
        if (foundPatient) {
            resultsHTML = `
                <strong>Patient Found:</strong><br>
                Patient ID: ${foundPatient.id}<br>
                Name: ${foundPatient.name}<br>
                Age: ${foundPatient.age}<br>
                Symptoms: ${foundPatient.symptom}<br>
            `;
        }
         displayResults('search-patient-results', resultsHTML, 'Patient ID not found.');
    });


    // --- Logic for Prescription Section ---

    // Function to find patient and display info when ID is entered in prescription form
    function verifyPatientForPrescription() {
        const patientId = presPatientIdInput.value.trim();
        const patientSymptoms = getData('onlinePatientSymptoms');
        const foundPatient = patientSymptoms.find(p => p.id === patientId);
         if (foundPatient) {
            presPatientInfoDiv.innerHTML = `
                 <strong>Patient Verified:</strong><br>
                 Name: ${foundPatient.name}<br>
                 Age: ${foundPatient.age}<br>
                 Symptoms: ${foundPatient.symptom}
             `;
             presPatientInfoDiv.style.color = 'green';
             return true; // Patient found
         } else {
            presPatientInfoDiv.textContent = 'Patient ID not found. Cannot add prescription.';
            presPatientInfoDiv.style.color = 'red';
            return false; // Patient not found
         }
    }

    // Add event listener to the Patient ID input in the prescription form
    presPatientIdInput?.addEventListener('input', verifyPatientForPrescription);
    presPatientIdInput?.addEventListener('change', verifyPatientForPrescription); // Also check on losing focus

    // Event Listener: Doctor Give Prescription
    addPrescriptionForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const patientId = document.getElementById('pres-patient-id').value.trim();

        // Re-verify patient exists before saving prescription
        if (!verifyPatientForPrescription()) {
             showMessage('add-prescription-output', 'Error: Cannot add prescription. Patient ID not verified.', true);
             return;
         }

        const newPrescription = {
             patientId: patientId, // Link prescription to patient
             medicineName: document.getElementById('medicine-name').value.trim(),
             time: document.getElementById('medicine-time').value.trim(),
             dose: document.getElementById('medicine-dose').value.trim(),
             days: document.getElementById('medicine-days').value.trim(),
             timestamp: new Date().toLocaleString() // Add a timestamp
         };

         if (!newPrescription.medicineName || !newPrescription.time || !newPrescription.dose || !newPrescription.days) {
             showMessage('add-prescription-output', 'Error: Please fill all prescription fields.', true); return;
         }

         const prescriptions = getData('onlinePrescriptions');
         // Add the new prescription
         prescriptions.push(newPrescription);
         saveData('onlinePrescriptions', prescriptions);

         showMessage('add-prescription-output', `Prescription added for Patient ID ${patientId} successfully!`);
         addPrescriptionForm.reset();
         presPatientInfoDiv.textContent = 'Enter Patient ID above to verify patient details.'; // Reset verification div
         presPatientInfoDiv.style.color = 'black';
     });

     // --- Event Listener: Patient Search Prescription ---
    searchPrescriptionForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchId = document.getElementById('search-pres-patient-id').value.trim();
        const patientSymptoms = getData('onlinePatientSymptoms');
        const prescriptions = getData('onlinePrescriptions');

        const foundPatient = patientSymptoms.find(p => p.id === searchId);
        const foundPrescriptions = prescriptions.filter(pres => pres.patientId === searchId);

        let resultsHTML = '';
        if (foundPatient) {
            resultsHTML = `
                <strong>Patient Information:</strong><br>
                Patient ID: ${foundPatient.id}<br>
                Name: ${foundPatient.name}<br>
                Age: ${foundPatient.age}<br>
                <br>
                <strong>Prescriptions:</strong><br>`;

            if (foundPrescriptions.length > 0) {
                // Sort by timestamp if needed, newest first
                foundPrescriptions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                foundPrescriptions.forEach(pres => {
                    resultsHTML += `
                        --------------------<br>
                        Date: ${pres.timestamp}<br>
                        Medicine: ${pres.medicineName}<br>
                        Time: ${pres.time}<br>
                        Dose: ${pres.dose}<br>
                        Days: ${pres.days}<br>
                    `;
                });
            } else {
                resultsHTML += "No prescriptions found for this Patient ID.";
            }
        } else {
            resultsHTML = "Patient ID not found.";
        }

        displayResults('search-prescription-results', resultsHTML, 'Patient ID not found.');
    });

    // --- Event Listener: Medex Redirect ---
    medexRedirectForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const medicineName = document.getElementById('medex-medicine-name').value.trim();
        if (medicineName) {
            const url = `https://medex.com.bd/search?search=${encodeURIComponent(medicineName)}`;
            showMessage('medex-redirect-output', `Redirecting to: ${url}`);
            // Open in a new tab
            window.open(url, '_blank');
            medexRedirectForm.reset();
        } else {
             showMessage('medex-redirect-output', 'Error: Please enter a medicine name.', true);
        }
    });

}); // End DOMContentLoaded