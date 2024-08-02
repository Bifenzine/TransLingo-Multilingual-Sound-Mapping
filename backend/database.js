import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pdo = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_DATABASE_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})
  .promise();

export async function getWords() {
  const [rows] = await pdo.query("SELECT * FROM loanwords")
  return rows
}

export async function insertWord(french, arabic, notChanged, changed, changedA_F) {
  const [result] = await pdo.query('INSERT INTO loanwords (fr, darija, not_changed, changed,changedA_F) VALUES ( ?, ?, ?, ?,?)', [french, arabic, notChanged, changed, changedA_F]);
  return result[0]; // Return the inserted word
}

// check if word exist
export async function checkWordExists(french) {
  const [rows] = await pdo.query('SELECT count (*) as count from loanwords where fr= ?', [french])
  return rows[0].count > 0
}

//delete word
export async function deleteWord(id) {
  await pdo.query('DELETE FROM loanwords WHERE id = ?', [id]);
}

//edit word
export async function editWord(id, french, arabic, notChanged, changed, changedA_F) {
  await pdo.query('UPDATE loanwords SET fr = ?, arabic = ?, not_changed = ?, changed = ? ,changedA_F = ? WHERE id = ?', [french, arabic, notChanged, changed, id, changedA_F]);
}


// export async function getCar(id) {
//   const [rows] = await pdo.query(`SELECT * FROM cars WHERE idCar = ?`, [id]);
//   return rows[0];
// }
