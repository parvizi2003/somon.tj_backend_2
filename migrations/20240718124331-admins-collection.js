export async function up(db, client) {
  return await db.createCollection("admins");
}

export async function down(db, client) {
  return await db.collection("admins").drop();
}
