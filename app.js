import express from 'express';
import bodyParser from 'body-parser';
import { tabelaUsuarios } from './banco.js';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3'; 
import { open } from 'sqlite'; 
import bcrypt from 'bcrypt'; 

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;
    console.log('Cadastrando usuário:', nome, email);
     try {
        await tabelaUsuarios(nome, email, senha);
        res.redirect('/tarefas.html'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar usuário');
    } 
});

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    console.log('Login recebido:', email);

    try {
        const db = await open({
            filename: './banco.db',
            driver: sqlite3.Database,
        });

        const user = await db.get(`SELECT * FROM usuarios WHERE email = ?`, [email]);

        if (user && await bcrypt.compare(senha, user.senha)) {
            res.redirect('/tarefas.html');
        } else {
            res.send('Email ou senha inválidos.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
});
