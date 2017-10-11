module.exports = function(app,passport){


app.get('/', function(req,res){
    
        res.render('index.html'); 
    
    });


app.get('/signin', function(req,res){
    
        res.render('signin');

    });

app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/results',
                                                    failureRedirect: '/'}
                                                    ));


app.get('/',isLoggedIn, function(req,res){
    
        res.render('results.html'); 
    
    });


app.get('/logout',function(req,res){
    
      req.session.destroy(function(err) {
      res.redirect('/');
      });
    
    });


app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/results',
                                                    failureRedirect: '/'}
                                                    ));


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

}






