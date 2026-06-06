'use client';
import React from 'react';
import { useSyncLayoutMode } from "@/hooks/useSyncLayoutMode";

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  useSyncLayoutMode(); 
  return <>{children}</>;
}