import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "../../workflows/entities/workflow.entity";
import { Approval } from "../../approval/entities/workflow-approval.entity";

@Entity()
export class WorkflowParticipant {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public userId: string;

    @ManyToOne(() => Workflow, workflow => workflow.participants)
    @JoinColumn()
    public workflow: Workflow;

    @OneToOne(() => Approval, approval => approval.participant)
    public approval: Approval;
}
