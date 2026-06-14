const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function generateBackup() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    database: 'riego_db'
  });

  const lines = [];
  lines.push('-- ============================================');
  lines.push('-- Respaldo de la base de datos: riego_db');
  lines.push(`-- Fecha: ${new Date().toISOString()}`);
  lines.push('-- ============================================');
  lines.push('');
  lines.push('CREATE DATABASE IF NOT EXISTS `riego_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
  lines.push('USE `riego_db`;');
  lines.push('');

  // Get all tables
  const [tables] = await conn.query('SHOW TABLES');
  for (const row of tables) {
    const tableName = row[Object.keys(row)[0]];

    // Get CREATE TABLE
    const [createResult] = await conn.query(`SHOW CREATE TABLE \`${tableName}\``);
    const createStmt = createResult[0]['Create Table'];
    lines.push(`DROP TABLE IF EXISTS \`${tableName}\`;`);
    lines.push('');
    lines.push(createStmt + ';');
    lines.push('');

    // Get all data
    const [rows] = await conn.query(`SELECT * FROM \`${tableName}\``);
    if (rows.length > 0) {
      const columns = Object.keys(rows[0]);
      const colList = columns.map(c => `\`${c}\``).join(', ');

      for (const row of rows) {
        const values = columns.map(col => {
          const val = row[col];
          if (val === null) return 'NULL';
          if (typeof val === 'number') return val.toString();
          return `'${String(val).replace(/'/g, "\\'").replace(/\\/g, '\\\\')}'`;
        });
        lines.push(`INSERT INTO \`${tableName}\` (${colList}) VALUES (${values.join(', ')});`);
      }
      lines.push('');
    }
  }

  await conn.end();

  const outputPath = path.join(__dirname, '..', 'backup_riego_db.sql');
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
  console.log(`Respaldo generado: ${outputPath}`);
  console.log(`Tablas exportadas: ${tables.length}`);
}

generateBackup().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
