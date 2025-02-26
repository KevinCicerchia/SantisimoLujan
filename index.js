document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendar-container');
    const year = 2025;

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const weekdayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    const showHourSelectionPanel = (day, month, year) => {
        window.location.href = `schedule.html?day=${day}&month=${month}&year=${year}`;
    };

    monthNames.forEach((month, index) => {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');

        const monthHeader = document.createElement('h2');
        monthHeader.innerText = `${month} ${year}`;
        monthDiv.appendChild(monthHeader);

        const weekdaysDiv = document.createElement('div');
        weekdaysDiv.classList.add('weekdays');
        weekdayNames.forEach(weekday => {
            const weekdayDiv = document.createElement('div');
            weekdayDiv.classList.add('weekday');
            weekdayDiv.innerText = weekday;
            weekdaysDiv.appendChild(weekdayDiv);
        });
        monthDiv.appendChild(weekdaysDiv);

        const daysDiv = document.createElement('div');
        daysDiv.classList.add('days');
        monthDiv.appendChild(daysDiv);

        const firstDay = new Date(year, index, 1).getDay();
        const daysInMonth = 32 - new Date(year, index, 32).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day', 'empty');
            daysDiv.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day');
            dayCell.innerHTML = `<span>${day}</span>`;
            dayCell.onclick = () => showHourSelectionPanel(day, index + 1, year);
            daysDiv.appendChild(dayCell);
        }

        calendarContainer.appendChild(monthDiv);
    });
});

/*// Función para inicializar el carrusel
let currentIndex = 0;
const images = ["assets/lujan.png", "assets/santisimo.png", "assets/santisimo2.png"];
const carouselImage = document.getElementById("carousel-image");

setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    carouselImage.style.opacity = 0; // Inicia la transición de desvanecimiento
    setTimeout(() => {
        carouselImage.src = images[currentIndex];
        carouselImage.style.opacity = 1; // Termina la transición de desvanecimiento
    }, 800); // Tiempo de la transición de desvanecimiento
}, 3000); // Cambia de imagen cada 3 segundos

// Verificación de carga de imágenes
document.addEventListener("DOMContentLoaded", function() {
    images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.addEventListener('load', () => {
            console.log(`${img.src} cargada correctamente`);
        });
        img.addEventListener('error', () => {
            console.error(`Error al cargar la imagen ${img.src}`);
        });
    });
});*/
