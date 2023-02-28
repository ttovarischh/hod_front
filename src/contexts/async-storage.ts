import AsyncStorage from '@react-native-async-storage/async-storage';

// const authDataSerialized = await AsyncStorage.getItem("@AuthData");
// const _authData = JSON.parse(authDataSerialized);

export async function getItem() {
  const authDataSerialized = await AsyncStorage.getItem("@AuthData");
  console.log(authDataSerialized);
  return authDataSerialized ? JSON.parse(authDataSerialized) : null;
}
export async function setItem(value: any) {
  return AsyncStorage.setItem('token', JSON.stringify(value));
}

// await AsyncStorage.removeItem("@AuthData");
export async function removeItem() {
  return AsyncStorage.removeItem("@AuthData");
}
