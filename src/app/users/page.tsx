'use client'

import { useState, useEffect } from "react"

type User = {
    id: string
    name: string
    email: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [newNames, setNewNames] = useState<{ [key: string]: string }>({})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users')
            const data = await response.json()
            setUsers(data)
        }
        fetchUsers()
    }, [])

    const handleCreateUser = async () => {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        })

        const newUser = await response.json()

        setUsers([...users, newUser])
        setName('')
        setEmail('')
    }

    const handleNameUpdate = async (id: string) => {
        const response = await fetch(`/api/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newNames[id] })
        })

        const updatedUser = await response.json()

        setUsers(users.map((user) => user.id === id ? updatedUser : user))
    }

    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        })
        setUsers(users.filter((user) => user.id !== id))
    }

    return (
        <div>
            <h1>CREATE USER</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleCreateUser()
            }}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">
                    CREATE
                </button>
            </form>

            <h1>USERS</h1>
            
            {users.map((user) => (
                <div key={user.id}>
                    <p>{user.name}</p>
                    <input 
                        type="text" 
                        placeholder="New name"
                        value={newNames[user.id] || ''}
                        onChange={(e) => setNewNames({
                            ...newNames,
                            [user.id]: e.target.value
                        })}
                    />
                    <button onClick={() => handleNameUpdate(user.id)}>
                        SAVE
                    </button>
                    <p>{user.email}</p>
                    <button onClick={() => handleDelete(user.id)}>
                        DELETE
                    </button>
                </div>
            ))}
        </div>
    )
}

// useEffect(() => {
//     const fetchUsers = async () => {
//         const response = await fetch('api/users')
//         const data = await response.json()
//         setUsers(data)          
//     }
//     fetchUsers()
// },[])

// const handleCreate = async () => {
//     const response = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name, email })
//     })
    
//     const newUser = await response.json()
    
//     setUsers([...user, newUser])
//     setName('')
//     setEmail('')
// }

// const handleDelete = async (id: string) => {
//     await fetch('api/users',{
//         method: 'DELETE'
//     })
//     setUsers(users.filter((user) => user.id !== id))
// }

// const handleUpdate = async (id: string) => {
//     const response = await fetch('/api/users', {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//         body: JSON.stringify({ name: newNames[id] })

//         const updatedUser = await response.json()

//         setUsers(users.map((user) => user.id !== id ? updatedUser : user))
//     })
// }
