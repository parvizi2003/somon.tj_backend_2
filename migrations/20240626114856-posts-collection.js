export async function up(db, client) {
  return await db.createCollection("posts");
}

export async function down(db, client) {
  return await db.collection("posts").drop();
}
