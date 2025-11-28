// Service Worker for Push Notifications
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);

  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Chore Reminder';
  const options = {
    body: data.body || 'Time to do a chore!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: data,
    actions: [
      {
        action: 'complete',
        title: 'Mark Complete',
      },
      {
        action: 'snooze',
        title: 'Snooze 15min',
      },
    ],
    requireInteraction: true,
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'complete') {
    // Handle complete action
    event.waitUntil(
      fetch('/api/chores/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choreId: event.notification.data.choreId }),
      })
    );
  } else if (event.action === 'snooze') {
    // Handle snooze action
    event.waitUntil(
      fetch('/api/notifications/snooze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          choreId: event.notification.data.choreId,
          snoozeMinutes: 15,
        }),
      })
    );
  } else {
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
