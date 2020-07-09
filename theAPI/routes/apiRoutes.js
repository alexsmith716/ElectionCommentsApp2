
var express = require('express');
var router = express.Router();
var apiControllers = require('../controller/apiMainCtrls');

// Router-level middleware works in the same way as application-level middleware,
// except it is bound to an instance of express.Router()

router.get('/comments', apiControllers.getAllCommentsResponse);
router.post('/comments', apiControllers.postOneCommentResponse);



router.get('/:commentid', apiControllers.getOneCommentResponse);
/*
app.get('/', controllerIndex.getAllComments);

app.get('/comments', controllerIndex.getAddNewComment);
app.post('/comments', controllerIndex.postOneComment);


app.get('/comments/:commentid',  controllerIndex.getOneComment);
app.put('/comments/:commentid',  controllerIndex.editOneComment);
app.delete('/comments/:commentid',  controllerIndex.deleteOneComment);
*/

module.exports = router;

/*
cd documents/oldss/electioncommentsapp2

GET All: curl -i -X GET http://localhost:3000/
GET 1: 	curl -i -X GET http://localhost:3000/electioncomment/5783936535c67db102ca4c30
DELETE: curl -i -X DELETE http://localhost:3000/wines/5783936535c67db102ca4c30
CREATE: curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New Wine", "year": "2009"}' http://localhost:3000/wines
UPDATE: curl -i -X PUT -H 'Content-Type: application/json' -d '{"name": "FOO", "year": "1930","grapes": "BOOGER","country": "USA","region": "Upstate","description": "The smell is !!..."}' http://localhost:3000/wines/57879bc00750bf1731e7440f
*/

/*
####### > app.js 
####### > dbConnector.js 
####### > theSchema.js 
####### > indexSR.js
####### > indexSC.js 
####### > indexAR.js 
####### > indexAC.js 
Mongoose connected to: mongodb://localhost/SuperBasicApiApp

Above before app launched +++++++++++++++++++++++++++++++++++

####### > indexSC.js > module.exports.indexView 1


####### > indexAC.js > module.exports.basicApiList 1 
####### > indexAC.js > module.exports.basicApiList 2
####### > indexAC.js > buildBasicApiList 
####### > indexAC.js > buildBasicApiList > return responseBody
####### > indexAC.js > module.exports.basicApiList 3
####### > indexAC.js > sendJSONresponse (content): [ { theText: 'Numquam itaque et hic reiciendis.',
    _id: 57798c4e102b1b3b52a33c3b },
  { theText: 'NumquamXXX itaque et hic reiciendis.',
    _id: 57798f0c102b1b3b52a33c3c } ]
####### > indexAC.js > module.exports.basicApiList 4


####### > indexSC.js > module.exports.indexView 2
####### > indexSC.js > renderCallbackData1(responseBody): [ { theText: 'Numquam itaque et hic reiciendis.',
    _id: '57798c4e102b1b3b52a33c3b' },
  { theText: 'NumquamXXX itaque et hic reiciendis.',
    _id: '57798f0c102b1b3b52a33c3c' } ]
####### > indexSC.js > renderCallbackData2
*/
