import firebase from "firebase/app";
import "@firebase/messaging";
import { notification, Icon } from "antd";
import React from "react";

const openNotification = data => {
  notification.open({
    message: data.title,
    description: data.body,
    icon: <Icon type="message" style={{ color: "#108ee9" }} />
  });
};

var firebaseConfig = {
  messagingSenderId: "163319977066"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// we need to check if messaging is supported by the browser
if (firebase.messaging.isSupported()) {
  let messaging = firebase.messaging();
  messaging.usePublicVapidKey(
    "BIgV_9ZldN8HXfdPbJT5QN65ZacjYmBarXqktQh0JBBM6gVJHita3lJW5yxG9b5PFvV-uOHKP-zIYOVX8_oRXzU"
  );
  messaging
    .requestPermission()
    .then(() => {
      return messaging.getToken();
    })
    .then(token => {
      console.log("token", token);
      messaging.onMessage(payload => {
        openNotification(payload.notification);
      });
    })
    .catch(err => console.log(err));
}
