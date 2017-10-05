'use strict';


module.exports = (app, passport) => {

	var root = '/deletron';
	
	app.get('/', (req, res) => res.render('index'));

	app.get('/logout', function(req, res){
	  console.log('logging out');
	  req.logout();
	  res.redirect(root + '/');
	});

	app.get('/auth/slack', passport.authenticate('slack'));
	app.get('/auth/slack/callback', passport.authenticate('slack', {
	  failureRedirect: root + '/'
	}), (req, res) => {
	  res.redirect(root + '/hooray')
	});

	app.get('/hooray', ensureAuthenticated, (req, res) => {
		res.render('app', {profileName: req.user.profile.displayName})
	});

	app.get('/auth', ensureAuthenticated, (req, res) => {
	  res.json(req.user);
	})

}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(root + '/')
}
