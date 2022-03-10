const Articles = require('../models/articles');

exports.getAll = async (req, res) => {
    //calls the model
    try {
        const [allArticles] = await Articles.getAll();
        res.status(200).json(allArticles);
    } catch (error) {
        console.log(error);
    }
}

exports.create = async (req, res) => {
    if (!req.body.title || !req.body.body) {
        res.status(400).json('incomplete request');
    } else {
        try {
            const response = await Articles.create(req.body);
            res.status(201).json(response);
        } catch (error) {
            console.log(error);
        }
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    try {
        const [data] = await Articles.getById(id);
        if (data.length < 1) {
            res.status(400).json([{ "error": "Nothing Found" }])
        } else {
            res.json(data);
        }
    } catch (error) {
        console.log(error);
    }
}

exports.updateById = async (req, res) => {
    const id = req.params.id;
    let userInput = req.body;
    try {
        var [currentData] = await Articles.getById(id);
    } catch (error) {
        console.log(error)
    }
    content = {
        body: userInput.body || currentData[0].body,
        title: userInput.title || currentData[0].title
    }
    try {
        const response = await Articles.update(id, content);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Articles.delete(id);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}