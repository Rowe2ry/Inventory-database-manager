const router = require('express').Router();
const { ProductTag } = require('../../models');

router.put('/:id', async (req,res) => {
    try {
        const { product_id, tag_id } = req.body;

        if (!product_id && !tag_id) {
            res.status(400).json('This request only makes sense with 2 parameters \n \"poduct_id\": \n and \"tag_id\"');
        };

        const assignTags = await ProductTag.update(
            {
                product_id: req.body.product_id,
                tag_id: req.body.tag_id
            },
            {
                where: { id: req.params.id }
            }
        );
        res.status(200).json(assignTags);
    } catch (err) {
        res.status(400).json(err);
    };
});

module.exports = router;