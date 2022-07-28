import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, RelationId} from 'typeorm'
import { Conversation } from './conversation'

@Entity()

export class Message{
    @PrimaryGeneratedColumn('increment')
    id!:number
    @Column()
    sender!:string
    @Column()
    text!:string
    @ManyToOne(type=>Conversation)
    conversation!:Conversation
    @RelationId((message:Message)=>message.conversation)
    conversationId!:number
}