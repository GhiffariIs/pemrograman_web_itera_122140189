import { renderHook, act } from '@testing-library/react-hooks'
import { useLocalStorage } from './useLocalStorage'

beforeEach(() => {
  localStorage.clear()
})

describe('useLocalStorage', () => {
  it('returns initial value when no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'))
    expect(result.current[0]).toBe('initialValue')
  })

  it('returns stored value from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'))
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'))
    expect(result.current[0]).toBe('storedValue')
  })

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'))
    
    act(() => {
      result.current[1]('newValue')
    })
    
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'))
  })

  it('handles objects and arrays correctly', () => {
    const testObject = { key: 'value' }
    const { result } = renderHook(() => useLocalStorage('testKey', testObject))
    
    expect(result.current[0]).toEqual(testObject)
    
    act(() => {
      result.current[1]({ ...testObject, newKey: 'newValue' })
    })
    
    expect(JSON.parse(localStorage.getItem('testKey'))).toEqual({
      key: 'value',
      newKey: 'newValue'
    })
  })
})