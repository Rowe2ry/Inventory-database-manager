const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryList = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryList);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new category
  

  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory)
  } catch {
    res.status(400).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const { category_name } = req.body;

    if (!category_name) {
      res.status(400).json('That body format was not recognized.');
      return;
    };

    const changeCategory = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        },
      },
    );
    if (!changeCategory) {
      res.status(400).json('That is not a valid category id');
    };

    res.status(200).json(changeCategory);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
try {
    const byeByeCat = await Category.destroy({
      where: { id: req.params.id }
    });
    res.status(200).json(byeByeCat);
  } catch (err) {
    res.status(400).json(err);
  };
});

module.exports = router;
