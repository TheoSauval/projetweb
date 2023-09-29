document.addEventListener('DOMContentLoaded', function() {
    const contactList = document.getElementById('contact-list');
    const addContactForm = document.getElementById('add-contact-form');

    addContactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const number = document.getElementById('number').value;

        const newContact = document.createElement('li');
        newContact.innerHTML = `
            <span data-name="${name}" data-surname="${surname}" data-number="${number}">${name} ${surname} - ${number}</span>
            <button>Supprimer</button> <button class="edit">Modifier</button>
        `;

        newContact.querySelector('button').addEventListener('click', function() {
            newContact.remove();
            saveContacts();
        });

        newContact.querySelector('button.edit').addEventListener('click', function() {
            const span = newContact.querySelector('span');
            span.innerHTML = `
                <input type="text" id="edit-name" value="${name}">
                <input type="text" id="edit-surname" value="${surname}">
                <input type="text" id="edit-number" value="${number}">
                <button class="save">Enregistrer</button>
            `;

            newContact.querySelector('button.save').addEventListener('click', function() {
                const editedName = document.getElementById('edit-name').value;
                const editedSurname = document.getElementById('edit-surname').value;
                const editedNumber = document.getElementById('edit-number').value;

                span.innerHTML = `${editedName} ${editedSurname} - ${editedNumber}`;
                saveContacts();
            });
        });

        contactList.appendChild(newContact);
        saveContacts();
    });

    function saveContacts() {
        const contacts = [];
        contactList.querySelectorAll('li').forEach(contact => {
            const name = contact.querySelector('span').dataset.name;
            const surname = contact.querySelector('span').dataset.surname;
            const number = contact.querySelector('span').dataset.number;
            contacts.push({ name, surname, number });
        });
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    function loadContacts() {
        const savedContacts = JSON.parse(localStorage.getItem('contacts'));
        if (savedContacts) {
            savedContacts.forEach(contact => {
                const newContact = document.createElement('li');
                newContact.innerHTML = `
                    <span data-name="${contact.name}" data-surname="${contact.surname}" data-number="${contact.number}">${contact.name} ${contact.surname} - ${contact.number}</span>
                    <button>Supprimer</button> <button class="edit">Modifier</button>
                `;

                newContact.querySelector('button').addEventListener('click', function() {
                    newContact.remove();
                    saveContacts();
                });

                newContact.querySelector('button.edit').addEventListener('click', function() {
                    const span = newContact.querySelector('span');
                    span.innerHTML = `
                        <input type="text" id="edit-name" value="${contact.name}">
                        <input type="text" id="edit-surname" value="${contact.surname}">
                        <input type="text" id="edit-number" value="${contact.number}">
                        <button class="save">Enregistrer</button>
                    `;

                    newContact.querySelector('button.save').addEventListener('click', function() {
                        const editedName = document.getElementById('edit-name').value;
                        const editedSurname = document.getElementById('edit-surname').value;
                        const editedNumber = document.getElementById('edit-number').value;

                        contact.name = editedName;
                        contact.surname = editedSurname;
                        contact.number = editedNumber;

                        span.innerHTML = `${editedName} ${editedSurname} - ${editedNumber}`;

                        saveContacts();
                    });
                });

                contactList.appendChild(newContact);
            });
        }
    }

    loadContacts();
});
