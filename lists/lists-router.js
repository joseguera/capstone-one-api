const path = require('path');
const express = require('express');
const xss = require('xss');
const ListsService = require('./lists-service');
const { json } = require('express');

const listsRouter = express.Router();
const jsonParser = express.json();

const serializeList = list => ({
    id: list.id,
    list_name: xss(list.list_name),
    description: xss(list.description),
    date_published: list.date_published,
    nom: list.nom,
    author: list.author
});

listsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        ListsService.getAllLists(knexInstance)
            .then(lists => {
                res.json(lists.map(serializeList))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { list_name, description, nom, author, date_published } = req.body;
        const newList = { list_name, description, nom, author };

        for (const [key, value] of Object.entries(newList))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
        
        newList.date_published = date_published;

        ListsService.insertList(
            req.app.get('db'),
            newList
        )
            .then(list => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${list.id}`))
                    .json(serializeList(list))

            })
            .catch(next)
    });

listsRouter
    .route('/:list_id')
    .all((req, res, next) => {
        ListsService.getById(
            req.app.get('db'),
            req.params.list_id
        )
            .then(list => {
                if (!list) {
                    return res.status(404).json({
                        error: { message: `Comment doesn't exist` }
                    })
                }
                res.list = list;
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeList(res.list))
    })
    .delete((req, res, next) => {
        ListsService.deleteList(
            req.app.get('db'),
            req.params.list_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { list_name, description, nom, author } = req.body;
        const listToUpdate = { list_name, description, nom, author };

        const numberOfValues = Object.values(listToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'list_name', 'description', 'nom', 'author'`
                }
            })
        
        ListsService.updateList(
            req.app.get('db'),
            req.params.list_id,
            listToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    });

    module.exports = listsRouter;