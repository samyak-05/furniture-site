'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '@/redux/modeSlice';
import { RootState } from '@/redux/store';

export function useSyncLayoutMode() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const currentMode = useSelector((state: RootState) => state.mode.currentMode);
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;

    // Common utility screens bypass
    if (
      pathname.startsWith('/cart') || 
      pathname.startsWith('/profile') || 
      pathname.startsWith('/orders') ||
      pathname.startsWith('/search')
    ) {
      return;
    }

    const isBaseHome = pathname === '/';
    const isValidGoldRoute = pathname.startsWith('/gold');
    const isValidPlatinumRoute = pathname.startsWith('/platinum');

    // 🚀 CACHE VALID PATH: Agar user kisi valid route par hai, toh use sessionStorage me save karlo
    if (isBaseHome || isValidGoldRoute || isValidPlatinumRoute) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('last_valid_showroom_path', pathname);
      }
    } else {
      // Invalid route (404) par hook execution instantly rok do
      return;
    }

    const executionTimer = setTimeout(() => {
      if (isValidPlatinumRoute) {
        if (currentMode !== 'platinum') {
          dispatch(setMode('platinum'));
        }
      } else if (isBaseHome || isValidGoldRoute) {
        if (currentMode !== 'gold') {
          dispatch(setMode('gold'));
        }
      }
    }, 0);

    return () => clearTimeout(executionTimer);
  }, [pathname, dispatch, currentMode]);
}