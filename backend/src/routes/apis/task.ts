import Express from 'express';
const router = Express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Success! GET /api/task' });
});

router.post('/', (req, res) => {
  res.send({ message: 'Success! POST /api/task' });
});

router.put('/:id', (req, res) => {
  res.send({ message: 'Success! PUT /api/task/:id' });
});


router.delete('/:id', (req, res) => {
  res.send({ message: 'Success! DELETE /api/task/:id' });
});

export default router;
