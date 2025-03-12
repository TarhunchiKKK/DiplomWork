import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../posts/entities/post.entity";
import { Token } from "../../tokens/entities/token.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public username: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column()
    public organizationId: string;

    @Column()
    public privateKey: string;

    @Column()
    public publicKey: string;

    @CreateDateColumn()
    public createdAt: Date;

    @Column({ default: false })
    public isTwoFactorEnabled: boolean;

    @Column({ default: false })
    public isDeactivated: boolean;

    @OneToOne(() => Post, post => post.user)
    @JoinColumn()
    public post: Post;

    @OneToMany(() => Token, token => token.user)
    public tokens: Token[];
}
