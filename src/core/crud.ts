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

  // =========
  // Read All
  // =========
  const readAll:any = (req: express.Request,res: express.Response):void  => {   
    Objet.find((e:any,retour:any) => {
        if(e) {
            console.log(e);
            res.sendStatus(500);
        }
        else {
            console.log(retour)
            res.send(retour);
        }
    })
  };

  // ========
  // Read Id
  // ========
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
  
  // ======
  // Update
  // ======
  const update:any = (req: express.Request, res: express.Response): void =>  {

    const id:number = req.params.id;
    const entreeModifiee = req.body;

    Objet.update(id, entreeModifiee, (e:any) => {
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
  
  // ======
  // Remove
  // ======
  const remove:any = (req: express.Request, res: express.Response): void => {

    const id:number = req.params.id;

    Objet.remove(id, (e:any) => {
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

  // ======
  // Routes
  // ======
  let router: express.Router = express.Router();

  router.post('/', create);
  router.get('/', readAll);
  router.get('/:_id', readId);
  router.put('/:_id', update);
  router.delete('/:_id', remove);

  return router;
}
