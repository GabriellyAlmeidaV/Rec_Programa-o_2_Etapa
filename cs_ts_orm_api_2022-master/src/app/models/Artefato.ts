import {Entity, Column, PrimaryGeneratedColumn, TableInheritance} from 'typeorm';
@Entity('tb_artefato')
@TableInheritance({ column: { type: "varchar", name: "type" } })
abstract class Artefato {

    @PrimaryGeneratedColumn()//geracao automatica de chave primaria
    id: number;



}
export default Artefato;