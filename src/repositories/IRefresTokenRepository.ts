import { RefreshToken } from "@prisma/client"
import { IBaseRepository } from "./IBaseRepository"


export interface IResponseRefreshToken extends IBaseRepository<RefreshToken>{
  delete(userId: string) : Promise<void> 
}