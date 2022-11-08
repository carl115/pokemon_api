const bcrypt = require('bcryptjs');

const { pool } = require('../db');

const createUser = async (req, res) => {
    const user_name = req.body.user_name;

    const [result] = await pool.query('SELECT * FROM users WHERE username = ?', [user_name]);

    if(result.length > 0) {
        res.json({ message: false });
    }
    else {
        const password = bcrypt.hashSync(req.body.password);

        await pool.query(
            'INSERT INTO users(username, password) VALUES(?, ?)', 
            [user_name, password]
        );

        res.json({ message: true });
    }
}

const loginUser = async (req, res) => {
    const user_name = req.body.user_name;
    const password = req.body.password;

    const [result] = await pool.query(
        'SELECT * FROM users WHERE username = ?', [user_name]
    );

    if(result.length > 0) {
        const passwordHast = result[0].password;

        if(bcrypt.compareSync(password, passwordHast)) {
            res.json({ id: result[0].id, user: user_name });
        }
        else {
            res.json({ login: false });    
        }
    }
    else {
        res.json({ login: false });
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    
    await pool.query('DELETE FROM users WHERE id = ?', [id]);

    res.sendStatus(204);
}

module.exports = {
    createUser,
    loginUser,
    deleteUser
}