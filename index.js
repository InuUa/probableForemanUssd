
import express from 'express';
const app = express();

app.post('/api/v1/foreman', (req, res) => {

})

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

