import { IOTP } from "../@types";
import { Repository, getRepository } from "typeorm";
import { OTPEntity } from "../entities";

export default class OTPService {
  private body: IOTP;
  private otpRepo: Repository<OTPEntity>;

  constructor(body: IOTP) {
    this.otpRepo = getRepository(OTPEntity);
    this.body = body;
  }
  public async createOTP(otpCode: string): Promise<IOTP> {
    const created = await this.otpRepo.create({ ...this.body, otpCode }).save();
    return created;
  }
  public async checkOTP(): Promise<IOTP> {
    const found = await this.otpRepo.findOne({ where: { otpCode: this.body.otpCode }, order: { id: "DESC" } });
    console.log(found);
    return found;
  }

  public async checkEmailUsageCount(): Promise<number> {
    const [_, count] = await this.otpRepo.findAndCount({ where: { email: this.body.email } });
    return count;
  }
  public async updateOTP({ id, ...object }: IOTP): Promise<boolean> {
    const pk: number = id;
    const { affected } = await this.otpRepo.update(pk, object);
    return !!affected;
  }
}
