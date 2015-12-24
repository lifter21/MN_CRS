module.exports = function (app, passport) {

// ___ user
    // require('../api/user')(app);

//  ___ auth
    require('../api/auth')(app, passport);



};