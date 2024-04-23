import { prisma } from "@shared/infra/database";
import {addSeconds, getTime, } from 'date-fns'

export class GenerateRefreshToken {
    async execute(userId: string) {
      const now = new Date();
      const futureTime = addSeconds(now, 5);
      const expiresIn = getTime(futureTime) / 1000; // dividido por 1000 para obter o timestamp UNIX

      const generateRefreshToken = await prisma.refreshToken.create({
        data : {
          userId,
          expiresIn,
        }
      });

      return generateRefreshToken;
    }
}