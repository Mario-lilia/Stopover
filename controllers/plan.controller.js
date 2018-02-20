const Plan = require('../models/plan.model');
const mongoose = require('mongoose');

module.exports.index = (req, res, next) => {
  console.log(req.user._id);
  //ID CREATOR
  Plan.find({createdBy:req.user._id})
    .then((plans) => {
      console.log(plans);
      res.render('plans/index', {
        plans:plans
      });
    })
    .catch(error => next(error));
};
module.exports.create = (req, res, next) => {
  res.render('plans/new', {
    plan: new Plan()
  });
};
module.exports.doCreate = (req, res, next) => {
  const plan = new Plan(req.body);
  plan.createdBy=req.user._id;
  (plan.weather === "sunny") ? plan.weather = true: false;
  if (!req.body.title || !req.body.description || !req.body.imgUrl || !req.body.price || !req.body.days || !req.body.startTime || !req.body.endTime || !req.body.latPosition || !req.body.lngPosition) {
    const title = req.body.title ? '' : 'Title is required';
    const description = req.body.description ? '' : 'description is required';
    const imgUrl = req.body.imgUrl ? '' : 'imgUrl is required';
    const price = req.body.price ? '' : 'Price is required';
    const days = req.body.days ? '' : 'Days is required';
    const startTime = req.body.startTime ? '' : 'Start time is required';
    const endTime = req.body.endTime ? '' : 'End Time is required';
    const latPosition = req.body.latPosition ? '' : 'Latitude position is required';
    const lngPosition = req.body.lngPosition ? '' : 'Longitude position is required';
    res.render('plans/new', {
      error: {
        title,
        description,
        imgUrl,
        price,
        days,
        startTime,
        endTime,
        latPosition,
        lngPosition
      },
      plan: plan
    });
  } else {
    plan.startTime = Number(req.body.startTime.substring(0, req.body.startTime.indexOf(':')));
    plan.endTime = Number(req.body.endTime.substring(0, req.body.endTime.indexOf(':')));

    plan.latPosition=Number(req.body.latPosition);
    plan.lngPosition=Number(req.body.lngPosition);
    console.log(plan.endTime);
    console.log(plan.startTime);
    console.log(plan);
    
    
    plan.save()
      .then(() => {
        res.redirect('/plans');
      }).catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render('plans/new', {
            plan: plan,
            error: error.errors
          });
        } else {
          next(error);
        }
      })
      .catch(error => next(error));
  }

};

module.exports.update = (req, res, next) => {
  const id = req.params.id;
  Plan.findById(id)
    .then((plan) => {
      res.render('plans/new', {
        plan
      });
    })
    .catch(error => next(error));
};


module.exports.doUpdate = (req, res, next) => {
  const plan = new Plan(req.body);
  const id = req.params.id;
  plan._id = id;
  // plan.createdBy=req.user._id;
  (plan.weather === "sunny") ? plan.weather = true: false;

  if (!req.body.description || !req.body.imgUrl || !req.body.price || !req.body.days || !req.body.startTime || !req.body.endTime || !req.body.latPosition || !req.body.lngPosition) {
    const description = req.body.description ? '' : 'description is required';
    const imgUrl = req.body.imgUrl ? '' : 'imgUrl is required';
    const price = req.body.price ? '' : 'Price is required';
    const days = req.body.days ? '' : 'Days is required';
    const startTime = req.body.startTime ? '' : 'Start time is required';
    const endTime = req.body.endTime ? '' : 'End Time is required';
    const latPosition = req.body.latPosition ? '' : 'Start position is required';
    const lngPosition = req.body.lngPosition ? '' : 'End position is required';
    Plan.findById(id)
      .then((planB) => {
        console.log("AAAAAAAAAAAA");
        console.log("AAAAAAAAAAAA");
        console.log("AAAAAAAAAAAA");
        console.log("AAAAAAAAAAAA");
        console.log("AAAAAAAAAAAA");
        
        res.render('plans/new', {
          error: {
            description,
            imgUrl,
            price,
            days,
            startTime,
            endTime,
            latPosition,
            lngPosition
          },
          plan: planB
        });
      })
      .catch(error => next(error));
  } else {
    // plan.latPosition=Number(req.body.latPosition);
    // plan.lngPosition=Number(req.body.lngPosition);

    plan.startTime = Number(req.body.startTime.substring(0, req.body.startTime.indexOf(':')));
    plan.endTime = Number(req.body.endTime.substring(0, req.body.endTime.indexOf(':')));
    Plan.findByIdAndUpdate(id, plan)
      .then(plan => {
        res.redirect('/plans');
      })
      .catch(error => next(error));
  }
};

module.exports.search = (req, res, next) => {
res.render('plans/search')

}


module.exports.doSearch = (req, res, next) => {
  const {
      arriveHour,
      leftHour
  } = req.body;

  arriveHourDate = new Date(arriveHour);
  leftHourDate = new Date(leftHour);
  const diffDays = (leftHourDate.getTime() - arriveHourDate.getTime()) / (24 * 60 * 60 * 1000);
  let horaLlegada = arriveHourDate.getHours();
  let horaSalida = leftHourDate.getHours();
  // console.log("diffDays = " + diffDays);
  // console.log("horaLlegada = " + horaLlegada);
  // console.log("horaSalida = " + horaSalida);
  // console.log("arriveHourDate.getUTCDay() = " + arriveHourDate.getUTCDay());
  if ((diffDays >= 0) && (diffDays <= 1)) {
      if (horaLlegada < horaSalida) {
          //Same day
          let dayOfWeek = getNameDayOfTheWeek(arriveHourDate.getUTCDay());
          console.log(dayOfWeek);
          Plan.find({
                  $and: [{
                      days: {
                          $in: [dayOfWeek]
                      }
                  },{
                      startTime:{
                          $gte:horaLlegada,$lte:horaSalida
                      }
                  },{
                      endTime:{
                          $gte:horaLlegada,$lte:horaSalida
                      }
                  }]
              })
              .$where('this.startTime < this.endTime')
              .then((plans) => {
                  console.log(plans);   
                                   
                  res.json({
                      plans: plans
                  });
              });

      } 
  } else{
      res.json({error:"The stop over has to be the same day."});

  }
};

function getNameDayOfTheWeek(numberDay) {
  if (numberDay === 0) {
      return "Sunday";
  }
  if (numberDay === 1) {
      return "Monday";
  }
  if (numberDay === 2) {
      return "Tuesday";
  }
  if (numberDay === 3) {
      return "Wednesday";
  }
  if (numberDay === 4) {
      return "Thursday";
  }
  if (numberDay === 5) {
      return "Friday";
  }
  if (numberDay === 6) {
      return "Saturday";
  }
}