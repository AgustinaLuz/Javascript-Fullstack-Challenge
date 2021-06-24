function operationsController(Operation) {
    function post(req, res) {
        const operation = new Operation(req.body);
        if (!req.body.type) {
            res.status(400);
            return res.send('Type is required');
        }
        operation.save();
        res.status(201);
        return res.json(operation);
    }

    function get(req, res) {
        const query = {};
        if (req.query.type) {
            query.type = req.query.type;
        }
        Operation.find(query, (err, operations) => {
            if (err) {
                return res.send(err);
            }
            const returnOperations = operations.map((operation) => {
                const newOperation = operation.toJSON();
                newOperation.links = {};
                newOperation.links.self = `http://${req.headers.host}/api/operations/${operation._id}`;
                return newOperation;
            });
            return res.json(returnOperations);
        });
    }

    return { post, get };
}

module.exports = operationsController;