'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setMode } from '@/redux/modeSlice';

export function useSyncLayoutMode() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pathname) return;
    
    if (pathname.startsWith('/cart') || pathname.startsWith('/profile') || pathname.startsWith('/orders')) {
      return;
    }

    if (pathname.startsWith('/platinum')) {
      dispatch(setMode('platinum'));
    } else if (pathname === '/' || pathname.startsWith('/gold')) {
      dispatch(setMode('gold'));
    }
  }, [pathname, dispatch]);
}