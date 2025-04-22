import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocumentVersion } from "../../versions/entities/document-version.entity";

@Entity()
export class DocumentComment {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public message: string;

    @Column()
    public creatorId: string;

    @CreateDateColumn()
    public createdAt: Date;

    @ManyToOne(() => DocumentVersion, version => version.comments)
    @JoinColumn()
    public version: DocumentVersion;
}
