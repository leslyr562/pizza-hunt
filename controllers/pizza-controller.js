const { Pizza } = require('../models');

const pizzaController = {
  // the functions will go in here as methods


// get all pizzas
getAllPizza(req, res) {
  Pizza.find({})
  .populate({
    //To populate a field, just chain the .populate() method onto your query, passing in an object with the key path plus the value of the field you want populated.
    path: 'comments',
    //The minus sign - in front of the field indicates that we don't want it
    select: '-__v'
  })
  .select('-__v')
  //to sort in DESC order by the _id value.
  .sort({ _id: -1 })
  .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one pizza by id
  // get one pizza by id
getPizzaById({ params }, res) {
  Pizza.findOne({ _id: params.id })
    .populate({
      path: 'comments',
      select: '-__v'
    })
    .select('-__v')
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
},
  // createPizza POST
createPizza({ body }, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
  },

// update pizza by id PUT
updatePizza({ params, body }, res) {
    //By setting the parameter to true, we're instructing Mongoose to return the new version of the document.
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },

// delete pizza
deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }

};

module.exports = pizzaController;