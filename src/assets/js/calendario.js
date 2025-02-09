// calendar.js

document.addEventListener('DOMContentLoaded', function () {
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
  
    prevMonthBtn.addEventListener('click', function () {
      if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
      } else {
        currentMonth--;
      }
      renderCalendar(currentYear, currentMonth);
    });
  
    nextMonthBtn.addEventListener('click', function () {
      if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
      } else {
        currentMonth++;
      }
      renderCalendar(currentYear, currentMonth);
    });
  
    yearFilter.addEventListener('change', function () {
      currentYear = parseInt(yearFilter.value);
      renderCalendar(currentYear, currentMonth);
    });
  
    monthFilter.addEventListener('change', function () {
      currentMonth = parseInt(monthFilter.value);
      renderCalendar(currentYear, currentMonth);
    });
  
    // Event listener para cerrar el modal
    modalCloseBtn.addEventListener('click', function () {
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
          eventSpan.setAttribute('data-url', event.url); // Agregar URL del evento
          dayElement.appendChild(eventSpan);
  
          // Event listener para mostrar modal al hacer clic en evento
          eventSpan.addEventListener('click', function () {
            showModal(event.title, event.description, event.url);
          });
        }
  
        daysContainer.appendChild(dayElement);
      }
    }
  
    function getMonthName(month) {
      const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
      return months[month];
    }
  
    function getEvent(year, month, day) {
      // Eventos predefinidos de Colombia (del 2003 hasta el año actual)
      const events = {
        2003: {
          7: {
            20: {
              title: 'Futbol: Colombia vs Brasil',
              description: 'Partido histórico en la Copa América.',
              type: 1,
              url: 'https://www.eltiempo.com/deportes/futbol/colombia-vs-brasil-copa-america-2003'
            }
          }
        },
        2004: {
          8: {
            9: {
              title: 'Escándalo del DAS',
              description: 'El escándalo del Departamento Administrativo de Seguridad (DAS) comenzó a ganar notoriedad.',
              type: 3,
              url: 'https://es.wikipedia.org/wiki/Departamento_Administrativo_de_Seguridad_(Colombia)'
            }
          }
        },
        2008: {
          2: {
            11: {
              title: 'Atentado a la Casa de Nariño',
              description: 'Atentado cometido en Bogotá por guerrilleros.',
              type: 3,
              url: 'https://www.semana.com/nacion/articulo/atentado-a-la-casa-de-narino-en-2008/28443'
            }
          }
        },
        2010: {
          4: {
            20: {
              title: 'Colombia logra pacto con las FARC para liberación de rehenes',
              description: 'El gobierno de Colombia consigue un acuerdo para liberar a los secuestrados por las FARC.',
              type: 3,
              url: 'https://www.elpais.com.co/politica/pacto-con-las-farc-para-la-liberacion-de-rehenes.html'
            }
          }
        },
        2016: {
          11: {
            24: {
              title: 'Magnicidio: Muerte de Álvaro Gómez Hurtado',
              description: 'Asesinato de un líder político colombiano.',
              type: 4,
              url: 'https://www.eltiempo.com/archivo/documento/CMS-16401286'
            }
          },
          9: {
            26: {
              title: 'Firma del Acuerdo de Paz con las FARC',
              description: 'Colombia firma un acuerdo histórico para poner fin al conflicto armado con las FARC.',
              type: 3,
              url: 'https://www.elespectador.com/noticias/paz/la-firma-del-acuerdo-de-paz-en-colombia-este-fue-el-evento-historico-que-marco-la-historia-del-pais/2023/'
            }
          }
        },
        2019: {
          6: {
            12: {
              title: 'Futbol: Colombia en la Copa América 2019',
              description: 'Colombia derrota a Argentina en cuartos de final.',
              type: 1,
              url: 'https://www.efe.com/efe/america/deportes/colombia-derrota-argentina-en-copa-america-2019/20000010-4042927'
            }
          }
        },
        2020: {
          3: {
            19: {
              title: 'Pandemia de COVID-19 en Colombia',
              description: 'Colombia declara emergencia sanitaria por la pandemia de COVID-19.',
              type: 5,
              url: 'https://www.eltiempo.com/salud/coronavirus-colombia-el-virus-covid-19-entra-a-colombia'
            }
          }
        },
        2021: {
          4: {
            28: {
              title: 'Protestas nacionales en Colombia',
              description: 'Inician las protestas contra el gobierno debido a una reforma tributaria.',
              type: 2,
              url: 'https://www.eltiempo.com/colombia/2021-protestas-en-colombia-tiempos-de-pandemia-y-tensiones-politicas/58307'
            }
          }
        },
        2022: {
          6: {
            19: {
              title: 'Gustavo Petro es elegido presidente',
              description: 'Gustavo Petro, exalcalde de Bogotá, es elegido como el primer presidente de izquierda en la historia de Colombia.',
              type: 4,
              url: 'https://www.elespectador.com/noticias/politica/gustavo-petro-gana-la-presidencia-en-colombia/'
            }
          }
        },
        2023: {
          10: {
            12: {
              title: 'La crisis migratoria de venezolanos en Colombia',
              description: 'Cientos de miles de venezolanos migran hacia Colombia debido a la crisis económica en su país.',
              type: 5,
              url: 'https://www.eltiempo.com/mundo/latinoamerica/crisis-migratoria-en-colombia-por-la-huida-de-venezolanos/'
            }
          }
        },
        2025: {
          2: {
            9: {
              title: 'Colombia en la Copa América 2025',
              description: 'Colombia se prepara para participar en la Copa América de 2025.',
              type: 1,
              url: 'https://www.eltiempo.com/deportes/futbol/colombia-en-la-copa-america-2025'
            }
          }
        }
        // Agregar más eventos según sea necesario
      };
  
      return events[year]?.[month]?.[day] || null;
    }
  
    function fillYearFilter() {
      const currentYear = new Date().getFullYear();
      for (let year = 2003; year <= currentYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
      }
      yearFilter.value = currentYear; // Establecer el valor inicial
    }
  
    function showModal(title, description, url) {
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modal.style.display = 'block';
  
      // Redirigir al hacer clic en el modal
      modal.addEventListener('click', function () {
        window.location.href = url;
      });
    }
  
    function closeModal() {
      modal.style.display = 'none';
    }
  
    // Establecer el valor inicial del filtro por mes
    monthFilter.value = currentMonth;
  
    // Renderizar calendario inicial
    renderCalendar(currentYear, currentMonth);
  });
  