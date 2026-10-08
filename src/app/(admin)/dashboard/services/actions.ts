'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addCategory(title: string, description: string) {
  const supabase = await createClient()
  
  // Verify admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return { error: 'Admin access required' }

  const { error } = await supabase.from('categories').insert([{ title, description }])
  if (error) return { error: error.message }
  
  revalidatePath('/dashboard/services')
  revalidatePath('/services')
  revalidatePath('/')
  return { success: true }
}

export async function editCategory(id: string, title: string, description: string, display_order: number) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return { error: 'Admin access required' }

  const { error } = await supabase.from('categories').update({ title, description, display_order }).eq('id', id)
  if (error) return { error: error.message }
  
  revalidatePath('/dashboard/services')
  revalidatePath('/services')
  revalidatePath('/')
  return { success: true }
}

export async function addService(categoryId: string, name: string, desc: string, priceLabel: string, highPrice: string, popular: boolean, badge?: string, features?: string[], priceStr?: string, maxPriceStr?: string, pricingTypeStr?: string, pricingUnitStr?: string, currencyStr?: string, displayOrderStr?: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return { error: 'Admin access required' }

  
  let parsedPrice = priceStr && priceStr.trim() !== '' ? parseInt(priceStr, 10) : null;
  let parsedMaxPrice = maxPriceStr && maxPriceStr.trim() !== '' ? parseInt(maxPriceStr, 10) : null;
  let pType = pricingTypeStr && pricingTypeStr.trim() !== '' ? pricingTypeStr : 'unconfigured';
  let pUnit = pricingUnitStr && pricingUnitStr.trim() !== '' ? pricingUnitStr : null;
  let dOrder = displayOrderStr && displayOrderStr.trim() !== '' ? parseInt(displayOrderStr, 10) : 0;
  let curr = currencyStr && currencyStr.trim() !== '' ? currencyStr : 'NGN';

  const { error } = await supabase.from('services').insert([{ 
    category_id: categoryId, name, desc_text: desc, pricelabel: priceLabel, high_price: highPrice, popular, badge, features,
    price: parsedPrice, max_price: parsedMaxPrice, pricing_type: pType, pricing_unit: pUnit, display_order: dOrder, currency: curr
  }])
  
  if (error) return { error: error.message }
  
  revalidatePath('/dashboard/services')
  revalidatePath('/services')
  revalidatePath('/')
  return { success: true }
}

export async function deleteService(id: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return { error: 'Admin access required' }

  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) return { error: error.message }
  
  revalidatePath('/dashboard/services')
  revalidatePath('/services')
  revalidatePath('/')
  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return { error: 'Admin access required' }

  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) return { error: error.message }
  
  revalidatePath('/dashboard/services')
  revalidatePath('/services')
  revalidatePath('/')
  return { success: true }
}

export async function editService(id: string, name: string, desc: string, priceLabel: string, highPrice: string, popular: boolean, badge?: string, features?: string[], priceStr?: string, maxPriceStr?: string, pricingTypeStr?: string, pricingUnitStr?: string, currencyStr?: string, displayOrderStr?: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return { error: 'Admin access required' }

  
  let parsedPrice = priceStr && priceStr.trim() !== '' ? parseInt(priceStr, 10) : null;
  let parsedMaxPrice = maxPriceStr && maxPriceStr.trim() !== '' ? parseInt(maxPriceStr, 10) : null;
  let pType = pricingTypeStr && pricingTypeStr.trim() !== '' ? pricingTypeStr : 'unconfigured';
  let pUnit = pricingUnitStr && pricingUnitStr.trim() !== '' ? pricingUnitStr : null;
  let dOrder = displayOrderStr && displayOrderStr.trim() !== '' ? parseInt(displayOrderStr, 10) : 0;
  let curr = currencyStr && currencyStr.trim() !== '' ? currencyStr : 'NGN';

  const { error } = await supabase.from('services').update({ 
    name, desc_text: desc, pricelabel: priceLabel, high_price: highPrice, popular, badge, features,
    price: parsedPrice, max_price: parsedMaxPrice, pricing_type: pType, pricing_unit: pUnit, display_order: dOrder, currency: curr
  }).eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/dashboard/services')
  revalidatePath('/services')
  revalidatePath('/')
  return { success: true }
}
