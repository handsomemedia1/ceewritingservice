-- Create a public bucket for blog images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Set up security policies for the bucket
-- Allow public read access
create policy "blog_images_public_read"
  on storage.objects for select
  using ( bucket_id = 'blog-images' );

-- Allow authenticated users (writers/admins) to upload
create policy "blog_images_auth_insert"
  on storage.objects for insert
  with check ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );

-- Allow users to update/delete their own uploads if we want
create policy "blog_images_auth_update"
  on storage.objects for update
  using ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );
