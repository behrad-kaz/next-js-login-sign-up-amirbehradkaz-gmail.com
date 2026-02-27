import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, params?: any[]) {
  const result = await pool.query(text, params);
  return result;
}

export async function initializeDatabase() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        image TEXT NOT NULL,
        category TEXT NOT NULL,
        rating REAL,
        review_count INTEGER,
        in_stock BOOLEAN DEFAULT true,
        tags TEXT,
        images TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        avatar TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        items TEXT NOT NULL,
        total REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS wishlist (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, product_id)
      );

      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        product_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        user_name TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    const result = await query("SELECT COUNT(*) FROM products");
    const count = parseInt(result.rows[0].count);
    
    if (count === 0) {
      const { mockProducts } = require("@/lib/data");
      for (const p of mockProducts) {
        await query(
          `INSERT INTO products (id, name, description, price, image, category, rating, review_count, in_stock, tags, images)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            p.id,
            p.name,
            p.description,
            p.price,
            p.image,
            p.category,
            p.rating || 0,
            p.reviewCount || 0,
            p.inStock || true,
            JSON.stringify(p.tags || []),
            JSON.stringify(p.images || [])
          ]
        );
      }
    }

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export async function getAllProducts() {
  const result = await query("SELECT * FROM products ORDER BY created_at DESC");
  return result.rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
    images: row.images ? JSON.parse(row.images) : [],
    inStock: row.in_stock,
    reviewCount: row.review_count,
    createdAt: row.created_at,
  }));
}

export async function getProductById(id: string) {
  const result = await query("SELECT * FROM products WHERE id = $1", [id]);
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  return {
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : [],
    images: row.images ? JSON.parse(row.images) : [],
    inStock: row.in_stock,
    reviewCount: row.review_count,
    createdAt: row.created_at,
  };
}

export async function createProduct(product: any) {
  const result = await query(
    `INSERT INTO products (id, name, description, price, image, category, rating, review_count, in_stock, tags, images)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    [
      product.id || `product-${Date.now()}`,
      product.name,
      product.description,
      product.price,
      product.image,
      product.category,
      product.rating || 0,
      product.reviewCount || 0,
      product.inStock !== false,
      JSON.stringify(product.tags || []),
      JSON.stringify(product.images || [])
    ]
  );
  return result.rows[0];
}

export async function updateProduct(id: string, updates: any) {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (updates.name !== undefined) {
    fields.push(`name = $${paramIndex++}`);
    values.push(updates.name);
  }
  if (updates.description !== undefined) {
    fields.push(`description = $${paramIndex++}`);
    values.push(updates.description);
  }
  if (updates.price !== undefined) {
    fields.push(`price = $${paramIndex++}`);
    values.push(updates.price);
  }
  if (updates.image !== undefined) {
    fields.push(`image = $${paramIndex++}`);
    values.push(updates.image);
  }
  if (updates.category !== undefined) {
    fields.push(`category = $${paramIndex++}`);
    values.push(updates.category);
  }
  if (updates.rating !== undefined) {
    fields.push(`rating = $${paramIndex++}`);
    values.push(updates.rating);
  }
  if (updates.reviewCount !== undefined) {
    fields.push(`review_count = $${paramIndex++}`);
    values.push(updates.reviewCount);
  }
  if (updates.inStock !== undefined) {
    fields.push(`in_stock = $${paramIndex++}`);
    values.push(updates.inStock);
  }
  if (updates.tags !== undefined) {
    fields.push(`tags = $${paramIndex++}`);
    values.push(JSON.stringify(updates.tags));
  }
  if (updates.images !== undefined) {
    fields.push(`images = $${paramIndex++}`);
    values.push(JSON.stringify(updates.images));
  }

  values.push(id);
  const result = await query(
    `UPDATE products SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
    values
  );
  return result.rows[0];
}

export async function deleteProduct(id: string) {
  await query("DELETE FROM products WHERE id = $1", [id]);
}

export async function getUserByEmail(email: string) {
  const result = await query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
}

export async function getUserById(id: string) {
  const result = await query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] || null;
}

export async function createUser(user: any) {
  const result = await query(
    `INSERT INTO users (id, email, password, name, role, avatar)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [user.id, user.email, user.password, user.name, user.role || "user", user.avatar || null]
  );
  return result.rows[0];
}

export async function updateUser(id: string, updates: any) {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (updates.name !== undefined) {
    fields.push(`name = $${paramIndex++}`);
    values.push(updates.name);
  }
  if (updates.email !== undefined) {
    fields.push(`email = $${paramIndex++}`);
    values.push(updates.email);
  }
  if (updates.password !== undefined) {
    fields.push(`password = $${paramIndex++}`);
    values.push(updates.password);
  }
  if (updates.role !== undefined) {
    fields.push(`role = $${paramIndex++}`);
    values.push(updates.role);
  }
  if (updates.avatar !== undefined) {
    fields.push(`avatar = $${paramIndex++}`);
    values.push(updates.avatar);
  }

  values.push(id);
  const result = await query(
    `UPDATE users SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
    values
  );
  return result.rows[0];
}

export async function getOrdersByUserId(userId: string) {
  const result = await query(
    "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows.map(row => ({
    ...row,
    items: row.items ? JSON.parse(row.items) : [],
  }));
}

export async function createOrder(order: any) {
  const result = await query(
    `INSERT INTO orders (id, user_id, items, total, status)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [order.id, order.userId, JSON.stringify(order.items), order.total, order.status || "pending"]
  );
  return {
    ...result.rows[0],
    items: result.rows[0].items ? JSON.parse(result.rows[0].items) : [],
  };
}

export async function getWishlistByUserId(userId: string) {
  const result = await query(
    "SELECT * FROM wishlist WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
}

export async function addToWishlist(userId: string, productId: string) {
  await query(
    "INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [userId, productId]
  );
}

export async function removeFromWishlist(userId: string, productId: string) {
  await query(
    "DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2",
    [userId, productId]
  );
}

export async function isInWishlist(userId: string, productId: string) {
  const result = await query(
    "SELECT 1 FROM wishlist WHERE user_id = $1 AND product_id = $2",
    [userId, productId]
  );
  return result.rows.length > 0;
}

export async function getReviewsByProductId(productId: string) {
  const result = await query(
    "SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC",
    [productId]
  );
  return result.rows;
}

export async function createReview(review: any) {
  const result = await query(
    `INSERT INTO reviews (product_id, user_id, user_name, rating, comment)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [review.productId, review.userId, review.userName, review.rating, review.comment]
  );
  return result.rows[0];
}
