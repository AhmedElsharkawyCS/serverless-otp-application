import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import configs from "../config";

@Entity({ name: "otps" })
export class OTPEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ length: configs.OTP_CODE_LENGTH, unique: false })
  otpCode: string;

  @Column({ default: false, type: "bool" })
  isUsed: boolean;

  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
