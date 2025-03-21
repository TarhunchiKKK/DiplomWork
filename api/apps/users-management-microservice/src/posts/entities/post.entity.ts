import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public divisionId: string;

    @Column()
    public postId: string;

    @OneToOne(() => User, user => user.post)
    public user: User;
}
