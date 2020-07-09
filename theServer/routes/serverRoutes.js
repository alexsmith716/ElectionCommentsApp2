
var app = require('../../app');
var controllerIndex = require('../controller/serverMainCtrls');

app.get('/', controllerIndex.getAllComments);

app.get('/comments', controllerIndex.getAddNewComment);
app.get('/about', controllerIndex.getAbout);
app.get('/contact', controllerIndex.getContact);
app.get('/team', controllerIndex.getTeam);


app.post('/comments', controllerIndex.postOneComment);


app.get('/:commentid',  controllerIndex.getOneComment);
/*
app.get('/comments/:commentid',  controllerIndex.getOneComment);
app.put('/comments/:commentid',  controllerIndex.editOneComment);
app.delete('/:commentid',  controllerIndex.deleteOneComment);
*/


/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */





/*

            .pull-right
              form(class="btn-group", method="post", action="/comments/#{commentsid}?_method=put")
                button(class="btn btn-default btn-md", type="submit") Edit
              | &nbsp;&nbsp;&nbsp;&nbsp;
              form(class="btn-group inline", method="post", action="/comments/#{commentsid}?_method=delete")
                button(class="btn btn-warning btn-md", type="submit") Delete

*/