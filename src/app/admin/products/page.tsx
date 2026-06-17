'use client';
import React, { useEffect, useState } from 'react';
import { LayoutGrid, List, Search, Plus, Trash2, Edit3, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Navbar from '@/components/Navbar';

interface IProduct {
    _id: string;
    name: string;
    price: string;
    category: string;
    isLuxury: boolean;
    image: string[];
    genre: string;
    views: number;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

    useEffect(() => {
        async function fetchAdminProducts() {
            try {
                const res = await axios.get('/api/admin/getProducts');
                setProducts(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Failed fetching admin product records:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchAdminProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const nameMatch = (product?.name || "").toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = (product?.category || "").toLowerCase().includes(searchQuery.toLowerCase());
        const genreMatch = (product?.genre || "").toLowerCase().includes(searchQuery.toLowerCase());

        return nameMatch || categoryMatch || genreMatch;
    });

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-[#F1FAFF] flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border border-neutral-300 border-t-black animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-white text-neutral-800">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-5 mb-6">
                    <div>
                        <h1 className="text-xl font-medium tracking-wide text-neutral-900">Admin Products</h1>
                        <p className="text-xs text-neutral-400 mt-0.5">Manage and view all products inside your inventory catalog.</p>
                    </div>
                    <Link
                        href="/admin/products/new"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
                    >
                        <Plus size={14} /> Add Product
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
                    <div className="relative w-full sm:max-w-xs">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full py-1.5 pl-9 pr-4 rounded-lg text-xs outline-none border border-neutral-200 bg-neutral-50 focus:border-neutral-400 focus:bg-white transition-colors"
                        />
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    </div>

                    <div className="flex items-center gap-1 border border-neutral-200 p-1 rounded-lg bg-neutral-50 self-end sm:self-auto">
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-1 rounded ${viewMode === 'table' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
                        >
                            <List size={14} />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
                        >
                            <LayoutGrid size={14} />
                        </button>
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="w-full py-16 text-center border border-dashed border-neutral-200 rounded-xl bg-neutral-50">
                        <p className="text-xs text-neutral-400">No products found matching your criteria.</p>
                    </div>
                ) : viewMode === 'table' ? (

                    <div className="w-full overflow-x-auto rounded-xl border border-neutral-200 bg-white">
                        <table className="w-full border-collapse text-left text-xs min-w-[600px]">
                            <thead>
                                <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-500 font-medium">
                                    <th className="p-3 pl-4">Product Details</th>
                                    <th className="p-3">Category</th>
                                    <th className="p-3">Genre</th>
                                    <th className="p-3">Type</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3 text-center">Views</th>
                                    <th className="p-3 pr-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 text-neutral-700">
                                {filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-neutral-50/80 transition-colors">
                                        <td className="p-3 pl-4 flex items-center gap-3">
                                            <div className="relative w-8 h-8 rounded border border-neutral-200 bg-neutral-100 flex-shrink-0 overflow-hidden">
                                                <Image
                                                    src={product.image[0] || "/placeholder.jpg"}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <span className="font-medium text-neutral-900 truncate max-w-[180px]">{product.name}</span>
                                        </td>
                                        <td className="p-3 capitalize text-neutral-500">{product.category}</td>
                                        <td className="p-3 capitalize text-neutral-500">{product.genre}</td>
                                        <td className="p-3">
                                            {product.isLuxury ? (
                                                <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-medium">Luxury</span>
                                            ) : (
                                                <span className="text-[10px] bg-neutral-100 text-neutral-600 border border-neutral-200 px-2 py-0.5 rounded font-medium">Premium</span>
                                            )}
                                        </td>
                                        <td className="p-3 font-medium text-neutral-900">₹{Number(product.price).toLocaleString('en-IN')}</td>
                                        <td className="p-3 text-center text-neutral-500">{product.views}</td>
                                        <td className="p-3 pr-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/product/${product._id}`}
                                                    target="_blank"
                                                    className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
                                                >
                                                    <ArrowUpRight size={14} />
                                                </Link>
                                                <Link
                                                    href={`/admin/products/edit/${product._id}`}
                                                    className="p-1 text-neutral-400 hover:text-blue-600 transition-colors"
                                                >
                                                    <Edit3 size={14} />
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="p-1 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-xl overflow-hidden border border-neutral-200 flex flex-col justify-between"
                            >
                                <div className="relative aspect-square w-full bg-neutral-50 border-b border-neutral-100">
                                    <Image
                                        src={product.image[0] || "/placeholder.jpg"}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-2 left-2 flex gap-1">
                                        {product.isLuxury && (
                                            <span className="text-[9px] bg-amber-600 text-white px-1.5 py-0.5 rounded font-medium shadow-sm">Luxury</span>
                                        )}
                                        <span className="text-[9px] bg-neutral-800 text-white px-1.5 py-0.5 rounded font-light capitalize shadow-sm">
                                            {product.genre}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-3 flex-1 flex flex-col justify-between gap-3">
                                    <div>
                                        <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold">{product.category}</span>
                                        <h3 className="text-xs font-medium text-neutral-900 truncate mt-0.5">{product.name}</h3>
                                        <p className="text-xs font-semibold text-neutral-900 mt-1">₹{Number(product.price).toLocaleString('en-IN')}</p>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-neutral-100 pt-2.5">
                                        <span className="text-[10px] text-neutral-400">Views: {product.views}</span>
                                        <div className="flex items-center gap-1.5">
                                            <Link
                                                href={`/admin/products/edit/${product._id}`}
                                                className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
                                            >
                                                <Edit3 size={13} />
                                            </Link>
                                            <button
                                                type="button"
                                                className="p-1 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
