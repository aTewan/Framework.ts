import * as express from 'express'
import * as mongoose from 'mongoose'

module.exports = (Objet: mongoose.Model<mongoose.Document, {}>) => {

    const create:any = (req: express.Request,res: express.Response):void  => {
        const nouvelleEntree: any = req.body;
        Objet.create(nouvelleEntree, (e:any,nouvelleEntree: any) => {
            if(e) {
                console.log(e);
                res.sendStatus(500);
            }
            else {
                console.log(`Vous avez ajouté : ${nouvelleEntree}`)
                res.send(nouvelleEntree);
            }
        });
    }

    const readId:any = (req: express.Request, res: express.Response): void => {
        const id:number = req.params.id;

        Objet.findById(id, (e:any,retour:any) => {
            if(e) {
                console.log(e);
                res.sendStatus(500);
            }
            else {
                console.log(retour)
                res.send(retour);
            }
        })
    }

    let router: express.Router = express.Router();

    router.post('/', create);
    router.get('/:id', readId);

    return router
}


