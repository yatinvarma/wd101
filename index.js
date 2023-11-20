document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();  
    let dobInput = document.getElementById('dob');
    let dob = new Date(dobInput.value);
    let today = new Date();
    let minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 55);
    let maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 18);

    if (dob < minDate || dob > maxDate) {
        alert('Date of birth must have to be between 18 and 55 years.');
        return;
    }
    let formData = {
        name: document.getElementById('Name').value,
        email: document.getElementById('Email').value,
        password: document.getElementById('Password').value,
        dob: document.getElementById('dob').value,
        terms: document.getElementById('Terms').checked
    };
    let entries = JSON.parse(localStorage.getItem('Entries')) || [];
    entries.unshift(formData);
    localStorage.setItem('Entries', JSON.stringify(entries));
    updateTable();
});

function updateTable() {
   
    let tableBody = document.getElementById('UserTable').getElementsByTagName('tbody')[0];
    let entries = JSON.parse(localStorage.getItem('Entries')) || [];

   
    tableBody.innerHTML = '';

    
    entries.forEach(entry => {
        let row = tableBody.insertRow();
        Object.values(entry).forEach(value => {
            let cell = row.insertCell();
            cell.appendChild(document.createTextNode(value));
        });
    });
}
window.addEventListener('load', updateTable);
