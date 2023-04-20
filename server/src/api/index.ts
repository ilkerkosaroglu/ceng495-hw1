import express from 'express';
const router = express.Router();

router.get('/categories', (_, res) => {
    return res.send({
        categories: [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }]
    });
});

router.use((_, res) => {
    res.status(403).send({
        message: "Not found"
    });
});

export default router;