const express = require('express');
const NomsService = require('./noms-service');

const nomsRouter = express.Router();
const jsonParser = express.json();

nomsRouter
    .route('/')
    .get((req, res, next) => {
        NomsService.getAllNoms(
            req.app.get('db')
        )
            .then(noms => {
                res.json(noms)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { nom_name, sub } = req.body;
        const newNom = { nom_name, sub };
        NomsService.insertNom(
            req.app.get('db'),
            newNom
        )
            .then(nom => {
                res
                    .status(201)
                    .location(`/noms/${nom.id}`)
                    .json(nom)
            })
            .catch(next)
    });

nomsRouter
    .route('/:nom_id')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        NomsService.getById(knexInstance, req.params.nom_id)
            .then(nom => {
                if (!nom) {return res.status(404).json({
                    error: { message: `Nom doesn't exist` }
                })
            }
            res.json(nom)
        })
        .catch(next)
    })

module.exports = nomsRouter;