'use client';

import { useState, useEffect } from 'react';

type ImageItem = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  folder: string;
};

interface CloudinaryGalleryProps {
  folder: string;
  className?: string;
}

export function CloudinaryGallery({ folder, className = '' }: CloudinaryGalleryProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        const response = await fetch(`/api/cloudinary/folder?folder=${encodeURIComponent(folder)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        
        const data = await response.json();
        setImages(data.images || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (folder) {
      fetchImages();
    }
  }, [folder]);

  if (loading) {
    return <div className={`p-4 text-center ${className}`}>Loading images...</div>;
  }

  if (error) {
    return <div className={`p-4 text-center text-red-500 ${className}`}>Error: {error}</div>;
  }

  if (images.length === 0) {
    return <div className={`p-4 text-center text-gray-500 ${className}`}>No images found in folder: {folder}</div>;
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {images.map((img) => (
        <div key={img.public_id} className="relative group">
          <img
            src={img.secure_url}
            alt={img.public_id}
            className="w-full h-auto object-cover rounded-lg transition-transform group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg" />
        </div>
      ))}
    </div>
  );
}
