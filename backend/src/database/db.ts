import pg from "pg";

const poolConfig : pg.PoolConfig = {
  host: "localhost",
  database: "react_todos",
  user: "postgres",
  password: "root"
}

export default new pg.Pool(poolConfig)

