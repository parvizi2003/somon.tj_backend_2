export async function up(db, client) {
  return await db.createCollection("users");
}

export async function down(db, client) {
  return await db.collection("users").drop();
}
