import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: 'Missing webhook secret' }, { status: 500 });
  }

  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createServerClient();

  // Handle the webhook event
  switch (evt.type) {
    case 'user.created': {
      const { id, username, first_name, last_name, image_url } = evt.data;

      const displayName = [first_name, last_name].filter(Boolean).join(' ') || null;

      const { error } = await supabase.from('users').insert({
        clerk_id: id,
        username: username || null,
        display_name: displayName,
        avatar_url: image_url || null,
      });

      if (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
      }

      console.log(`User created: ${id}`);
      break;
    }

    case 'user.updated': {
      const { id, username, first_name, last_name, image_url } = evt.data;

      const displayName = [first_name, last_name].filter(Boolean).join(' ') || null;

      const { error } = await supabase
        .from('users')
        .update({
          username: username || null,
          display_name: displayName,
          avatar_url: image_url || null,
        })
        .eq('clerk_id', id);

      if (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
      }

      console.log(`User updated: ${id}`);
      break;
    }

    case 'user.deleted': {
      const { id } = evt.data;

      if (id) {
        const { error } = await supabase.from('users').delete().eq('clerk_id', id);

        if (error) {
          console.error('Error deleting user:', error);
          return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
        }

        console.log(`User deleted: ${id}`);
      }
      break;
    }

    default:
      console.log(`Unhandled webhook event: ${evt.type}`);
  }

  return NextResponse.json({ success: true });
}
