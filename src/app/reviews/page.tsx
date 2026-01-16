'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Plus, Grid, List, Search, Loader2, Star, Calendar, Trash2 } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import type { Review } from '@/lib/supabase/types';

export default function ReviewsPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  // Fetch reviews
  useEffect(() => {
    async function fetchReviews() {
      if (!isSignedIn) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          setReviews(data.reviews || []);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoaded) {
      fetchReviews();
    }
  }, [isLoaded, isSignedIn]);

  // Filter reviews by search
  const filteredReviews = reviews.filter(
    (review) =>
      review.title.toLowerCase().includes(search.toLowerCase()) ||
      review.metadata?.toLowerCase().includes(search.toLowerCase()) ||
      review.review_text?.toLowerCase().includes(search.toLowerCase())
  );

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  // Show sign-in prompt if not authenticated
  if (isLoaded && !isSignedIn) {
    return (
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Your Reviews</h1>
          <p className="text-white/60 mb-6">
            Sign in to save and access your reviews from anywhere.
          </p>
          <Link
            href="/sign-in"
            className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Reviews</h1>
            <p className="text-white/60 mt-1">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Review
          </Link>
        </header>

        {/* Toolbar */}
        <div className="flex items-center gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reviews..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl
                       focus:outline-none focus:border-blue-400 placeholder:text-white/30"
            />
          </div>

          {/* View toggle */}
          <div className="flex bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'grid' ? 'bg-white/10' : 'hover:bg-white/5'
              )}
              title="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'list' ? 'bg-white/10' : 'hover:bg-white/5'
              )}
              title="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-white/40" />
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/60 mb-4">
              {search ? 'No reviews match your search.' : "You haven't created any reviews yet."}
            </p>
            {!search && (
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
              >
                Create Your First Review
              </Link>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredReviews.map((review) => (
              <ReviewGridCard
                key={review.id}
                review={review}
                onDelete={() => handleDelete(review.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReviews.map((review) => (
              <ReviewListItem
                key={review.id}
                review={review}
                onDelete={() => handleDelete(review.id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Grid card component
function ReviewGridCard({
  review,
  onDelete,
}: {
  review: Review;
  onDelete: () => void;
}) {
  const scoreNames = review.score_names || ["Didn't Like It", "Decent", "Liked It", "Loved It!"];

  return (
    <div className="group relative bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
      {/* Poster */}
      <div
        className="aspect-[2/3] bg-cover bg-center"
        style={{
          backgroundImage: review.poster_url ? `url(${review.poster_url})` : undefined,
          backgroundColor: review.poster_url ? undefined : 'rgba(255,255,255,0.1)',
        }}
      >
        {!review.poster_url && (
          <div className="flex items-center justify-center h-full text-white/30 text-sm">
            No Poster
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold truncate">{review.title}</h3>
        {review.metadata && (
          <p className="text-sm text-white/60 truncate">{review.metadata}</p>
        )}
        <div className="flex items-center gap-2 mt-2 text-xs text-white/40">
          <Star className="w-3 h-3" />
          <span>{scoreNames[review.score - 1]}</span>
        </div>
      </div>

      {/* Hover actions */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
        <Link
          href={`/reviews/${review.id}`}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors"
        >
          View
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
          className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
      </div>
    </div>
  );
}

// List item component
function ReviewListItem({
  review,
  onDelete,
}: {
  review: Review;
  onDelete: () => void;
}) {
  const scoreNames = review.score_names || ["Didn't Like It", "Decent", "Liked It", "Loved It!"];

  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
      {/* Poster thumbnail */}
      <div
        className="w-16 h-24 rounded-lg bg-cover bg-center flex-shrink-0"
        style={{
          backgroundImage: review.poster_url ? `url(${review.poster_url})` : undefined,
          backgroundColor: review.poster_url ? undefined : 'rgba(255,255,255,0.1)',
        }}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{review.title}</h3>
        {review.metadata && (
          <p className="text-sm text-white/60 truncate">{review.metadata}</p>
        )}
        <div className="flex items-center gap-4 mt-2 text-xs text-white/40">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {scoreNames[review.score - 1]}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(review.created_at)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          href={`/reviews/${review.id}`}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
        >
          View
        </Link>
        <button
          onClick={onDelete}
          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4 text-white/40 hover:text-red-400" />
        </button>
      </div>
    </div>
  );
}
