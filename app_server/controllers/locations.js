/* GET 'home' page */
module.exports.homeList = function(req, res){
    res.render('location-list', 
    {
        'title':'Loc8er - Find places to work with wifi new you !',
        header:{
            headerText:'Loc8er',
            slogan:'Find places to work with wifi new you !'
        },
        locations:[
            {
                name:'StarBucks',
                rating:5,
                address:'125, Jump Street, NY',
                facilities:[
                    'Hot Drinks','Coffee','Cakes','Snakes','Premium Wifi'
                ],  
                distance:120
            },
            {
                name:'Blue Turban',
                rating:4,
                address:'Toor ji ka jhalra, ClockTower, Jodhpur',
                facilities:[
                    'Coffee','Food','Wifi'
                ],  
                distance:600
            }
        ]
    }
);
};
/* GET 'Location info' page */
module.exports.locationInfo = function(req, res){
res.render('location-info',
        {
            title: 'Location info',
            address:'Toor ji ka jhalra, ClockTower, Jodhpur',
            rating:4,
            description:'direct trade  sustainable PBR&B quinoa Cosby sweater selvage pop-up tousled High Life freegan Austin photo booth tote bag Tonx fap keytar ugh single-origin coffee Tumblr jean shorts leggings VHS drinking vinegar cray meh Pitchfork Banksy cliche mixtape kogi selfies pour-over pickled vegan forage McSweeney',
            hours:[
                'Monday - Friday span 9:00 AM - 10:30 PM',
                'Saturday 9:00 AM - 6:30 PM',
                'Sunday Closed'
            ],
            facilities:[
                'Coffee','Food','Wifi'
            ],
            reviews:[
                {
                    rating:4,
                    name:'Clay Jenson',
                    date:'21 Oct 2018'
                }
            ]
        }
    );
};
/* GET 'Add review' page */
module.exports.addReview = function(req, res){
res.render('add-review', { title: 'Add review' });
};