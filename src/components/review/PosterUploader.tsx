'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { useReviewStore } from '@/stores/reviewStore';
import { compressImage } from '@/lib/utils';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export function PosterUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentReview, setPosterImage } = useReviewStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const imageData = await compressImage(file);
        setPosterImage(imageData);
      } catch {
        setError('Failed to process image');
      } finally {
        setIsProcessing(false);
      }
    },
    [setPosterImage]
  );

  // Handle file input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  // Handle paste events
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const itemsArray = Array.from(items);
      for (const item of itemsArray) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            handleFile(file);
            break;
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handleFile]);

  // Remove poster
  const handleRemove = () => {
    setPosterImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white/80">
        Movie Poster
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {currentReview.posterImage ? (
        // Show current poster with remove option
        <div className="relative group">
          <div
            className="w-full h-48 rounded-xl bg-cover bg-center border-2 border-white/10"
            style={{ backgroundImage: `url(${currentReview.posterImage})` }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              title="Change poster"
            >
              <Upload className="w-5 h-5" />
            </button>
            <button
              onClick={handleRemove}
              className="p-3 bg-red-500/50 rounded-full hover:bg-red-500/70 transition-colors"
              title="Remove poster"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        // Drop zone
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            w-full h-48 rounded-xl border-2 border-dashed
            flex flex-col items-center justify-center gap-3
            cursor-pointer transition-all
            ${
              isDragging
                ? 'border-blue-400 bg-blue-400/10'
                : 'border-white/20 hover:border-white/40 hover:bg-white/5'
            }
            ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          {isProcessing ? (
            <div className="animate-spin w-8 h-8 border-2 border-white/30 border-t-white rounded-full" />
          ) : (
            <>
              <ImageIcon className="w-10 h-10 text-white/40" />
              <div className="text-sm text-white/60 text-center px-4">
                <span className="text-white/80">Click to upload</span> or drag
                and drop
                <br />
                <span className="text-xs">You can also paste an image</span>
              </div>
            </>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
