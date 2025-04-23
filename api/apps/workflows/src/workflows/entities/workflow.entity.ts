import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkflowStatus } from "../enums/workflow-status.enum";
import { WorkflowParticipant } from "../../participants/entities/workflow-participant.entity";

@Entity()
export class Workflow {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ type: "enum", enum: WorkflowStatus, default: WorkflowStatus.CREATED })
    public status: WorkflowStatus;

    @Column()
    public creatorId: string;

    @Column()
    public documentId: string;

    @Column({ nullable: true, default: null })
    public completedAt?: Date;

    @CreateDateColumn()
    public createdAt: Date;

    @ManyToMany(() => WorkflowParticipant, participant => participant.workflows)
    @JoinTable()
    public participants: WorkflowParticipant[];
}
