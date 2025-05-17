import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "../../workflows/entities/workflow.entity";
import { ApprovalStatus } from "../enums/approval.-status.enum";

@Entity()
export class WorkflowParticipant {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public userId: string;

    @Column({ type: "enum", enum: ApprovalStatus, default: ApprovalStatus.DEFAULT })
    public approvalStatus: ApprovalStatus;

    @ManyToOne(() => Workflow, workflow => workflow.participants)
    @JoinColumn()
    public workflow: Workflow;
}
