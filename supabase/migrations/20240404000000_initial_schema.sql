-- INITIAL SCHEMA FOR HUSHABYE E-COMMERCE

-- CATEGORIES
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id uuid REFERENCES categories(id),
  seo_title TEXT,
  seo_description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- PRODUCTS
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  category_id uuid REFERENCES categories(id),
  price NUMERIC(10,2) NOT NULL,
  compare_at_price NUMERIC(10,2),
  cost_price NUMERIC(10,2),
  sku TEXT UNIQUE,
  barcode TEXT,
  track_inventory BOOLEAN DEFAULT true,
  stock_quantity INT DEFAULT 0,
  low_stock_threshold INT DEFAULT 10,
  weight_grams INT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[],
  images JSONB,          -- [{url, alt, position}]
  variants JSONB,        -- [{id, name, sku, price, stock, attributes}]
  attributes JSONB,      -- [{key, value}] e.g. size, volume, count
  -- SEO fields
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  og_image TEXT,
  schema_markup JSONB,   -- JSON-LD product schema
  canonical_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- CUSTOMERS (extends Supabase auth.users)
CREATE TABLE customers (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  phone TEXT,
  email TEXT,
  date_of_birth DATE,
  gender TEXT,
  total_orders INT DEFAULT 0,
  total_spent NUMERIC(10,2) DEFAULT 0,
  loyalty_points INT DEFAULT 0,
  tags TEXT[],
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ADDRESSES
CREATE TABLE addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  label TEXT,           -- Home / Work / Other
  full_name TEXT,
  phone TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  country TEXT DEFAULT 'India',
  is_default BOOLEAN DEFAULT false
);

-- ORDERS
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id),
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT,  -- razorpay | cod | upi
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  shipping_address JSONB,
  billing_address JSONB,
  line_items JSONB,     -- [{product_id, variant_id, name, sku, qty, unit_price, total, image}]
  subtotal NUMERIC(10,2),
  discount_amount NUMERIC(10,2) DEFAULT 0,
  coupon_code TEXT,
  shipping_amount NUMERIC(10,2) DEFAULT 0,
  tax_amount NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2),
  notes TEXT,
  tracking_number TEXT,
  courier_name TEXT,
  estimated_delivery DATE,
  fulfilled_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  refund_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ORDER STATUS HISTORY
CREATE TABLE order_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  status TEXT,
  note TEXT,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- INVENTORY LOG
CREATE TABLE inventory_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  variant_id TEXT,
  change_qty INT,
  reason TEXT,   -- sale | restock | adjustment | return | damaged
  reference_id uuid,  -- order_id or manual entry id
  previous_qty INT,
  new_qty INT,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- COUPONS
CREATE TABLE coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  type TEXT,  -- percentage | fixed | free_shipping
  value NUMERIC(10,2),
  min_order_amount NUMERIC(10,2) DEFAULT 0,
  max_discount_amount NUMERIC(10,2),
  usage_limit INT,
  used_count INT DEFAULT 0,
  per_customer_limit INT DEFAULT 1,
  applicable_products uuid[],
  applicable_categories uuid[],
  starts_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- REVIEWS
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  customer_id uuid REFERENCES customers(id),
  order_id uuid REFERENCES orders(id),
  rating INT CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  body TEXT,
  images TEXT[],
  is_verified_purchase BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  admin_reply TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- BANNERS / HOMEPAGE CONTENT
CREATE TABLE banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  subtitle TEXT,
  image_url TEXT,
  mobile_image_url TEXT,
  link_url TEXT,
  position TEXT,  -- hero | mid-banner | category-highlight
  sort_order INT,
  is_active BOOLEAN DEFAULT true,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ
);

-- BLOG POSTS
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  slug TEXT UNIQUE,
  excerpt TEXT,
  content TEXT,  -- HTML / Markdown
  featured_image TEXT,
  author TEXT,
  tags TEXT[],
  seo_title TEXT,
  seo_description TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- SITE SETTINGS
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- NOTIFICATIONS
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT,   -- low_stock | new_order | review_pending | refund_request
  title TEXT,
  message TEXT,
  reference_id uuid,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS POLICIES (Basic)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public products are viewable by everyone" ON products FOR SELECT USING (is_active = true);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public categories are viewable by everyone" ON categories FOR SELECT USING (is_active = true);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view their own profile" ON customers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Customers can update their own profile" ON customers FOR UPDATE USING (auth.uid() = id);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view their own addresses" ON addresses FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers can manage their own addresses" ON addresses FOR ALL USING (auth.uid() = customer_id);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view their own orders" ON orders FOR SELECT USING (auth.uid() = customer_id);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reviews are viewable by everyone" ON reviews FOR SELECT USING (is_published = true);
CREATE POLICY "Customers can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public banners are viewable by everyone" ON banners FOR SELECT USING (is_active = true);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public blog posts are viewable by everyone" ON blog_posts FOR SELECT USING (is_published = true);
