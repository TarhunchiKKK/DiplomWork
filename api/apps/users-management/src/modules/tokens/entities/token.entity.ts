import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TokenType } from "../enums/token-type.enum";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Token {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public token: string;

    @Column()
    public type: TokenType;

    @Column()
    public expiresAt: Date;

    @CreateDateColumn()
    public createdAt: Date;

    @ManyToOne(() => User, user => user.tokens)
    public user: User;
}
