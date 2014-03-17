//routes for the index page links

exports.index = function(req, res){
  res.render('index', { title: 'BidCraft' });
};

exports.clients = function(req, res){
  res.render('defaultPage', { title: 'BidCraft', page : 'Clients', copy : 'List of clients:' });
};

exports.about = function(req, res){
  res.render('about', { title: 'BidCraft', page : 'About', copy : 'Welcome to the about page. Which extends the default page.' });
};

exports.quickbid = function(req, res){
  res.render('bidform', { title: 'BidCraft', page : 'Quick Bid', copy : 'Create a Bid:' });
};

exports.saveBid = function(db) {
    return function(req, res) {
        // Get our form values. These rely on the "name" attributes
        var clientName = req.body.clientName;
        var location = req.body.location;
        var quote = req.body.quote;
        var phone = req.body.phone;
        var email = req.body.email;
        var date = new Date();

        // Set our collection
        var collection = db.get('bids');

        // Submit to the DB
        collection.insert({
            "clientName" : clientName,
            "location" : location,
            "quote" : quote,
            "phone" : phone,
            "email" : email,
            "date" : date

        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("bidlist");
                // And forward to success page
                res.redirect("bidlist");
            }
        });

    };
};

exports.showBids = function(db){
    return function(req, res) {
        var collection = db.get('bids');
        collection.find({},{},function(e,docs){
            res.render('bidlist', {
                "bids" : docs,
                "title": 'BidCraft',
                "page" : 'Bids',
                "copy" : 'Click on a bid to see a detailed view or to edit..'
            });
        });
    };
};

exports.showClient = function(db, clientName){
    return function(req, res) {
        var collection = db.get('bids');
        collection.find({ name: clientName},{},function(e,docs){
            res.render('bidlist', {
                "bids" : docs,
                "title": 'BidCraft',
                "page" : 'Bids',
                "copy" : 'Click on a bid to see a detailed view or to edit..'
            });
        });
    };
};