import {app, setup} from "../../index"
import { afterAll, describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import { getConnection} from "typeorm"

describe("persistence test modo", () => {

    afterAll(async () => {
        await getConnection().close()
    });

    beforeAll(async () => {
        await setup()
    });


    it('teste /modo/list e /modo/delete', async () => {
        var agent = supertest(app);

        const postListModo = await agent.get('/modos');
        expect(postListModo.statusCode).toEqual(200);

        if (postListModo.body.length > 0){
        for(const m of postListModo.body){
           
            const data = { "codigo" : m.codigo };
            console.log("Encontrou o modo: ");
            console.log(data);
            
            const postDeleteModo = await agent.delete('/modos').send(data);
            
            console.log("Removeu o modo: ");
            console.log(data);

            expect(postDeleteModo.statusCode).toEqual(204);
        }
        }else{
            const data = { "nome" : "modo", 
                           "quantidade_boots": 8,
                           "quantidade_rounds": 10
                         };
            const data1 = { "nome" : "modo2", 
                           "quantidade_boots": 7,
                           "quantidade_rounds": 11
                         };
            const postCreateModo = await agent.post('/modos').send(data);
            const postCreateModo2 = await agent.post('/modos').send(data1);
            
            console.log("Cadastrou o primeiro modo: ");
            console.log(postCreateModo);

            console.log("Cadastrou o segundo modo: ");
            console.log(postCreateModo2);

            expect(postCreateModo.statusCode).toEqual(200);
            expect(postCreateModo2.statusCode).toEqual(200);

        }

    });

});