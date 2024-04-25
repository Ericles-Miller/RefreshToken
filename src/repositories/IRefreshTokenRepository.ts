import { RefreshTokens } from "@prisma/client"
import { IBaseRepository } from "./IBaseRepository"
import { RefreshToken } from "@entities/RefreshToken"


export interface IRefreshTokenRepository extends IBaseRepository<RefreshTokens>{
  delete(userId: string) : Promise<void> 
}