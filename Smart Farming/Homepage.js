// Initialize all charts and components when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeCharts();
  initializeNotifications();
  initializeControls();
  startRealTimeUpdates();
});

// Charts Initialization
function initializeCharts() {
  // NPK Monitoring Chart
const npkChart = new Chart(document.getElementById('npkChart'), {
    type: 'line',
    data: {
        labels: ['6:00', '9:00', '12:00', '15:00', '18:00'],
        datasets: [
            {
                label: 'Nitrogen',
                data: [45, 42, 47, 45, 43],
                borderColor: '#2196F3',
                fill: false
            },
            {
                label: 'Phosphorus',
                data: [32, 31, 33, 32, 34],
                borderColor: '#4CAF50',
                fill: false
            },
            {
                label: 'Potassium',
                data: [28, 29, 27, 28, 28],
                borderColor: '#FFA000',
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

// Simple Update Function
function updateChart() {
    // Generate random data
    const newData = {
        n: Math.floor(Math.random() * (50 - 40) + 40),
        p: Math.floor(Math.random() * (35 - 25) + 25),
        k: Math.floor(Math.random() * (30 - 20) + 20)
    };

    // Update values
    document.getElementById('n-value').textContent = newData.n + '%';
    document.getElementById('p-value').textContent = newData.p + '%';
    document.getElementById('k-value').textContent = newData.k + '%';

    // Update chart
    npkChart.data.datasets[0].data.shift();
    npkChart.data.datasets[0].data.push(newData.n);
    npkChart.data.datasets[1].data.shift();
    npkChart.data.datasets[1].data.push(newData.p);
    npkChart.data.datasets[2].data.shift();
    npkChart.data.datasets[2].data.push(newData.k);
    
    npkChart.update();
}

  // Solar Power Generation Chart
  const solarCtx = document.getElementById('solarChart').getContext('2d');
  const solarChart = new Chart(solarCtx, {
      type: 'bar',
      data: {
          labels: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
          datasets: [{
              label: 'Power Generation (kW)',
              data: [1.2, 2.1, 2.8, 3.1, 2.9, 2.3, 1.5],
              backgroundColor: '#FFA000'
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false
      }
  });
}

// Notification System
document.addEventListener('DOMContentLoaded', function() {
  const notificationBtn = document.getElementById('notificationBtn');
  const notificationDropdown = document.querySelector('.notification-dropdown');
  const markAllRead = document.querySelector('.mark-all-read');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Toggle dropdown
  notificationBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      notificationDropdown.style.display = 
          notificationDropdown.style.display === 'block' ? 'none' : 'block';
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
      if (!notificationDropdown.contains(e.target) && 
          !notificationBtn.contains(e.target)) {
          notificationDropdown.style.display = 'none';
      }
  });

  // Mark all as read
  markAllRead.addEventListener('click', function() {
      const unreadNotifications = document.querySelectorAll('.notification-item.unread');
      unreadNotifications.forEach(notification => {
          notification.classList.remove('unread');
      });
      updateNotificationCount();
  });

  // Filter notifications
  filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          filterBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          filterNotifications(this.dataset.filter);
      });
  });

  // Notification actions
  document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
          e.stopPropagation();
          const notificationItem = this.closest('.notification-item');
          
          if (this.classList.contains('dismiss')) {
              notificationItem.style.animation = 'slideOut 0.3s ease forwards';
              setTimeout(() => {
                  notificationItem.remove();
                  updateNotificationCount();
              }, 300);
          } else if (this.classList.contains('view')) {
              // Handle view action
              notificationItem.classList.remove('unread');
              updateNotificationCount();
          }
      });
  });

  function updateNotificationCount() {
      const count = document.querySelectorAll('.notification-item.unread').length;
      const badge = document.querySelector('.notification-count');
      const countText = document.querySelector('.notification-count-text');
      
      badge.textContent = count;
      badge.style.display = count > 0 ? 'block' : 'none';
      countText.textContent = `${count} unread notification${count !== 1 ? 's' : ''}`;
  }

  function filterNotifications(filter) {
      const notifications = document.querySelectorAll('.notification-item');
      notifications.forEach(notification => {
          if (filter === 'all' || notification.classList.contains(filter)) {
              notification.style.display = 'flex';
          } else {
              notification.style.display = 'none';
          }
      });
  }
});