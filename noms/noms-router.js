const path = require('path');
const express = require('express');
const xss = require('xss');
const NomsService = require('./noms-service');

const nomsRouter = express.Router();
const jsonParser = express.json();

const serializeNom = nom => ({
    id: nom.id,
    nom_name: xss(nom.nom_name),
    sub: xss(nom.sub),
    url: xss(nom.url),
    description: xss(nom.description),
    recipe_id: nom.recipe_id,
    date_created: nom.date_created,
});

nomsRouter
    .route('/')
    .get((req, res, next) => {
        NomsService.getAllNoms(
            req.app.get('db')
        )
            .then(noms => {
                res.json(noms.map(serializeNom))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { nom_name, sub, url, description, recipe_id } = req.body;
        const newNom = { nom_name, sub, url, description, recipe_id };
        
        for (const [key, value] of Object.entries(newNom)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in the request body` }
                });
            }
        }
        
        NomsService.insertNom(
            req.app.get('db'),
            newNom
        )
            .then(nom => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${nom.id}`))
                    .json(nom)
            })
            .catch(next)
    });

nomsRouter
    .route('/:nom_id')
    .all((req, res, next) => {
        NomsService.getById(
            req.app.get('db'),
            req.params.nom_id
        )
            .then(nom => {
                if (!nom) {
                    return res.status(404).json({
                        error: { message: `Nom doesn't exist` }
                })
            }
            res.nom = nom
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeNom(res.nom));
    })
    .delete((req, res, next) => {
        NomsService.deleteNom(
            req.app.get('db'),
            req.params.nom_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { nom_name, recipe_id } = req.body;
        const nomToUpdate = { nom_name, sub, url, description, recipe_id };

        const numberOfValues = Object.values(nomToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'nom_name', 'sub', 'url', 'description', or 'recipe_id'`
                }
            })
        }

        NomsService.updateNom(
            req.app.get('db'),
            req.params.nom_id,
            nomToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = nomsRouter;