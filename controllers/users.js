const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags=["Users"]
    const result = await mongodb.getDb().db('Contacts').collection('Contacts').find();
    result.toArray()
        .then((users) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(users);
        })
};

const getSingle = async (req, res) => {
    // #swagger.tags=["Users"]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('Contacts').collection('Contacts').find({ _id: userId });
    result.toArray()
        .then((users) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(users[0]);
        })
};

const createUser = async (req, res) => {
    // #swagger.tags=["Users"]
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDb().db('Contacts').collection('Contacts').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'an error occured with creating the user');
    }
}

const updateUser = async (req, res) => {
    // #swagger.tags=["Users"]
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDb().db('Contacts').collection('Contacts').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'an error occured with updating the user');
    }
}

const deleteUser = async (req, res) => {
    // #swagger.tags=["Users"] 
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('Contacts').collection('Contacts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'an error occured with deleting the user');
    }
}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};