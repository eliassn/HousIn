import {Entity,PrimaryGeneratedColumn,Column,OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm'
import { Pubs } from './Publishings'



@Entity()
export class User{
    @PrimaryGeneratedColumn("increment")
    uid!:number
    @Column()
    firstName!:string
    @Column()
    lastName!:string
    @Column()
    phone!:string
    @Column()
    email!:string
    @Column()
    password!:string
    @Column()
    job!:string
    @Column("boolean",{default:false})
    isCompany!:boolean
    // @Column({array:true})
    // pubs!:string
    @OneToMany(()=>Pubs,(pubs)=>pubs.user,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    pubs!:Pubs[]
    @CreateDateColumn()
    created_at!:Date
    @UpdateDateColumn()
    updated_at!:Date
}