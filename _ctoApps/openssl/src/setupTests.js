import '@testing-library/jest-dom';
import crypto from 'crypto';
import { enableFetchMocks } from 'jest-fetch-mock';
import { readFileSync } from 'fs';

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
  },
});

enableFetchMocks();

beforeEach(() => {
  fetch.resetMocks();

  const wasm = readFileSync('public/openssl.wasm');
  fetch.mockResponse(async (request) => {
    if (request.url.endsWith('openssl.wasm')) {
      return {
        status: 200,
        body: wasm,
      };
    } else {
      return {
        status: 404,
        body: 'Not Found',
      };
    }
  });
});
