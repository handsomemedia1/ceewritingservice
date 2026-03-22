"use server";
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addPackage(data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('packages').insert({
    name: data.name,
    desc_text: data.desc_text,
    price: data.price,
    price_label: data.price_label,
    save_label: data.save_label,
    badge: data.badge || null,
    featured: data.featured,
    features: data.features, // Should be array of strings
    display_order: data.display_order || 0
  });

  if (error) throw error;
  revalidatePath('/dashboard/packages');
}

export async function editPackage(id: string, data: any) {
  const supabase = createClient();
  const { error } = await supabase.from('packages').update({
    name: data.name,
    desc_text: data.desc_text,
    price: data.price,
    price_label: data.price_label,
    save_label: data.save_label,
    badge: data.badge || null,
    featured: data.featured,
    features: data.features,
    display_order: data.display_order || 0
  }).eq('id', id);

  if (error) throw error;
  revalidatePath('/dashboard/packages');
}

export async function deletePackage(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('packages').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/dashboard/packages');
}
