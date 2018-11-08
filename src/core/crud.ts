import * as express from 'express'
import * as mongoose from 'mongoose'

module.exports = (_object: mongoose.Model<mongoose.Document, {}>) => {

/**
 * Generate CREATE route for any object
 * @param req 
 * @param res 
 */
const create:any = (req: express.Request,res: express.Response):void  => {
    const newObject : any = req.body;
    _object.create(newObject, (e:any,newObject: any) => {
        if(e) {
            console.log(e);
            res.sendStatus(500);
        }
        else {
            console.log(`You just add : ${newObject}`)
            res.send(newObject);
        }
    });
}

/**
 * Generate GET ALL route for any object
 * @param req 
 * @param res 
 */
const readAll:any = (req: express.Request,res: express.Response):void  => {   
    _object.find((e:any,result:any) => {
        if(e) {
            console.log(e);
            res.sendStatus(500);
        }
        else {
            console.log(result)
            res.send(result);
        }
    })
};

/**
 * Generate GET BY ID route for any object
 * @param req 
 * @param res 
 */
const readId:any = (req: express.Request, res: express.Response): void => {
    const id:number = req.params._id;

    _object.findById(id, (e:any,result:any) => {
        if(e) {
            console.log(e);
            res.sendStatus(500);
        }
        else {
            console.log(result)
            res.send(result);
        }
    })
}

/**
 * Generate UPDATE BY ID route for any object
 * @param req 
 * @param res 
 */
const update:any = (req: express.Request, res: express.Response): void =>  {
    const entreeModifiee = req.body;
    _object.update({ _id: req.params._id }, {$set: entreeModifiee}, (e:any) => {
        if(e) {
            console.log(e);
            res.sendStatus(500);
        }
        else {
            console.log(`Vous avez modifié : ${entreeModifiee}`)
            res.send(entreeModifiee);
        }
    })
};

/**
 * Generate DELETE BY ID route for any object
 * @param req 
 * @param res 
 */
const remove:any = (req: express.Request, res: express.Response): void => {
    const id:number = req.params._id;
    _object.remove({ _id: req.params._id }, (e:any) => {
        if(e) {
            console.log(e);
            res.sendStatus(500);
        }
        else {
            console.log('Objet vient d\'être supprimé')
            res.sendStatus(200);
        }
    })
};

let router: express.Router = express.Router();

router.post('/', create);
router.get('/', readAll);
router.get('/:_id', readId);
router.put('/:_id', update);
router.delete('/:_id', remove);

return router;
}
