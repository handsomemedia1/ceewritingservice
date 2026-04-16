-- Adds a SECURITY DEFINER function to increment resource download counts
-- This allows guests (unauthenticated users) to track downloads without opening RLS up fully

CREATE OR REPLACE FUNCTION public.increment_resource_download(row_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.resources
  SET downloads = COALESCE(downloads, 0) + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute access to anyone (public)
GRANT EXECUTE ON FUNCTION public.increment_resource_download(UUID) TO anon, authenticated;
