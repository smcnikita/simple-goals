import CryptoJS from 'crypto-js';

import { CRYPTO_STORAGE_KEY } from '@/constants/storage';

export function savePasswordToLocalStorage(password: string) {
  localStorage.setItem(CRYPTO_STORAGE_KEY, password);
}

export function getPasswordFromLocalStorage(): string | null {
  return localStorage.getItem(CRYPTO_STORAGE_KEY);
}

export function encryptText(text: string): string {
  const password = getPasswordFromLocalStorage();

  if (!password) {
    throw new Error('No password in localStorage');
  }

  return CryptoJS.AES.encrypt(text, password).toString();
}

export function decryptText(cipherText: string): string {
  const password = getPasswordFromLocalStorage();

  if (!password) {
    throw new Error('No password in localStorage');
  }

  const bytes = CryptoJS.AES.decrypt(cipherText, password);
  return bytes.toString(CryptoJS.enc.Utf8);
}
