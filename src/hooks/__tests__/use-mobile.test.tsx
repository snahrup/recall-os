/// <reference types="vitest" />
import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from '../use-mobile'

const MOBILE_BREAKPOINT = 768

type Listener = (e: MediaQueryListEvent) => void

function setupMatchMedia() {
  let listeners: Listener[] = []
  vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => {
    return {
      matches: window.innerWidth < MOBILE_BREAKPOINT,
      media: query,
      addEventListener: (_event: string, cb: Listener) => {
        listeners.push(cb)
      },
      removeEventListener: (_event: string, cb: Listener) => {
        listeners = listeners.filter(l => l !== cb)
      },
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList
  }))
  return (width: number) => {
    window.innerWidth = width
    listeners.forEach((cb) => cb({ matches: width < MOBILE_BREAKPOINT } as MediaQueryListEvent))
  }
}

describe('useIsMobile', () => {
  it('updates when viewport width changes', () => {
    const trigger = setupMatchMedia()
    window.innerWidth = 1024
    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)

    act(() => trigger(500))
    expect(result.current).toBe(true)

    act(() => trigger(800))
    expect(result.current).toBe(false)
  })
})
