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

// Sample data
const harvestData = [
  { date: "2023-01", amount: 2500 },
  { date: "2023-02", amount: 3200 },
  { date: "2023-03", amount: 2800 },
  { date: "2023-04", amount: 3500 },
  { date: "2023-05", amount: 3000 },
  { date: "2023-06", amount: 3800 },
]

const waterUsageData = [
  { date: "2023-08-01", usage: 1500, schedule: "06:00" },
  { date: "2023-08-02", usage: 1600, schedule: "06:30" },
  { date: "2023-08-03", usage: 1400, schedule: "06:00" },
  { date: "2023-08-04", usage: 1550, schedule: "06:30" },
  { date: "2023-08-05", usage: 1650, schedule: "06:00" },
  { date: "2023-08-06", usage: 1500, schedule: "06:30" },
  { date: "2023-08-07", usage: 1450, schedule: "06:00" },
]

const fertilizerData = [
  { month: "Jan", amount: 250 },
  { month: "Feb", amount: 300 },
  { month: "Mar", amount: 280 },
  { month: "Apr", amount: 320 },
  { month: "May", amount: 350 },
  { month: "Jun", amount: 330 },
]

const pestControlData = [
  { month: "Jan", amount: 50 },
  { month: "Feb", amount: 60 },
  { month: "Mar", amount: 55 },
  { month: "Apr", amount: 70 },
  { month: "May", amount: 65 },
  { month: "Jun", amount: 58 },
]

const solarEnergyData = [
  { date: "2023-08-01", energy: 25 },
  { date: "2023-08-02", energy: 28 },
  { date: "2023-08-03", energy: 22 },
  { date: "2023-08-04", energy: 30 },
  { date: "2023-08-05", energy: 27 },
  { date: "2023-08-06", energy: 29 },
  { date: "2023-08-07", energy: 26 },
]

// Chart creation functions
function createHarvestChart() {
  const ctx = document.getElementById("harvestChart").getContext("2d")
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: harvestData.map((d) => d.date),
      datasets: [
        {
          label: "Harvest Amount (kg)",
          data: harvestData.map((d) => d.amount),
          backgroundColor: "rgba(59, 130, 246, 0.8)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

function createWaterChart() {
  const ctx = document.getElementById("waterChart").getContext("2d")
  new Chart(ctx, {
    type: "line",
    data: {
      labels: waterUsageData.map((d) => d.date),
      datasets: [
        {
          label: "Water Usage (L)",
          data: waterUsageData.map((d) => d.usage),
          borderColor: "rgba(59, 130, 246, 0.8)",
          fill: false,
        },
        {
          label: "Irrigation Schedule",
          data: waterUsageData.map((d) => d.schedule.split(":")[0]),
          borderColor: "rgba(16, 185, 129, 0.8)",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

function createFertilizerChart() {
  const ctx = document.getElementById("fertilizerChart").getContext("2d")
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: fertilizerData.map((d) => d.month),
      datasets: [
        {
          label: "Fertilizer Amount (L)",
          data: fertilizerData.map((d) => d.amount),
          backgroundColor: "rgba(16, 185, 129, 0.8)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

function createPestControlChart() {
  const ctx = document.getElementById("pestControlChart").getContext("2d")
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: pestControlData.map((d) => d.month),
      datasets: [
        {
          label: "Pest Control Amount (L)",
          data: pestControlData.map((d) => d.amount),
          backgroundColor: "rgba(245, 158, 11, 0.8)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

function createSolarChart() {
  const ctx = document.getElementById("solarChart").getContext("2d")
  new Chart(ctx, {
    type: "line",
    data: {
      labels: solarEnergyData.map((d) => d.date),
      datasets: [
        {
          label: "Energy Usage (kW)",
          data: solarEnergyData.map((d) => d.energy),
          borderColor: "rgba(239, 68, 68, 0.8)",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

// Tab functionality
function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tab")

      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      button.classList.add("active")
      document.getElementById(tabName).classList.add("active")
    })
  })
}

// Initialize charts and tabs
document.addEventListener("DOMContentLoaded", () => {
  createHarvestChart()
  createWaterChart()
  createFertilizerChart()
  createPestControlChart()
  createSolarChart()
  setupTabs()
})

// Export data functionality (placeholder)
document.getElementById("export-btn").addEventListener("click", () => {
  alert("Data export functionality would be implemented here.")
})

// Period select functionality (placeholder)
document.getElementById("period-select").addEventListener("change", (e) => {
  alert(`Selected period: ${e.target.value}. Data would be updated accordingly.`)
})

