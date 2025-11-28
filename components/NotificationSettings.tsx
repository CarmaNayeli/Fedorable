'use client';

import { useEffect, useState } from 'react';
import { subscribeToPushNotifications } from '@/lib/register-sw';

export default function NotificationSettings() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    if ('Notification' in window) {
      setPermission(Notification.permission);
      checkSubscriptionStatus();
    }
  }, []);

  const checkSubscriptionStatus = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      } catch (error) {
        console.error('Failed to check subscription status:', error);
      }
    }
  };

  const handleEnableNotifications = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await subscribeToPushNotifications();
      setPermission('granted');
      setIsSubscribed(true);
    } catch (error: any) {
      console.error('Failed to enable notifications:', error);
      setError(error.message || 'Failed to enable notifications');
      if (Notification.permission === 'denied') {
        setError('Notifications are blocked. Please enable them in your browser settings.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableNotifications = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {
          // Unsubscribe from push
          await subscription.unsubscribe();

          // Remove subscription from server
          await fetch('/api/notifications/subscribe', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint: subscription.endpoint }),
          });

          setIsSubscribed(false);
        }
      }
    } catch (error: any) {
      console.error('Failed to disable notifications:', error);
      setError('Failed to disable notifications');
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show if notifications are not supported
  if (!('Notification' in window)) {
    return null;
  }

  return (
    <div className="mb-6">
      {/* Notification Toggle Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="w-full bg-purple-800/50 border-2 border-pink-400 rounded-xl p-4 hover:bg-purple-700/50 transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🔔</div>
            <div className="text-left">
              <div className="text-pink-300 font-bold">Push Notifications</div>
              <div className="text-white text-sm">
                {isSubscribed ? 'Enabled' : 'Disabled'}
              </div>
            </div>
          </div>
          <div className="text-pink-300">
            {showSettings ? '▼' : '▶'}
          </div>
        </div>
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-3 bg-black/30 backdrop-blur-lg border-2 border-pink-400 rounded-xl p-4">
          <div className="space-y-4">
            {/* Status */}
            <div>
              <div className="text-pink-300 font-bold mb-2">Status</div>
              <div className="text-white text-sm">
                {permission === 'granted' && isSubscribed && (
                  <span className="text-green-400">✓ Notifications enabled</span>
                )}
                {permission === 'granted' && !isSubscribed && (
                  <span className="text-yellow-400">! Notifications allowed but not subscribed</span>
                )}
                {permission === 'denied' && (
                  <span className="text-red-400">✗ Notifications blocked by browser</span>
                )}
                {permission === 'default' && (
                  <span className="text-gray-400">Permission not requested</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="text-white text-sm">
              Get reminded when it&apos;s time to battle monsters (complete chores)!
              You&apos;ll receive timely notifications with options to complete or snooze.
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/50 border border-red-400 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!isSubscribed ? (
                <button
                  onClick={handleEnableNotifications}
                  disabled={isLoading || permission === 'denied'}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all"
                >
                  {isLoading ? 'Enabling...' : 'Enable Notifications'}
                </button>
              ) : (
                <button
                  onClick={handleDisableNotifications}
                  disabled={isLoading}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all"
                >
                  {isLoading ? 'Disabling...' : 'Disable Notifications'}
                </button>
              )}
            </div>

            {/* Browser Settings Hint */}
            {permission === 'denied' && (
              <div className="text-xs text-gray-400 italic">
                To enable notifications, go to your browser settings and allow notifications for this site.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
