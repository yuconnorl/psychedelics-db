/* eslint-disable no-console */
type StorageValue = string | number | boolean | object | null

export const localStorageHelper = {
  set(key: string, value: StorageValue): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
    } catch (error: unknown) {
      console.error(`Error setting item to localStorage: ${error}`)
    }
  },

  get<T = StorageValue>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key)
      return serializedValue !== null
        ? (JSON.parse(serializedValue) as T)
        : null
    } catch (error: unknown) {
      console.error(`Error getting item from localStorage: ${error}`)
      return null
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error: unknown) {
      console.error(`Error removing item from localStorage: ${error}`)
    }
  },
}
