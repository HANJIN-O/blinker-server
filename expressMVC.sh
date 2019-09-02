
# run by command in terminal (be sure you're in root directory of CRA app)
# shell$ chmod 700 expressMVC.sh
# shell$ source expressMVC.sh

#!/bin/sh

echo "============================================================================"
echo "============================================================================"
touch .gitignore

#make basic structure
touch app.js
echo 'const express = require("express");' >> app.js
echo 'const cors = require("cors");' >> app.js
echo 'const router = require("./routes.js");' >> app.js

echo 'const app = express();' >> app.js

echo 'app.use(cors());' >> app.js
echo 'app.use(express.json());' >> app.js

echo 'app.use("/", router); >>' app.js
echo 'app.listen(5000, () => {' >> app.js
echo '  console.log("Listen on 5000");' >> app.js
echo '});' >> app.js


touch routes.js
echo 'const controller = require("./controller");' >> routes.js
echo 'const router = require("express").Router();' >> routes.js
echo 'module.exports = router;' >> routes.js



mkdir controller
touch index.js

mkdir db
touch index.js

mkdir model
touch index.js


#mv all css to src/stylesheet
echo "move *.css to src/stylesheet"
mv src/*.css src/stylesheet/

#mv App.js & App.test.js to src/shared
echo "move App.* & App.* to src/shared"
mv src/App.js src/shared/
mv src/App.test.js src/shared/

#add to .gitignore yarn.lock & package-lock.json 
echo "add to .gitignore yarn.lock & package-lock.json"
echo 'yarn.lock' >> .gitignore
echo 'package-lock.json' >> .gitignore

 



echo "============================================================================"
echo "=============================Created by HJ=================================="
echo "============================================================================"
