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