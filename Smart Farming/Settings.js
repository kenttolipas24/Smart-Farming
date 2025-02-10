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

// settings.js

document.addEventListener('DOMContentLoaded', function() {
    // Get all form elements
    const settingsForm = document.querySelector('.settings-form');
    const irrigationThreshold = document.getElementById('irrigation-threshold');
    const thresholdOutput = irrigationThreshold.nextElementSibling;
    const darkModeToggle = document.getElementById('dark-mode');
    const notificationsToggle = document.getElementById('notifications');
    const languageSelect = document.getElementById('language');
    const unitsSelect = document.getElementById('units');
    const dataSyncSelect = document.getElementById('data-sync');

    // Load saved settings from localStorage
    loadSavedSettings();

    // Update irrigation threshold output value
    irrigationThreshold.addEventListener('input', function() {
        thresholdOutput.textContent = this.value + '%';
    });

    // Handle dark mode toggle
    darkModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
        saveSettings();
    });

    // Handle form submission
    settingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveSettings();
        showNotification('Settings saved successfully!');
    });

    // Function to save settings to localStorage
    function saveSettings() {
        const settings = {
            notifications: notificationsToggle.checked,
            darkMode: darkModeToggle.checked,
            language: languageSelect.value,
            units: unitsSelect.value,
            dataSync: dataSyncSelect.value,
            irrigationThreshold: irrigationThreshold.value,
            email: document.getElementById('email').value,
            sms: document.getElementById('sms').value
        };

        localStorage.setItem('farmSettings', JSON.stringify(settings));
    }

    // Function to load saved settings
    function loadSavedSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('farmSettings'));
        
        if (savedSettings) {
            notificationsToggle.checked = savedSettings.notifications;
            darkModeToggle.checked = savedSettings.darkMode;
            languageSelect.value = savedSettings.language;
            unitsSelect.value = savedSettings.units;
            dataSyncSelect.value = savedSettings.dataSync;
            irrigationThreshold.value = savedSettings.irrigationThreshold;
            document.getElementById('email').value = savedSettings.email || '';
            document.getElementById('sms').value = savedSettings.sms || '';
            
            // Update threshold output
            thresholdOutput.textContent = savedSettings.irrigationThreshold + '%';
            
            // Apply dark mode if enabled
            if (savedSettings.darkMode) {
                document.body.classList.add('dark-mode');
            }
        }
    }

    // Function to show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'settings-notification';
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Form validation for email and phone
    const emailInput = document.getElementById('email');
    const smsInput = document.getElementById('sms');

    emailInput.addEventListener('input', function() {
        validateEmail(this);
    });

    smsInput.addEventListener('input', function() {
        validatePhone(this);
    });

    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(input.value);
        input.classList.toggle('invalid', !isValid && input.value !== '');
    }

    function validatePhone(input) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        const isValid = phoneRegex.test(input.value);
        input.classList.toggle('invalid', !isValid && input.value !== '');
    }

    // Add confirmation before resetting to default settings
    const resetDefaults = function() {
        if (confirm('Are you sure you want to reset all settings to default values?')) {
            localStorage.removeItem('farmSettings');
            location.reload();
        }
    };

    // Optional: Add a reset button functionality
    if (document.querySelector('.reset-settings')) {
        document.querySelector('.reset-settings').addEventListener('click', resetDefaults);
    }
});

// Notification system functionality
document.getElementById('notificationBtn').addEventListener('click', function() {
    const dropdown = document.querySelector('.notification-dropdown');
    dropdown.classList.toggle('show');
});

// Close notification dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.notifications')) {
        document.querySelector('.notification-dropdown').classList.remove('show');
    }
});

// Filter notifications
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.dataset.filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');

        // Filter notification items
        document.querySelectorAll('.notification-item').forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Mark all notifications as read
document.querySelector('.mark-all-read').addEventListener('click', function() {
    document.querySelectorAll('.notification-item.unread').forEach(item => {
        item.classList.remove('unread');
    });
    updateNotificationCount();
});

// Update notification count
function updateNotificationCount() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    document.querySelector('.notification-count').textContent = unreadCount;
    document.querySelector('.notification-count-text').textContent = 
        `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`;
}