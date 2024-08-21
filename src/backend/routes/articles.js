import express from 'express';
import { query } from '../config/db.js'; // Corrected the import path

const router = express.Router();

// Create a new article
router.post('/', async (req, res) => {
    const { broker_id, image_url, title, content } = req.body;
    const insertArticleQuery = `
        INSERT INTO articles (broker_id, image_url, title, content)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    try {
        const result = await query(insertArticleQuery, [broker_id, image_url, title, content]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error creating article' });
    }
});

// Get articles for a broker
router.get('/broker/:broker_id', async (req, res) => {
    const { broker_id } = req.params;
    const getArticlesQuery = `
        SELECT * FROM articles WHERE broker_id = $1;
    `;
    try {
        const result = await query(getArticlesQuery, [broker_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching articles' });
    }
});

// Update an article
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { image_url, title, content } = req.body;
    const updateArticleQuery = `
        UPDATE articles
        SET image_url = $1, title = $2, content = $3
        WHERE id = $4
        RETURNING *;
    `;
    try {
        const result = await query(updateArticleQuery, [image_url, title, content, id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error updating article' });
    }
});

// Delete an article
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deleteArticleQuery = `
        DELETE FROM articles WHERE id = $1;
    `;
    try {
        await query(deleteArticleQuery, [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting article' });
    }
});

export default router; // Export the router