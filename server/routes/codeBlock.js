const router = require('express').Router();
const {templeteBlocks} = require('../data')

router.get('/:blockType', async (req, res) => {
  const { blockType } = req.params;
  res.json(templeteBlocks[blockType]);
});

module.exports = router;
