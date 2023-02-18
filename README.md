# Overview

The reason I wrote this is to show I know the basics of JavaScript, Firebase, and React Native. For Javascript I show Array functions, recursion, and using libraries. For firebase I used Firestore to store and use data. And it all is an app built in React Native using Expo.

This is a code written in React Native which implements a calorie tracking app. The app allows users to select from a list of food items and keep track of their daily calorie intake. The code uses React and React Native libraries to build UI components. It also uses the Firebase Firestore for storing the calorie data and the LineChart component from react-native-chart-kit for visualizing the calorie data over time. The data for each day is stored as an object under the parent node /<month>/<day> in Firebase with the key "Kcalories". The writeUserData function is used to write the data to the database, and the useEffect hook is used to retrieve the data from the database and update the chart data when the component is loaded.

I wrote this because I wanted to track the calories of what I have beed eating.

[Software Demo Video V1](https://youtu.be/tE4NYzsRtnM)
[Software Demo Video V2](https://youtu.be/M1sB9nm0DnQ)

# Cloud Database

For my database I am using Firebases' Firestore, unlike the previous versions Realtime Database, Firestore is more advanced and can hold data from multiple users.

Using Firebases free version does not allow multiple tables so I formed it more like a JSON. It goes userID -> year -> Month -> Day -> the calories for that day

# Development Environment

I developed this using Expo Go with React Native.

I am using JavaScript NodeJS to use all sort of libraries.
    "dotenv": I store my firebase data in a .env
    "expo": Displays on my phone to help development
    "expo-checkbox": Needed to use checkboxes in expo
    "expo-constants": Needed to use .env in expo
    "firebase": In order to connect to firebase Firestore.
    "react": Required for react native
    "react-native": Lets us run as a phone app android or apple.
    "react-native-chart-kit": To display a chart of calories over time.
    "react-native-svg": Required for react-native-chart-kit
    "react-router-native": Used to navigate between pages

# Useful Websites

- [React Native Chart](https://www.npmjs.com/package/react-native-chart-kit)
- [React Native](https://reactnative.dev/)

# Future Work

- Tracking Water Drinking
- Changing the displayed month and day