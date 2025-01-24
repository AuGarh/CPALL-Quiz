const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/api/v1/products', (req, res) => {
    let sql = "SELECT * FROM product";
    const search = req.query.search;
    if (search)
        sql += " WHERE name LIKE ?";

    db.query(sql, search ? [`%${search}%`] : [], (err, result) => {
        if (err) res.send(err);
        res.send(result);
    });
});

router.put('/api/v1/products/:id', (req, res) => {
    const sql = "update product set `name` = ?, `price` = ?, `stock` = ? where `id` = ?";
    const id = Number(req.query.id);
    db.query(sql, [req.body.name, req.body.price, req.body.stock, id], (err, result) => {
        if (err) res.send(err);
        return res.json(result);
    });
});

router.delete('/api/v1/products', (req, res) => {
    const sql = "delete from product where `id` = ?";
    const id = Number(req.query.id);
    db.query(sql, [id], (err, result) => {
        if (err) res.send(err);
        return res.json(result);
    });
});

module.exports = router;