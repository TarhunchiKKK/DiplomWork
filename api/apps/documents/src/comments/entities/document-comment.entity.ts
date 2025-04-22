import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocumentVersion } from "../../versions/entities/document-version.entity";
import { CommentStatus } from "../enums/comment-status.enum";

@Entity()
export class DocumentComment {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public message: string;

    @Column()
    public creatorId: string;

    @Column({ type: "enum", enum: CommentStatus, default: CommentStatus.ACTIVE })
    public status: CommentStatus;

    @CreateDateColumn()
    public createdAt: Date;

    @ManyToOne(() => DocumentVersion, version => version.comments)
    @JoinColumn()
    public version: DocumentVersion;
}
