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

router.get('/api/v1/products/:id', (req, res) => {
    let sql = "SELECT * FROM product WHERE id = ?";
    const id = Number(req.params.id);
    db.query(sql, [id], (err, result) => {
        if (err) res.send(err);
        res.send(result[0]);
    });
});

router.put('/api/v1/products', (req, res) => {
    const { name, price, stock } = req.body;
    const sql = "INSERT INTO product (`name`, `price`, `stock`) VALUES (?, ?, ?)";
    db.query(sql, [name, price, stock], (err, result) => {
        if (err) res.send(err);
        return res.json(result);
    });
});

router.put('/api/v1/products/:id', (req, res) => {
    const sql = "update product set `name` = ?, `price` = ?, `stock` = ? where `id` = ?";
    const id = Number(req.params.id);
    db.query(sql, [req.body.name, req.body.price, req.body.stock, id], (err, result) => {
        if (err) res.send(err);
        return res.json(result);
    });
});

router.delete('/api/v1/products/:id', (req, res) => {
    const sql = "delete from product where `id` = ?";
    const id = Number(req.params.id);
    db.query(sql, [id], (err, result) => {
        if (err) res.send(err);
        return res.json(result);
    });
});

module.exports = router;