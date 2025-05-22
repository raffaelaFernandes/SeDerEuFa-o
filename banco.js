import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';

//BANCO DE DADOS
export async function tabelaUsuarios(nome, email, senha) {
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });

    await db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY, nome TEXT, email TEXT, senha TEXT
  )`);

    const hashedSenha = await bcrypt.hash(senha, 10);


    await db.run(`INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)`, [nome, email, hashedSenha]);

    console.log('Usuário salvo com sucesso!');

}

