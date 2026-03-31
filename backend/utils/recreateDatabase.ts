import fs from 'fs';
import path from 'path';

import { Pool } from 'mysql2/promise';
import connection from '../src/models/connection';

async function recreateDatabase(conn: Pool) {
  try {
    const importPath = path.resolve(__dirname, '..', 'Trybesmith.sql');
    const seedDBContent = fs.readFileSync(importPath).toString();
    const queries = seedDBContent.split(';').filter((query) => query.trim());
    for (let index = 0; index < queries.length; index += 1) {
      const query = queries[index];
      await conn.query(query);
    }
  } catch (error) {
    console.error('Falha ao restaurar o banco:', error);
    throw error;
  }
}

if (require.main === module) {
  recreateDatabase(connection).then(async () => {
    console.log('Banco restaurado com sucesso');
    await connection.end();
    process.exit(0);
  }).catch(async (error) => {
    console.error('Erro crítico ao restaurar o banco:', error.message);
    await connection.end();
    process.exit(1);
  });
}
