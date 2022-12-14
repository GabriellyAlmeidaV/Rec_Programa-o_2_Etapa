import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';


@Entity('tb_modo')
export default class Modo {

    @PrimaryGeneratedColumn()
    codigo: number;

    @Column('text')
    nome: string;
    
    //coluna opcional, caso nao seja informado data, vai recebere a data corrente.
    @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
    data_criacao: Date;

    @Column('int')
    quantidade_boots: number;

    @Column('int')
    quantidade_rounds: number;

}