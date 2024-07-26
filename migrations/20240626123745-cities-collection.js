export async function up(db, client) {
  return await db.createCollection("cities");
}

export async function down(db, client) {
  return await db.collection("cities").drop();
}
