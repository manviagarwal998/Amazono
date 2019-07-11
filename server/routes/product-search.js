const router = require('express').Router();
const algoliasearch = require('algoliasearch');

const client = algoliasearch('V58979NTX5' , 'af783558df04c6fd81b463f8e18ab430');
const index = client.initIndex('amazonov1');

router.get('/', (req, res, next) => {
    if(req.query.query){
        index.search({
            query: req.query.query,
            page: req.query.page,
        }, (err, content) => {
            res.json({
                success: true,
                message: "Here is your Search",
                status: 200,
                content: content,
                search_result: req.query.query
            });
        });
    }
});

module.exports = router;