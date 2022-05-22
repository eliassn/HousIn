
import {Entity,PrimaryGeneratedColumn,Column,OneToMany,JoinTable} from 'typeorm'
import { Publishings } from './publishings'

@Entity()

export class User{
@PrimaryGeneratedColumn('increment')
id!:number
@Column()
name!:string
@Column()
phone!:string
@Column()
password!:string
@Column()
gender!:string
@Column('string',{default:''})
picture!:string
@Column('boolean',{default:false})
isCompany!:boolean
@OneToMany(()=>Publishings,(pub)=>pub.user)
pubs!:Publishings[]

}