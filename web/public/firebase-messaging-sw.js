// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config

var firebaseConfig = {
    apiKey: "AIzaSyBjybDRwvEbpXLzQOzXvDpzqRyM9DGTn88",
    authDomain: "pfedefib.firebaseapp.com",
    projectId: "pfedefib",
    storageBucket: "pfedefib.appspot.com",
    messagingSenderId: "1000808926703",
    appId: "1:1000808926703:web:50458ba163a100331a7a1a",
    measurementId: "G-BQBFN74MCC"
  };
  
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();



messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});