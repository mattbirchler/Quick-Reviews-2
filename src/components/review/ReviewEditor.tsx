'use client';

import { useEffect, useRef } from 'react';
import { useReviewStore } from '@/stores/reviewStore';
import { useUIStore } from '@/stores/uiStore';
import { X } from 'lucide-react';

export function ReviewEditor() {
  const { isEditModalOpen, closeEditModal } = useUIStore();
  const { currentReview, setTitle, setMetadata, setReviewText } =
    useReviewStore();

  const titleRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus title input when modal opens
  useEffect(() => {
    if (isEditModalOpen) {
      setTimeout(() => titleRef.current?.focus(), 100);
    }
  }, [isEditModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isEditModalOpen) {
        closeEditModal();
      }
      // Cmd/Ctrl + Enter to save and close
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && isEditModalOpen) {
        closeEditModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isEditModalOpen, closeEditModal]);

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      closeEditModal();
    }
  };

  if (!isEditModalOpen) return null;

  return (
    <div
      ref={modalRef}
      className="modal-backdrop animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-lg mx-4 bg-[#1e1e2e] rounded-2xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Edit Review</h2>
          <button
            onClick={closeEditModal}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Title
            </label>
            <input
              ref={titleRef}
              id="title"
              type="text"
              value={currentReview.title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Movie Title"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                       focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400
                       placeholder:text-white/30"
            />
          </div>

          {/* Metadata */}
          <div>
            <label
              htmlFor="metadata"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Year & Director
            </label>
            <input
              id="metadata"
              type="text"
              value={currentReview.metadata}
              onChange={(e) => setMetadata(e.target.value)}
              placeholder="2024 - Christopher Nolan"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                       focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400
                       placeholder:text-white/30"
            />
          </div>

          {/* Review text */}
          <div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Your Review
            </label>
            <textarea
              id="review"
              value={currentReview.reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your thoughts about the movie..."
              rows={5}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                       focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400
                       placeholder:text-white/30 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center">
          <span className="text-xs text-white/40">
            Press ⌘+Enter to save • Esc to close
          </span>
          <button
            onClick={closeEditModal}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium
                     transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
