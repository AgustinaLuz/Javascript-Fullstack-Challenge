const express = require('express');
const operationController = require('../controllers/operationsController');

function routes(Operation) {
    const operationRouter = express.Router();
    const controller = operationController(Operation);
    operationRouter.route('/operations')
        .post(controller.post)
        .get(controller.get);
        operationRouter.use('/operations/:operationId', (req, res, next) => {
        Operation.findById(req.params.operationId, (err, operation) => {
            if (err) {
                return res.send(err);
            }
            if (operation) {
                req.operation = operation;
                return next();
            }
            return res.sendStatus(404);
        });
    });
    operationRouter.route('/operations/:operationId')
        .get((req, res) => {
            const returnOperation = req.operation.toJSON();
            returnOperation.links = {};
            const type = req.operation.type;
            returnOperation.links.FilterByThisType = `http://${req.headers.host}/api/operations/?type=${type}`;
            res.json(returnOperation)
        })
        .put((req, res) => {
            const { operation } = req;
            operation.concept = req.body.concept;
            operation.amount = req.body.amount;
            operation.date = req.body.date;
            operation.category = req.body.category;
            req.operation.save((err) => {
                if (err) {
                    return res.send(err);
                }
                res.json(operation);
            });
        })
        .patch((req, res) => {
            const { operation } = req;

            if (req.body._id) {
                delete req.body._id;
            }
            Object.entries(req.body).forEach((item) => {
                const key = item[0];
                const value = item[1];
                operation[key] = value;
            });
            req.operation.save((err) => {
                if (err) {
                    return res.send(err);
                }
                res.json(operation);
            });
        })
        .delete((req, res) => {
            req.operation.remove((err) => {
                return res.send(err);
            });
            return res.sendStatus(204);
        });

    return operationRouter;
}

module.exports = routes;