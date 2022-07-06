import {Column,Entity,PrimaryGeneratedColumn} from 'typeorm'

@Entity()

export class Conversation  {
    @PrimaryGeneratedColumn('increment')
    id!:number

}