import { useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isLuxury, setIsLuxury] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setError(""); 
    setLoading(true); // Set loading to true here ONLY when the form successfully submits
    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("isLuxury", isLuxury.toString());
      formData.append("genre", genre);
      
      if (thumbnail) {
        formData.append("images", thumbnail);
      }
      images.forEach((file) => formData.append("images", file));

      const response = await axios.post("/api/admin/add-product", formData, { withCredentials: true });
      console.log("Product added successfully:", response.data);
      window.location.reload();

    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product.");
      setLoading(false); // Make sure to turn off loading if the API request fails!
    }
  };

  return (
    <>
      {/* 1. PLACED ABOVE EVERYTHING: This overlays and blurs the page when loading is true */}
      {loading && <Loading />}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase tracking-widest text-black/80" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            placeholder="e.g., Minimalist Oak Armchair"
            required
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 bg-[#FAF9F6] border border-black/[0.06] rounded-[20px] text-sm font-medium text-[#2A3439] placeholder-gray-400 focus:outline-none focus:border-black/20 focus:bg-white transition-all duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase tracking-widest text-black/80" htmlFor="description">
            Description
          </label>
          <textarea
            placeholder="Describe material lines, canvas assets, and build specifications..."
            rows={4}
            required
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-5 py-4 bg-[#FAF9F6] border border-black/[0.06] rounded-[20px] text-sm font-medium text-[#2A3439] placeholder-gray-400 focus:outline-none focus:border-black/20 focus:bg-white transition-all duration-200 resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)] leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-black/80" htmlFor="price">
              Price (&#8377;)
            </label>
            <input
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-5 py-4 bg-[#FAF9F6] border border-black/[0.06] rounded-[20px] text-sm font-medium text-[#2A3439] placeholder-gray-400 focus:outline-none focus:border-black/20 focus:bg-white transition-all duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-black/80" htmlFor="category">
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-5 py-4 bg-[#FAF9F6] border border-black/[0.06] rounded-[20px] text-sm font-medium text-[#2A3439] focus:outline-none focus:border-black/20 focus:bg-white transition-all duration-200 cursor-pointer appearance-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                required
              >
                <option value="">Select a category</option>
                <option value="chair">Chair</option>
                <option value="table">Table</option>
                <option value="sofa">Sofa</option>
                <option value="bed">Bed</option>
                <option value="diningtable">Dining Table</option>
                <option value="others">Others</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5 text-gray-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-black/80" htmlFor="genre">
              Genre
            </label>
            <div className="relative">
              <select
                id="genre"
                name="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-5 py-4 bg-[#FAF9F6] border border-black/[0.06] rounded-[20px] text-sm font-medium text-[#2A3439] focus:outline-none focus:border-black/20 focus:bg-white transition-all duration-200 cursor-pointer appearance-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                required
              >
                <option value="">Select a genre</option>
                <option value="living">Living Room</option>
                <option value="bedroom">Bedroom</option>
                <option value="dining">Dining</option>
                <option value="drawing">Drawing Room</option>
                <option value="sitout">Sitout</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5 text-gray-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase tracking-widest text-black/80">
            Main Cover Thumbnail
          </label>
          <label className="flex flex-col items-center justify-center w-full h-36 bg-[#FAF9F6] border border-dashed border-black/10 rounded-[20px] cursor-pointer hover:bg-black/[0.01] hover:border-black/20 transition-all duration-200 group">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <svg className="w-7 h-7 mb-2 text-gray-400 group-hover:text-[#2A3439] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 00-1.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-xs font-bold text-[#2A3439]/90 uppercase tracking-wider mb-0.5">Upload cover image</p>
              <p className="text-[11px] text-gray-400 font-medium">Select single display file</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) setThumbnail(e.target.files[0]);
              }}
              className="hidden"
            />
          </label>
          {thumbnail && (
            <div className="mt-1 p-3 bg-[#FAF9F6] border border-black/[0.04] rounded-[20px] text-xs font-medium text-[#2A3439]/80 truncate">
              <span className="font-black text-black/60 uppercase text-[10px] tracking-wider block mb-0.5">Selected Cover</span>
              {thumbnail.name}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase tracking-widest text-black/80">
            Product Canvas Assets
          </label>
          <label className="flex flex-col items-center justify-center w-full h-36 bg-[#FAF9F6] border border-dashed border-black/10 rounded-[20px] cursor-pointer hover:bg-black/[0.01] hover:border-black/20 transition-all duration-200 group">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <svg className="w-7 h-7 mb-2 text-gray-400 group-hover:text-[#2A3439] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-xs font-bold text-[#2A3439]/90 uppercase tracking-wider mb-0.5">Upload gallery images</p>
              <p className="text-[11px] text-gray-400 font-medium">Click to select multiple files</p>
            </div>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) setImages(Array.from(e.target.files));
              }}
              className="hidden"
            />
          </label>

          {images.length > 0 && (
            <div className="mt-1 p-4 bg-[#FAF9F6] border border-black/[0.04] rounded-[20px] space-y-1">
              <p className="text-[11px] font-black uppercase tracking-widest text-black/60 mb-2">Selected Files ({images.length})</p>
              {images.map((file, idx) => (
                <div key={idx} className="text-xs font-medium text-[#2A3439]/80 truncate">{file.name}</div>
              ))}
            </div>
          )}
        </div>

        <label className="flex items-center gap-4 bg-[#FAF9F6] border border-black/[0.04] p-5 rounded-[22px] cursor-pointer select-none hover:bg-black/[0.01] transition-colors duration-200">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="isLuxury"
              name="isLuxury"
              className="peer w-5 h-5 opacity-0 absolute cursor-pointer"
              checked={isLuxury}
              onChange={(e) => setIsLuxury(e.target.checked)}
            />
            <div className="w-5 h-5 rounded-md border border-black/20 bg-white flex items-center justify-center peer-checked:bg-black peer-checked:border-black transition-all duration-150">
              <svg className="w-3 h-3 text-white stroke-[3] hidden peer-checked:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2A3439]/90">
            Mark this product as a Luxury Tier assignment
          </span>
        </label>

        {error && <p className="text-xs font-semibold text-red-500 tracking-wide">{error}</p>}

        {/* 2. THE BUTTON: Cleaned up. No nested loading page and no onClick interceptor */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 cursor-pointer py-4 bg-[#2A3439] text-white font-bold text-xs uppercase tracking-widest rounded-[22px] hover:bg-black transition-all duration-300 shadow-[0_12px_30px_rgba(42,52,57,0.12)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </>
  );
}