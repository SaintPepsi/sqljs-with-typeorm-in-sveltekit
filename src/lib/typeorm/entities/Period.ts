import { Visit } from "$lib/typeorm/entities/Visit";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export const POSSIBLE_PERIODS = ["day", "week", "month", "quarter", "year"];

@Entity(Period.table_name)
export class Period extends BaseEntity {
    public static table_name = "period" as const;
    @PrimaryGeneratedColumn({ type: "integer" })
    id!: number;

    @Column({ type: "text", unique: true })
    period!: string;

    @OneToMany(() => Visit, (visit: Visit) => visit.id)
    visits!: Visit[];
}