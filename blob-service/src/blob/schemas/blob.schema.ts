import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class BlobSchema{
    @PrimaryGeneratedColumn('increment')
    id : number

    @Column({type:'text'})
    token : string

    @Column({type:'text'})
    base64 : string

    @Column({type:'varchar' , length:100})
    status : string
};
