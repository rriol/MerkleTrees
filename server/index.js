const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// paste the hex string in here, without the 0x prefix. Rule no more then 32 bytes
const MERKLE_ROOT = 'fc3e22b6c05d22cc5a1b6a6dc0746eec4e4f0d7380a71e39319210c56e22b6a5';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { name, proof}  = req.body;
 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
