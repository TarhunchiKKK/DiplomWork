import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { TokenType } from "../enums/token-type.enum";

@Entity()
export class Token {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public token: string;

    @Column({ type: "enum", enum: TokenType })
    public type: TokenType;

    @Column()
    public expiresAt: Date;

    @CreateDateColumn()
    public createdAt: Date;

    @ManyToOne(() => User, user => user.tokens)
    public user: User;
}
