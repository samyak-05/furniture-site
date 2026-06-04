'use client'
import React from 'react'
import useGetMe from './hooks/useGetMe'
import { useSyncCart } from './hooks/useSyncCart';

function InitUser() {
    useGetMe();
    useSyncCart();
    return null
};

export default InitUser
