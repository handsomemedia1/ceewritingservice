"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const BUCKET = 'client-documents';
const LINK_LIFETIME_SECONDS = 60 * 60;

/** Orders store a bare object path; older rows store a full public URL. */
function toObjectPath(stored: string): string {
  const marker = `/${BUCKET}/`;
  const markerIndex = stored.indexOf(marker);
  if (markerIndex === -1) return stored;
  return decodeURIComponent(stored.slice(markerIndex + marker.length).split('?')[0]);
}

/**
 * Creates short-lived signed links for private order documents.
 * Returns a map keyed by the value stored on the order.
 */
export function useDocumentLinks(storedValues: string[]) {
  const [links, setLinks] = useState<Record<string, string>>({});
  const [failed, setFailed] = useState(false);
  const cacheKey = storedValues.join('\n');

  useEffect(() => {
    if (!cacheKey) return;
    let cancelled = false;
    const values = cacheKey.split('\n');

    createClient()
      .storage.from(BUCKET)
      .createSignedUrls(values.map(toObjectPath), LINK_LIFETIME_SECONDS)
      .then(({ data, error }) => {
        if (cancelled) return;
        const next: Record<string, string> = {};
        data?.forEach((item, index) => {
          if (item.signedUrl) next[values[index]] = item.signedUrl;
        });
        setLinks(next);
        setFailed(Boolean(error) || Object.keys(next).length < values.length);
      });

    return () => {
      cancelled = true;
    };
  }, [cacheKey]);

  return { links, failed };
}
