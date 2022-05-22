import {Entity,PrimaryGeneratedColumn,ManyToOne, Column} from 'typeorm'
import { User } from './user'

@Entity()

export class Publishings{
    @PrimaryGeneratedColumn('increment')
    id!:number
    @Column()
    price!:string
    @Column()
    gouvernorat!:string
    @Column()
    ville!:string
    @Column()
    photos!:string[]
    
    @ManyToOne(()=>User,(user)=>user.pubs)

    user!:User
    
}