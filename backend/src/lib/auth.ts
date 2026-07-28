import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import 'dotenv/config';
import { PrismaClient } from '../../generated/prisma/client'; 
import { PrismaPg } from '@prisma/adapter-pg';
	

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});


const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
	
  database: prismaAdapter(prisma, {
      provider: "postgresql"
  }),

	emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 3600,
    revokeSessionsOnPasswordReset: true,
    minPasswordLength: 8,
    
  },
	
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: false,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60, //1 hr
    

    
  },
	
  socialProviders: {
    google: {
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }
  },
	
	
	
});
