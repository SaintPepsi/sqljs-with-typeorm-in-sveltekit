import { Period } from "$lib/typeorm/entities/Period";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
export const POSSIBLE_PERIODS = ["day", "week", "month", "quarter", "year"];

@Entity(Visit.table_name)
export class Visit extends BaseEntity {
    public static table_name = "visit" as const;
    @PrimaryGeneratedColumn({ type: "integer" })
    id!: number;

    @Column({ type: "int" })
    amount!: number;

    @ManyToOne(() => Period, (period: Period) => period.id)
    period!: Period;
}