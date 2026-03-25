import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

// get all users
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const page = Number(searchParams.get('page')) || 1
        const take = 10
        const users = await prisma.user.findMany({
            take,
            skip: (page - 1) * take
        })
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({ error: 'Problem getting the users from the database.' }, { status: 404 })
    }
}

// update a user
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email } = body

        if (!name || !email) {
            return NextResponse.json({ error: 'Please provide both name and email.' }, { status: 400 })
        }

        if (!email.includes('@') || !email.includes('.')) {
            return NextResponse.json({ error: 'Please enter a valid email' }, { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (existingUser) {
            return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 404 })
        }

        const user = await prisma.user.create({
            data: {
                name,
                email
            }
        })
        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Problem creating the user in the database' }, { status: 500 })
    }
}
