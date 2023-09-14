import AsyncStorage from '@react-native-async-storage/async-storage';

//----------------------------------------------------------------------------
type SessionServiceKeys =
  | 'accessToken'
  | 'theme'

//-----------------------------------
export default class SessionService {
  static storeString = async (key: SessionServiceKeys, value: string) => {
    try {
      AsyncStorage.setItem(key, value).then(() => Promise.resolve());
    } catch (e) {
      console.error('async_storage', e);
    }
  };

  static storeObject = async (key: SessionServiceKeys, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      AsyncStorage.setItem(key, jsonValue).then(() => Promise.resolve());
    } catch (e) {
      console.error('async_storage', e);
    }
  };

  static getString = async (key: SessionServiceKeys, defaultValue?: string) => {
    return AsyncStorage.getItem(key)
      .then(value => (value !== null ? value : defaultValue))
      .catch(error => {
        console.error('async_storage', error);
        return defaultValue;
      });
  };

  static getObject = async (
    key: SessionServiceKeys,
    defaultValue: any = null,
  ) => {
    return AsyncStorage.getItem(key)
      .then(jsonValue =>
        jsonValue != null ? JSON.parse(jsonValue) : defaultValue,
      )
      .catch(error => {
        console.error('async_storage', error);
        return defaultValue;
      });
  };

  static clearKey = async (key: string) =>
    AsyncStorage.removeItem(key).then(() => Promise.resolve());

  static clear = async () => await AsyncStorage.clear();
}
