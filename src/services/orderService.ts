import { supabase } from '../lib/supabase';

export interface OrderItem {
  product_id: string;
  variant_id?: string;
  name: string;
  sku?: string;
  qty: number;
  unit_price: number;
  total: number;
  image?: string;
}

export interface OrderData {
  customer_id?: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  shipping_address: any;
  billing_address: any;
  line_items: OrderItem[];
  subtotal: number;
  discount_amount: number;
  shipping_amount: number;
  tax_amount: number;
  total: number;
}

export const orderService = {
  async createOrder(orderData: OrderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateOrder(orderId: string, updates: Partial<OrderData>) {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getOrder(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  },

  async getCustomerOrders(customerId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  subscribeToOrder(orderId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`order-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        callback
      )
      .subscribe();
  },
};
