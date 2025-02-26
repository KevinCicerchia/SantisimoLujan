$(document).ready(function() {
    // Añadir botones de prueba al DOM
    const testButtonsContainer = $('<div></div>').attr('id', 'test-buttons-container').css('margin-bottom', '20px');
    const setAllAvailableButton = $('<button></button>').attr('id', 'set-all-available-button').text('Poner Todo Disponible').addClass('refresh-button');
    const clearStorageButton = $('<button></button>').attr('id', 'clear-storage-button').text('Borrar Todo').addClass('refresh-button');

    testButtonsContainer.append(setAllAvailableButton).append(clearStorageButton);
    $('body').prepend(testButtonsContainer);

    // Definir funciones de prueba
    function setAllAvailable() {
        localStorage.clear();
        refreshSchedule();
    }

    function clearLocalStorage() {
        localStorage.clear();
        refreshSchedule();
    }

    // Agregar eventos a los botones de prueba
    $('#set-all-available-button').click(function() {
        setAllAvailable();
    });

    $('#clear-storage-button').click(function() {
        clearLocalStorage();
    });
});
