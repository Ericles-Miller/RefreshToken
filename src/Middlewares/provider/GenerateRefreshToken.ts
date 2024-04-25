import { prisma } from "@shared/infra/database";
import {addMinutes, getTime, } from 'date-fns'

export class GenerateRefreshToken {
  async execute(userId: string) {
    const now = new Date();
    const futureTime = addMinutes(now, 5);
    const expiresIn = getTime(futureTime) / 1000; 

    const generateRefreshToken = await prisma.refreshToken.create({
      data : {
        userId,
        expiresIn,
      }
    });

    return generateRefreshToken;
  }
}