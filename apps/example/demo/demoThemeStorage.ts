import AsyncStorage from '@react-native-async-storage/async-storage';

export const DEMO_BRAND_STORAGE_KEY = '@rnui-example/brand-id';

export async function loadPersistedBrandId(): Promise<string | null> {
  return AsyncStorage.getItem(DEMO_BRAND_STORAGE_KEY);
}

export async function persistBrandId(id: string | null): Promise<void> {
  if (id == null || id === '') {
    await AsyncStorage.removeItem(DEMO_BRAND_STORAGE_KEY);
    return;
  }
  await AsyncStorage.setItem(DEMO_BRAND_STORAGE_KEY, id);
}
