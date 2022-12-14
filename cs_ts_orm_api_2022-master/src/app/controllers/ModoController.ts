import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Modo from '../models/Modo';

class ModoController {


    async list(req: Request, res: Response){

        const repository = getRepository(Modo);
        //retorna uma lista de objetos contendo os registros de tb_modo
        const lista = await repository.createQueryBuilder('tb_modo').getMany();

        return res.json(lista);
     
    }


    async store(req: Request, res: Response){

        const repository = getRepository(Modo);//recupera o repositorio do modo.

        console.log(req.body);//imprime na saida padrão a mensagem recebida. Isso é apenas para teste...

        const m = repository.create(req.body);//cria a entidade Modo.

        await repository.save(m);//efetiva a operacao de insert.

        return res.json(m);//retorna o bojeto json no response.

    }

    async update(req: Request, res: Response){
        const repository = getRepository(Modo);//recupera o repositorio do modo. inicializa
    
        const {codigo} = req.body;//extrai os atributos do corpo da mensagem.
    
        const idExists = await repository.findOne({where :{codigo}});//consulta na tabela se existe um registro com o mesmo modo da mensagem.
        
        
        if(!idExists){
                return res.sendStatus(404);
        }
        
        const j = repository.create(req.body); //cria a entidade Jogador
        
        await repository.save(j); //persiste (update) a entidade na tabela.
        
        return res.json(j);
        
    }

    async delete(req: Request, res: Response){   
        const repository = getRepository(Modo);//recupera o repositorio do modo.

        const {codigo} = req.body;//extrai os atributos do corpo da mensagem.
        
        const idExists = await repository.findOne({where :{codigo}});//consulta na tabela se existe um registro com o mesmo modo da mensagem.

        if(idExists){
        
            await repository.remove(idExists);//caso exista, então aplica a remocao fisica.
            return res.sendStatus(204);//retorna o coigo 204.
        
        }else{
        
            return res.sendStatus(404);//se nao encontrar jogador para remover, retorna o codigo 404.
        } 

    }

}

export default new ModoController();