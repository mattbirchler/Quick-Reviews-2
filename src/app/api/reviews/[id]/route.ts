import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createServerClient } from '@/lib/supabase/server';
import type { ReviewUpdate } from '@/lib/supabase/types';

// GET /api/reviews/[id] - Get a single review
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId } = await auth();
    const supabase = createServerClient();

    // Fetch the review
    const { data: review, error } = await supabase
      .from('reviews')
      .select('*, users(username, display_name)')
      .eq('id', id)
      .single();

    if (error || !review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Check if user can view this review
    if (!review.is_public) {
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Get user's database ID from Clerk ID
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('clerk_id', userId)
        .single();

      if (!user || user.id !== review.user_id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    return NextResponse.json({ review });
  } catch (error) {
    console.error('Error in GET /api/reviews/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/reviews/[id] - Update a review
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createServerClient();

    // Get user's database ID from Clerk ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify ownership
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existingReview || existingReview.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();

    const updateData: ReviewUpdate = {};

    // Only include fields that are provided
    if (body.title !== undefined) updateData.title = body.title;
    if (body.metadata !== undefined) updateData.metadata = body.metadata;
    if (body.reviewText !== undefined) updateData.review_text = body.reviewText;
    if (body.score !== undefined) updateData.score = body.score;
    if (body.posterUrl !== undefined) updateData.poster_url = body.posterUrl;
    if (body.posterSource !== undefined) updateData.poster_source = body.posterSource;
    if (body.themeId !== undefined) updateData.theme_key = body.themeId;
    if (body.customColors !== undefined) updateData.custom_colors = body.customColors;
    if (body.scoreNames !== undefined) updateData.score_names = body.scoreNames;
    if (body.fontSizes !== undefined) updateData.font_sizes = body.fontSizes;
    if (body.mediaType !== undefined) updateData.media_type = body.mediaType;
    if (body.isPublic !== undefined) updateData.is_public = body.isPublic;

    const { data: review, error } = await supabase
      .from('reviews')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating review:', error);
      return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
    }

    return NextResponse.json({ review });
  } catch (error) {
    console.error('Error in PUT /api/reviews/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/reviews/[id] - Delete a review
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createServerClient();

    // Get user's database ID from Clerk ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify ownership and delete
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting review:', error);
      return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/reviews/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
