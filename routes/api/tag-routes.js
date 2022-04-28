const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsList = await Tag.findAll( {
      include: [ { model: Product } ]
    });
    res.status(200).json(tagsList);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product } ]
    });
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const { tag_name } = req.body;

    if (!tag_name) {
      res.status(400).json('That body format was not recognized.');
      return;
    };

    const changeTag = Tag.update(
      {
        id: req.body.id,
        tag_name: req.body.tag_name,
      },
      {
        where: { id: req.params.id }
      },
    );
    if (!changeTag) {
      res.status(400).json('That is not a valid tag id')
    };
    res.status(200).json(changeTag);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const byeByeTag = await Tag.destroy({
      where: { id: req.params.id}
    });
    res.status(200).json(byeByeTag);
  } catch (err) {
    res.status(400).json(err);
  };
});

module.exports = router;
