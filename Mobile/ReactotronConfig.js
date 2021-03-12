/** @format */

import Reactotron from "reactotron-react-native";
import { reactotronRedux as reduxPlugin } from "reactotron-redux";


console.disableYellowBox = true;


  // test on real device: change to your local config
  Reactotron.configure({ name: "Mobile", host: "192.168.1.11"});

Reactotron.useReactNative({
  asyncStorage: { ignore: ["secret"] },
});

Reactotron.use(reduxPlugin());

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}

console.tron = Reactotron;
