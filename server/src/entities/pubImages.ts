import {Entity,PrimaryGeneratedColumn,ManyToOne,Column} from 'typeorm'

@Entity()

export class pictures {
    @PrimaryGeneratedColumn('increment')
    id!:number
    @Column()
    name!:string
    
}