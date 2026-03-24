import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  // Під час деплою на Heroku рядок підключення автоматично береться з process.env.DATABASE_URL
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:pass@localhost:5432/tv_program",
  // Для Heroku обов'язково розкоментуй наступний рядок:
  // ssl: { rejectUnauthorized: false }
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
