import {Column,Entity,PrimaryGeneratedColumn,ManyToOne,RelationId, OneToMany} from 'typeorm'
import { Message } from './message'

@Entity()

export class Conversation  {
    @PrimaryGeneratedColumn('increment')
    id!:number
    @Column("int",{array:true,nullable:true,default:[]})
    members!:number[]
    @OneToMany(()=>Message,(message)=>message.conversation)
    messages!:Message[]
    
    
    
}