require('dotenv').config();
let mongoose = require('mongoose'); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  favoriteFoods: [String]
})

let Person = new mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  let person = new Person({
    name: "TestPerson",
    age: 25,
    favoriteFoods: ["Pizzs", "Schnitzel"],
    leastFavoriteFoods: ["Salami"]
  });
  person.save()
    .then(result => done(null, result))
    .catch(error => done(error));

};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
    .then(result => done(null, result))
    .catch(error => done(error));
};


const findPeopleByName = (personName, done) => {
  console.log(personName + " " + done);
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound)
  })
/*    .then(result => {
      console.log(result);
      done(null, result)
    })
    .catch(error => {
      console.log(error);
      done(error);
    });*/
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: [food]}, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, personFound) {
    if (err) return console.log(err);
    personFound.favoriteFoods.push(foodToAdd);
    personFound.save(function(err, result) {
      if (err) return console.log(err);
        done(null, result);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, personUpdated) {
    if (err) return console.log(err);
    done(null, personUpdated);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, personRemoved) {
    if (err) return console.log(err);
    done(null, personRemoved);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, result) {
    if (err) return console.log(err);
    done(null, result);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age:0})
    .exec(function(err, result) {
      if (err) return console.log(err);
      done(null, result);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
