import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'node:util';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
  ResizeObserver: ResizeObserverMock
});
