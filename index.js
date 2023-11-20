function saveUserForm(event) {
    event.preventDefault();

    const Name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;

    var currentYear = new Date().getFullYear();
    var birthYear = dob.split("-");
    let year = birthYear[0];
    var age = currentYear - year;

    if (age < 18 || age > 55) {
        document.getElementById('dob').style.border = '1px solid red';
        alert("Age must be between 18 and 55");
    } else {
        document.getElementById('dob').style.border = 'none';

        const entry = {
            Name,
            email,
            password,
            dob,
            acceptTerms
        };

        let entries = JSON.parse(localStorage.getItem('userEntries')) || [];
        entries.push(entry);

        localStorage.setItem('userEntries', JSON.stringify(entries));
        displayEntries();
        document.getElementById('userform').reset();
    }
}

function display() {
    let entries = JSON.parse(localStorage.getItem('userEntries')) || [];
    let tableBody = document.querySelector('#userentries tbody');
    tableBody.innerHTML = '';

    entries.forEach(entry => {
        const row = `<tr>
            <td>${entry.Name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.acceptTerms ? 'Yes' : 'No'}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

document.getElementById('userform').addEventListener('submit', saveUserForm);
display();
