import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkflowStatus } from "../enums/workflow-status.enum";
import { WorkflowParticipant } from "../../participants/entities/workflow-participant.entity";

@Entity()
export class Workflow {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ type: "enum", enum: WorkflowStatus, default: WorkflowStatus.DEFAULT })
    public status: WorkflowStatus;

    @Column()
    public creatorId: string;

    @Column({ nullable: true, default: null })
    public signerId: string;

    @Column()
    public documentId: string;

    @Column()
    public documentTitle: string;

    @Column({ nullable: true, default: null })
    public completedAt?: Date;

    @CreateDateColumn()
    public createdAt: Date;

    @OneToMany(() => WorkflowParticipant, participant => participant.workflow)
    public participants: WorkflowParticipant[];
}
