const Express = require('express');
const router = Express.Router();
const validateSession = require('../middleware/validate-session');
const { LogModel } = require('../models');

router.get('/practice', (req, res)=>{
    res.send('Testing testing 123')
});

//post new log (req authorization)
router.post('/create', validateSession, async(req, res) =>{
    const { description, definition, result } = req.body;
    const { id } = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ msg: `Oh no! Server error: ${err}`})
    }
});

//find all logs from given user (requires "id": body entry; could be done with username but would require field in log that was not specified)
router.get('/', async(req, res)=>{
    try{
        const { id } = req.body;
        const allLogs = await LogModel.findAll({
            where: {owner_id: id}
        });
        res.status(200).json(allLogs)
    } catch (err) {
        res.status(500).json({ error: err})
    }
})

//find specific log from specific user (log id goes in address, owner id goes in body)
router.get('/:id', async(req,res)=>{
    try {
        const { ownerId } = req.body;
        const { id } = req.params;
        const specificLog = await LogModel.findOne({
            where: {owner_id: ownerId, id: id}
        });
        res.status(200).json(specificLog)
        
    } catch (err) {
        res.status(500).json({ error: err})
    }
})

// update individual logs (doesn't require user to be the same, i.e. any user can update anyones logs)
router.put('/:id', validateSession, async(req, res)=>{
    const { description, definition, result } = req.body;
    // const logId = req.params.entryId;
    // const ownerId = req.user.id;

    try {
        const updatedLog = await LogModel.update({ description, definition, result}, {where: {id: req.params.id}});
        res.status(200).json({
            msg: `log updated!`,
            updatedLog
        });
    } catch (err) {
        res.status(500).json({error: err})
    }
});

//delete log
router.delete('/:id', validateSession, async(req, res)=>{
    try{
        const locatedLog = await LogModel.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({
            message: 'Log successfully deleted',
            deletedLog: locatedLog
            })
    } catch(err) {
        res.status(500).json({
            message: `Failed to delete log: ${err}`
        })
    }
})

module.exports = router;