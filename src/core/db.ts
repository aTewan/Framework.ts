interface mongoConfig {
  user: String,
  pass: String | null,
  db: String,
  host: String,
  port: Number | null,
  authMechanism: String | null
}
