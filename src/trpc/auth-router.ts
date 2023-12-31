import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payloads";
import { TRPCError } from "@trpc/server";
import { z } from 'zod'


export const authRouter = router({ //anyone can visit public visitor
    createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input
      const payload = await getPayloadClient()

        //check if user already exist
        const {docs : users} = await payload.find({
            collection : "users" ,
            where : {
                email : {
                    equals : email,
                },
            },
        })

        if(users.length !==0) 
         throw new TRPCError({code  : 'CONFLICT'})

        await payload.create({
            collection : "users",
            data : {
                email,
                password,
                role : 'user'
            },
        })

        return {success : true , sentToEmail : email }
    }),

    // verifyEmail : publicProcedure
    // .input(z.object())
})