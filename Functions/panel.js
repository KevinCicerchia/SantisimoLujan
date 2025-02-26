const infoPanel = document.getElementById('info-panel'); // Asegúrate de que este ID exista en tu HTML

const createHourButtons = (day, month, year) => {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    for (let i = 0; i < 24; i++) {
        const hourButton = document.createElement('button');
        hourButton.classList.add('hour-button');
        hourButton.id = `hour-${day}-${month}-${year}-${i}`;
        hourButton.textContent = `${i.toString().padStart(2, '0')}:00 - ${(i + 1).toString().padStart(2, '0')}:00`;
        hourButton.onclick = () => showDniNamePanel(day, month, year, i);
        buttonContainer.appendChild(hourButton);
    }

    return buttonContainer;
};

const showDniNamePanel = (day, month, year, hour) => {
    if (infoPanel) {
        console.log(`Mostrando panel para el ${day}/${month}/${year} a las ${hour}`);
        infoPanel.style.display = 'block';
        infoPanel.innerHTML = '';

        const dateHeader = document.createElement('h2');
        dateHeader.textContent = `Ingrese su Nombre y DNI ${day}/${month}/${year} de ${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`;
        infoPanel.appendChild(dateHeader);

        const infoInputs = document.createElement('div');
        infoInputs.classList.add('info-inputs');

        const nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', 'name');
        nameLabel.textContent = 'Nombre:';
        infoInputs.appendChild(nameLabel);

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'name';
        nameInput.name = 'name';
        infoInputs.appendChild(nameInput);

        const dniLabel = document.createElement('label');
        dniLabel.setAttribute('for', 'dni');
        dniLabel.textContent = 'DNI:';
        infoInputs.appendChild(dniLabel);

        const dniInput = document.createElement('input');
        dniInput.type = 'text';
        dniInput.id = 'dni';
        dniInput.name = 'dni';
        infoInputs.appendChild(dniInput);

        infoPanel.appendChild(infoInputs);

        // Botón de guardar la información
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Guardar';
        saveButton.classList.add('save-button');
        saveButton.onclick = () => {
            const name = nameInput.value.trim();
            const dni = dniInput.value.trim();
            if (name && dni) {
                saveInfo(day, month, year, hour, name, dni);
                const hourButton = document.getElementById(`hour-${day}-${month}-${year}-${hour}`);
                if (hourButton) {
                    hourButton.style.backgroundColor = 'red';
                    hourButton.disabled = true;
                    hourButton.textContent = 'Adorar al santísimo';
                    console.log(`Horario ${hour} para el día ${day}/${month}/${year} pintado de rojo y guardado.`);
                } else {
                    console.log(`No se encontró el botón para el horario ${hour} del día ${day}/${month}/${year}.`);
                }
            } else {
                alert('Debe ingresar tanto el nombre como el DNI.');
            }
        };
        infoPanel.appendChild(saveButton);

        // Botón de cerrar el panel
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Cerrar';
        closeButton.classList.add('close-button');
        closeButton.onclick = () => {
            infoPanel.style.display = 'none';
        };
        infoPanel.appendChild(closeButton);
    } else {
        console.log('infoPanel no encontrado.');
    }
};

const saveInfo = (day, month, year, hour, name, dni) => {
    const savedInfo = JSON.parse(localStorage.getItem('savedInfo')) || {};
    const key = `${day}-${month}-${year}-${hour}`;
    savedInfo[key] = {
        name: name,
        dni: dni,
        text: 'Adorar al santísimo'
    };
    localStorage.setItem('savedInfo', JSON.stringify(savedInfo));
    console.log(`Información guardada para el horario ${hour} del día ${day}/${month}/${year}.`);

    infoPanel.innerHTML = '';
    infoPanel.style.display = 'none';
};

const loadSavedInfo = () => {
    const savedInfo = JSON.parse(localStorage.getItem('savedInfo')) || {};
    Object.keys(savedInfo).forEach(key => {
        const [day, month, year, hour] = key.split('-');
        const hourButton = document.getElementById(`hour-${day}-${month}-${year}-${hour}`);
        if (hourButton) {
            hourButton.style.backgroundColor = 'red';
            hourButton.disabled = true;
            hourButton.textContent = savedInfo[key].text;
        }
    });
    console.log("Información cargada desde el localStorage.");
};

document.addEventListener('DOMContentLoaded', loadSavedInfo);
