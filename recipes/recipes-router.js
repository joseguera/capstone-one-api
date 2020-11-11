const path = require('path');
const express = require('express');
const xss = require('xss');
const RecipesService = require('./recipes-service');

const recipesRouter = express.Router();
const jsonParser = express.json();

const serializeRecipe = recipe => ({
    id: recipe.id,
    recipe_name: recipe.recipe_name,
    description: recipe.description,
    date_published: recipe.date_published,
    author: recipe.author,
    updated_on: recipe.date_published,
});

recipesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        RecipesService.getAllRecipes(knexInstance)
            .then(recipes => {
                res.json(recipes.map(serializeRecipe))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { recipe_name, description, author, date_published } = req.body;
        const newRecipe = { recipe_name, description, author };

        for (const [key, value] of Object.entries(newRecipe))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
        
        newRecipe.date_published = date_published;

        RecipesService.insertRecipe(
            req.app.get('db'),
            newRecipe
        )
            .then(recipe => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${recipe.id}`))
                    .json(serializeRecipe(recipe))
            })
            .catch(next)
    });

recipesRouter
    .route('/:recipe_id')
    .all((req, res, next) => {
        RecipesService.getById(
            req.app.get('db'),
            req.params.recipe_id
        )
            .then(recipe => {
                if (!recipe) {
                    return res.status(404).json({
                        error: { message: `Recipe doesn't exist` }
                    })
                }
                res.recipe = recipe;
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeRecipe(res.recipe))
    })
    .delete((req, res, next) => {
        RecipesService.deleteRecipe(
            req.app.get('db'),
            req.params.recipe_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { recipe_name, description } = req.body;
        const recipeToUpdate = { recipe_name, description };

        const numberOfValues = Object.values(recipeToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'recipe_name' or 'description'`
                }
            })
        
        RecipesService.updateRecipe(
            req.app.get('db'),
            req.params.recipe_id,
            recipeToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    });

    module.exports = recipesRouter;