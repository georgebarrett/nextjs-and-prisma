import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


// get user by id
export async function GET(  { params }: {params: {id: string}}) {
    try{
        const { id } = params

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }    
        })

        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Could not retrieve user from the database' }, { status: 500 })
    }
}

// update user
export async function PATCH(req: Request, { params }: { params: { id: string }}) {
    try {
        const body = await req.json()
        const { name, email } = body
        const { id } = await params

        if (!name && !email) {
            return NextResponse.json({ error: 'Please provide at least one field to update' }, { status: 400 })
        }

        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name,
                email       
            }
        })

        return NextResponse.json(user, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: 'Could not update user.' }, { status: 500 })
    }
}

// delete user
export async function DELETE(req: Request, { params }: { params: { id: string }}) {    
    try {
        const { id } = await params
        const user = await prisma.user.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'User could not be deleted' }, { status: 500 })
    }
}
