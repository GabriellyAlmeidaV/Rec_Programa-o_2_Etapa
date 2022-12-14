import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';



@Entity('tb_local')
export default class Local {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nome: string;

    @Column('text')
    latitude: string;

    @Column('text')
    logitude: string;


}