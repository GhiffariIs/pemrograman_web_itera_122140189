import { renderHook, act } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest'
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        window.localStorage.clear();
    });

    it('should initialize with the value from localStorage if it exists', () => {
        window.localStorage.setItem('testKey', JSON.stringify('storedValue'));

        const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

        expect(result.current[0]).toBe('storedValue');
    });

    it('should initialize with the default value if localStorage is empty', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

        expect(result.current[0]).toBe('defaultValue');
    });

    it('should update the value in localStorage when the state changes', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

        act(() => {
            result.current[1]('newValue');
        });

        expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
        expect(result.current[0]).toBe('newValue');
    });

    it('should handle JSON parsing errors gracefully', () => {
        window.localStorage.setItem('testKey', 'invalidJSON');

        const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

        expect(result.current[0]).toBe('defaultValue');
    });

    it('should handle errors when setting localStorage gracefully', () => {
        const spy = vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
            throw new Error('Storage error');
        });

        const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

        act(() => {
            result.current[1]('newValue');
        });

        expect(result.current[0]).toBe('newValue');
        spy.mockRestore();
    });
});