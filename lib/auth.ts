import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import dbConnect from "./db";
import bcrypt from "bcrypt";
import User from "@/models/User";
export const authOptions: NextAuthOptions ={
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"email"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials) {

                if(credentials?.email || credentials?.password){
                    throw new Error("Email and password are required!");
                }

                try{
                    await dbConnect();
                    const user = await User.findOne({email:credentials?.email})
                    if(!user){
                        throw new Error("User not found!");
                    }
                    if (!credentials) {
                        throw new Error("Credentials are missing!");
                    }
                    const password = await bcrypt.compare(credentials.password, user.password);
                    if(password){
                        throw new Error("Password is incorrect!");
                    }

                    return {
                        id:user._id.toString(),
                        email:user.email
                    }
                }catch(error){
                    throw(error);
                }


            }
        }),

    ],
    callbacks:{
        async jwt({token,user}){
            if(user.id){
                token.id = user.id;
            }
            return token;
        },

        async session({session,token}){
            

            if(session.user){
                session.user.id = token.id as string;
            }
            
            return session;
        }
    },
    pages:{
        signIn: "/login",
        error: "/login",
    },
    session:{
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret:process.env.NEXT_AUTH_SECERET,

    
}

function connectDb() {
    throw new Error("Function not implemented.");
}
