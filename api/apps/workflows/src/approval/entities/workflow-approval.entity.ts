import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { ApprovalStatus } from "../enums/approval.-status.enum";
import { WorkflowParticipant } from "../../participants/entities/workflow-participant.entity";
import { Workflow } from "../../workflows/entities/workflow.entity";

@Entity()
export class Approval {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ type: "enum", enum: ApprovalStatus, default: ApprovalStatus.DEFAULT })
    public status: ApprovalStatus;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @OneToOne(() => WorkflowParticipant, participant => participant.approval)
    public participant: WorkflowParticipant;

    @ManyToOne(() => Workflow, workflow => workflow.approvals, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    public workflow: Workflow;
}
