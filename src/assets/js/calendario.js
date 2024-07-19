// calendar.js

document.addEventListener('DOMContentLoaded', function() {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  
  const calendar = document.querySelector('.calendar');
  const currentDateElement = document.getElementById('current-date');
  const daysContainer = document.querySelector('.days-container');
  const yearFilter = document.getElementById('year-filter');
  const monthFilter = document.getElementById('month-filter');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  const modal = document.getElementById('event-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalCloseBtn = document.querySelector('.close');
  
  // Llenar opciones de filtro por año
  fillYearFilter();
  

  
  prevMonthBtn.addEventListener('click', function() {
      if (currentMonth === 0) {
          currentMonth = 11;
          currentYear--;
      } else {
          currentMonth--;
      }
      renderCalendar(currentYear, currentMonth);
  });
  
  nextMonthBtn.addEventListener('click', function() {
      if (currentMonth === 11) {
          currentMonth = 0;
          currentYear++;
      } else {
          currentMonth++;
      }
      renderCalendar(currentYear, currentMonth);
  });
  
  yearFilter.addEventListener('change', function() {
      currentYear = parseInt(yearFilter.value);
      renderCalendar(currentYear, currentMonth);
  });
  
  monthFilter.addEventListener('change', function() {
      currentMonth = parseInt(monthFilter.value);
      renderCalendar(currentYear, currentMonth);
  });
  
  // Event listener para cerrar el modal
  modalCloseBtn.addEventListener('click', function() {
      closeModal();
  });
  
  function renderCalendar(year, month) {
      const firstDayOfMonth = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const startingDay = firstDayOfMonth.getDay();
      
      currentDateElement.textContent = `${getMonthName(month)} ${year}`;
      daysContainer.innerHTML = '';
      
      // Render days
      for (let i = 0; i < startingDay; i++) {
          const dayElement = document.createElement('div');
          dayElement.classList.add('day', 'empty');
          daysContainer.appendChild(dayElement);
      }
      
      for (let day = 1; day <= daysInMonth; day++) {
          const dayElement = document.createElement('div');
          dayElement.textContent = day;
          dayElement.classList.add('day');
          
          const event = getEvent(year, month, day);
          if (event) {
              const eventSpan = document.createElement('span');
              eventSpan.textContent = event.title;
              eventSpan.classList.add('event', `event-type${event.type}`);
              eventSpan.setAttribute('data-title', event.title);
              eventSpan.setAttribute('data-description', event.description);
              dayElement.appendChild(eventSpan);
              
              // Event listener para mostrar modal al hacer clic en evento
              eventSpan.addEventListener('click', function() {
                  showModal(event.title, event.description);
              });
          }
          
          daysContainer.appendChild(dayElement);
      }
  }
  
  function getMonthName(month) {
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      return months[month];
  }
  
  function getEvent(year, month, day) {
      // Aquí puedes definir tus eventos predefinidos con título, descripción y tipo
      // Por ejemplo:
      if (year === 2019 && month === 6 && day === 12) {
          return {
              title: '¡Holi Bebé!',
              description: '¡Hoy es un día especial!',
              type: 2 // Tipo de evento (puedes definir diferentes tipos)
          };
      }
      return null;
  }
  
  function fillYearFilter() {
      const currentYear = new Date().getFullYear();
      for (let year = currentYear - 10; year <= currentYear + 10; year++) {
          const option = document.createElement('option');
          option.value = year;
          option.textContent = year;
          yearFilter.appendChild(option);
      }
      yearFilter.value = currentYear; // Establecer el valor inicial
  }
  
  function showModal(title, description) {
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modal.style.display = 'block';
  }
  
  function closeModal() {
      modal.style.display = 'none';
  }
  
  // Establecer el valor inicial del filtro por mes
  monthFilter.value = currentMonth;
  
  // Renderizar calendario inicial
  renderCalendar(currentYear, currentMonth);
});
