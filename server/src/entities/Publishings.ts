import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,CreateDateColumn,
    UpdateDateColumn,
    JoinColumn} from 'typeorm'
import { User } from './User'


@Entity()
export class Pubs {
@PrimaryGeneratedColumn('increment')
id!:number
@Column("character varying",{array:true,nullable:true})
photos!:string[]
@Column("character varying",{array:true,nullable:true,default:[]})
likes!:number[]
@Column()
price!:string
@Column()
type!:string
@Column()
tel!:string
@Column()
place!:string
@Column()
description!:string
@Column({ name: 'user_id' })
userId!: number;
@ManyToOne(()=>User,(user)=>user.pubs)
@JoinColumn({name:"user_id"})
user!:User
@CreateDateColumn()
created_at!:Date
@UpdateDateColumn()
updated_at!:Date

}