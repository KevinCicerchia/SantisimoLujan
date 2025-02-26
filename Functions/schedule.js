function refreshSchedule() {
    renderSchedule();
}

let scheduleContainer;
let savedInfoContainer;
let day, month, year;

function renderSchedule() {
    scheduleContainer.empty(); // Limpiar el contenedor antes de renderizar
    scheduleContainer.append(`<h2 class="center-text">Horarios para el ${day}/${month}/${year}</h2>`);
    savedInfoContainer.empty(); // Limpiar el contenedor de datos guardados
    savedInfoContainer.append('<h3 class="center-text">Horarios Ocupados</h3>'); // Cambiado a "Horarios Ocupados"

    const savedInfo = JSON.parse(localStorage.getItem('savedInfo')) || {};
    const keyPrefix = `${day}-${month}-${year}-`;

    for (let hour = 0; hour < 24; hour++) {
        const key = `${keyPrefix}${hour}`;
        const hourButton = $('<button></button>')
            .addClass('hour-button')
            .attr('id', `hour-${day}-${month}-${year}-${hour}`)
            .text(`${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`);

        if (savedInfo[key]) {
            const info = savedInfo[key];
            if (info && info.name && info.dni) {
                hourButton.addClass('occupied').text('Horario Ocupado').data('info', info);
                scheduleContainer.append(hourButton);
                createEditButtons(hourButton, info).hide();
                savedInfoContainer.append(`<p>${info.name} (${info.dni}) para el ${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00</p>`);
            }
        } else {
            hourButton.addClass('available');
            hourButton.click(() => {
                showDniNamePanel(day, month, year, hour, savedInfoContainer);
            });
            scheduleContainer.append(hourButton);
        }
    }

    // Añadir la sección de datos guardados al final
    scheduleContainer.append(savedInfoContainer);
}

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    day = urlParams.get('day');
    month = urlParams.get('month');
    year = urlParams.get('year');

    scheduleContainer = $('#schedule-container');
    savedInfoContainer = $('#saved-info-container');

    // Ocultar el botón de "Refrescar Horarios" temporalmente
    $('#refresh-button').addClass('hidden');

    $('#set-all-available-button').click(function() {
        setAllAvailable();
    });

    $('#clear-storage-button').click(function() {
        clearLocalStorage();
    });

    renderSchedule();
});

function showDniNamePanel(day, month, year, hour, savedInfoContainer) {
    $('#info-panel').show();
    $('#date-header').text(`Ingrese Nombre y DNI para las ${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`);

    $('#save-button').off('click').on('click', function() {
        const name = $('#name').val().trim();
        const dni = $('#dni').val().trim();
        if (name && dni) {
            const key = `${day}-${month}-${year}-${hour}`;
            const data = { day, month, year, hour, name, dni };
            const savedInfo = JSON.parse(localStorage.getItem('savedInfo')) || {};

            // Guardar los datos en localStorage
            savedInfo[key] = data;
            localStorage.setItem('savedInfo', JSON.stringify(savedInfo));

            // Ocultar el cuadro emergente
            $('#info-panel').hide();

            // Refrescar horarios
            refreshSchedule();
        } else {
            alert('Debe ingresar tanto el nombre como el DNI.');
        }
    });

    $('#close-button').off('click').on('click', function() {
        $('#info-panel').hide();
    });
}

function showEditPanel(hourButton, info) {
    $('#info-panel').show(); // Mostrar el cuadro emergente para editar horarios ocupados
    $('#date-header').text(`Editar Nombre y DNI para las ${info.hour.toString().padStart(2, '0')}:00 - ${(info.hour + 1).toString().padStart(2, '0')}:00`);
    $('#name').val(info.name);
    $('#dni').val(info.dni);

    $('#save-button').off('click').on('click', function() {
        const newName = $('#name').val().trim();
        const newDni = $('#dni').val().trim();
        if (newName && newDni) {
            info.name = newName;
            info.dni = newDni;

            // Actualizar los datos en localStorage
            const savedInfo = JSON.parse(localStorage.getItem('savedInfo')) || {};
            const key = `${info.day}-${info.month}-${info.year}-${info.hour}`;
            savedInfo[key] = info;
            localStorage.setItem('savedInfo', JSON.stringify(savedInfo));

            // Ocultar el cuadro emergente
            $('#info-panel').hide();

            // Refrescar horarios
            refreshSchedule();
        } else {
            alert('Debe ingresar tanto el nombre como el DNI.');
        }
    });

    $('#close-button').off('click').on('click', function() {
        $('#info-panel').hide();
    });
}

function createEditButtons(hourButton, data) {
    const editButton = $('<button></button>').text('Editar').addClass('edit-button');
    const resetButton = $('<button></button>').text('Disponible').addClass('reset-button');

    editButton.click(function() {
        showEditPanel(hourButton, data);
    });

    resetButton.click(function() {
        const savedInfo = JSON.parse(localStorage.getItem('savedInfo')) || {};
        const key = `${data.day}-${data.month}-${data.year}-${data.hour}`;

        delete savedInfo[key];
        localStorage.setItem('savedInfo', JSON.stringify(savedInfo));

        // Refrescar horarios
        refreshSchedule();
    });

    const buttonContainer = $('<div></div>').addClass('button-container').append(editButton).append(resetButton);
    
    // Asignar evento al botón principal para mostrar/ocultar los botones de edición
    hourButton.click(function() {
        buttonContainer.toggle();
    });

    hourButton.after(buttonContainer);
    return buttonContainer;
}

function setAllAvailable() {
    localStorage.clear();
    refreshSchedule();
}

function clearLocalStorage() {
    localStorage.clear();
    refreshSchedule();
}
