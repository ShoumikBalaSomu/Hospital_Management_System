document.addEventListener('DOMContentLoaded', () => {

    // --- Data Storage ---
    function getData(key) {
        try { return JSON.parse(localStorage.getItem(key)) || []; }
        catch (e) { return []; }
    }

    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // --- UI Helpers ---
    function showMessage(elementId, message, type = 'info') {
        const el = document.getElementById(elementId);
        if (!el) return;
        const icon = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' }[type];
        el.innerHTML = message ? `<i class="fas ${icon}"></i> <span>${message}</span>` : '';
        el.className = `output ${message ? type : ''}`;
        el.style.display = message ? 'flex' : 'none';
        if (message && type !== 'error') setTimeout(() => { el.style.display = 'none'; }, 5000);
    }

    function displayResults(elementId, html, errorMsg = "Not found.", type = 'info', deleteFn = null) {
        const el = document.getElementById(elementId);
        if (!el) return;
        el.className = `results ${html ? type : 'error'}`;
        el.style.display = 'flex';
        el.style.flexDirection = 'column';
        
        if (html) {
            el.innerHTML = `<div>${html}</div>` + (deleteFn ? `<button class="btn btn-secondary btn-sm delete-btn" style="margin-top:1rem; color:var(--danger); border-color:var(--danger); font-size:0.8rem;"><i class="fas fa-trash"></i> Delete</button>` : '');
            if (deleteFn) el.querySelector('.delete-btn').onclick = deleteFn;
        } else {
            el.innerHTML = `<i class="fas fa-exclamation-circle"></i> <span>${errorMsg}</span>`;
        }
    }

    // --- Hospital Management ---
    const addHospitalForm = document.getElementById('add-hospital-form');
    addHospitalForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('hospital-name').value.trim();
        const location = document.getElementById('hospital-location').value.trim();
        const number = document.getElementById('hospital-number').value.trim();
        const availability = document.getElementById('hospital-availability').value.trim();
        
        if (!name || !location) return showMessage('add-hospital-output', 'Name and Location required.', 'error');
        
        const data = getData('onlineHospitals');
        data.push({ name, location, number, availability });
        saveData('onlineHospitals', data);
        showMessage('add-hospital-output', `Hospital ${name} saved.`, 'success');
        addHospitalForm.reset();
    });

    const searchHospitalForm = document.getElementById('search-hospital-form');
    searchHospitalForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const loc = document.getElementById('search-hospital-location').value.trim().toLowerCase();
        const results = getData('onlineHospitals').filter(h => h.location.toLowerCase().includes(loc));
        
        if (results.length) {
            let html = `<strong>Found ${results.length} Hospitals</strong>`;
            results.forEach((h, i) => {
                html += `<hr style="margin:0.5rem 0; opacity:0.2;"><strong>${h.name}</strong><br>${h.location}<br>${h.number}`;
            });
            displayResults('search-hospital-results', html, '', 'info', () => {
                const filtered = getData('onlineHospitals').filter(h => !h.location.toLowerCase().includes(loc));
                saveData('onlineHospitals', filtered);
                showMessage('add-hospital-output', 'Filtered records deleted.', 'warning');
                document.getElementById('search-hospital-results').style.display = 'none';
            });
        } else displayResults('search-hospital-results', null, 'No matches.');
    });

    // --- Ambulance Management ---
    const addAmbulanceForm = document.getElementById('add-ambulance-form');
    addAmbulanceForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('ambulance-name').value.trim();
        const driver = document.getElementById('ambulance-driver').value.trim();
        const num = document.getElementById('ambulance-number').value.trim();
        const loc = document.getElementById('ambulance-location').value.trim();
        
        const data = getData('onlineAmbulances');
        data.push({ name, driver, num, loc });
        saveData('onlineAmbulances', data);
        showMessage('add-ambulance-output', 'Ambulance data saved.', 'success');
        addAmbulanceForm.reset();
    });

    const searchAmbulanceForm = document.getElementById('search-ambulance-form');
    searchAmbulanceForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const loc = document.getElementById('search-ambulance-location').value.trim().toLowerCase();
        const res = getData('onlineAmbulances').filter(a => a.loc.toLowerCase().includes(loc));
        if (res.length) {
            let html = `<strong>${res.length} Ambulances found</strong>`;
            res.forEach(a => html += `<hr style="margin:0.5rem 0; opacity:0.1;"><strong>${a.name}</strong><br>Driver: ${a.driver}<br>Loc: ${a.loc}`);
            displayResults('search-ambulance-results', html, '', 'info', () => {
                saveData('onlineAmbulances', getData('onlineAmbulances').filter(a => !a.loc.toLowerCase().includes(loc)));
                document.getElementById('search-ambulance-results').style.display = 'none';
            });
        } else displayResults('search-ambulance-results', null, 'No results.');
    });

    // --- Blood Bank ---
    const addBloodForm = document.getElementById('add-blood-form');
    addBloodForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const group = document.getElementById('blood-group').value.trim();
        const name = document.getElementById('blood-bank-name').value.trim();
        const data = getData('onlineBloodBanks');
        data.push({ group, name, loc: document.getElementById('blood-bank-location').value.trim() });
        saveData('onlineBloodBanks', data);
        showMessage('add-blood-output', 'Blood data added.', 'success');
        addBloodForm.reset();
    });

    // --- Doctor Search ---
    const searchDoctorForm = document.getElementById('search-doctor-form');
    searchDoctorForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const loc = document.getElementById('search-doctor-location').value.trim().toLowerCase();
        const res = getData('onlineDoctors').filter(d => d.location.toLowerCase().includes(loc));
        if (res.length) {
            let html = `<strong>${res.length} Doctors found</strong>`;
            res.forEach(d => html += `<hr style="margin:0.5rem 0; opacity:0.1;"><strong>${d.name}</strong><br>${d.specialization}`);
            displayResults('search-doctor-results', html, '', 'info');
        } else displayResults('search-doctor-results', null, 'No doctors found.');
    });

    // --- Patient Symptoms ---
    const addSymptomForm = document.getElementById('add-symptom-form');
    addSymptomForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('patient-id').value.trim();
        const name = document.getElementById('patient-name').value.trim();
        const symptom = document.getElementById('patient-symptom').value.trim();
        const data = getData('onlinePatientSymptoms');
        data.push({ id, name, symptom });
        saveData('onlinePatientSymptoms', data);
        showMessage('add-symptom-output', 'Symptoms submitted.', 'success');
        addSymptomForm.reset();
    });

    // --- Medex Search ---
    document.getElementById('medex-redirect-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const med = document.getElementById('medex-medicine-name').value.trim();
        if (med) window.open(`https://medex.com.bd/search?search=${encodeURIComponent(med)}`, '_blank');
    });

});