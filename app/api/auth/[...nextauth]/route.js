import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";
import { error } from "console";
//npm install next-auth
//npm install mongodb
//npm install bcrypt
//npm install @auth/mongodb-adapter

//regex pattern for password validation
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

const authOptions = {
    providers: [
        CredentialsProvider({
            id: "login",
            name: "Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                role: { label: "Role", type: "text" }
            },

            async authorize(credentials) {
                try{
                    const client = await clientPromise;
                    const db = client.db("users");
                    const collection =  db.collection("user");
                    const existingUser = await collection.findOne({ email: credentials.email });
                    

                    if (existingUser && (await compare(credentials.password, existingUser.password))) {
                        return existingUser;
                    } else {
                        throw new Error("Invalid email or password");
                    }
                } catch (error){
                    console.error("Error in signup authorize:", error);
                    throw error;
                }
            },
        }),

        CredentialsProvider({
            id: "signup",
            name: "Sign Up",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                role: { label: "Role", type: "text" }
            },
            

            async authorize(credentials) {
                try{
                    const client = await clientPromise;
                    const db = client.db("users");
                    const collection = db.collection("user");
                    const existingUser = await collection.findOne({ email: credentials.email });
                    //console.log("existing role",existingUser); 

                    //validate password against regex pattern
                    if (!passwordPattern.test(credentials.password)) {
                        throw new Error("Password does not meet the requirements. Please try again.");
                    }

                    if (existingUser) {
                        throw new Error("User already exists, please try logging in instead.");

                    } else {
                        const hashedPassword = await hash(credentials.password, 10);
                        const newUser = await collection.insertOne({ email: credentials.email, password: hashedPassword, role: credentials.role});
                        return newUser;
                    }
                } catch (error){
                    console.error("Error in signup authorize:", error);
                    throw error;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.email = user.email; // Include email
            }
            return token;
        },
        async session({session, token}) {
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.email = token.email; // Include email
            return session;
        },
    },

    adapter: MongoDBAdapter(clientPromise),
        jwt: {
            secret: process.env.NEXTAUTH_SECRET,
            maxAge: 2 * 24 * 60 * 60, // 2 days
            //maxAge: 30 * 24 * 60 * 60, // 30 days
        },
        session : {
            strategy: "jwt",
        },
        pages: {
            signIn: "/tab/login",
        },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST}