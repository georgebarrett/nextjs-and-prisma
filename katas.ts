const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true }
]

// .filter returns all the records that match the condition
export default function filterActiveUsers(users: {name: string; active: boolean}[]) {
    const activeUsers = users.filter((users) => {
        return users.active === true
    })

    return activeUsers
}

// .map reshapes the result
function getActiveUserNames(users: {name: string; active: boolean}[]) {
    const activeUsers = users.filter((users) => {
        return users.active === true
    })

    const activeUserNames = activeUsers.map(user => user.name)

    return activeUserNames
}

// .filter naturally removes the false objects
function countActiveUsers(users: {name: string; active: boolean}[]) {
    const activeUsers = users.filter(user => user.active)
    return activeUsers.length
}

// .find returns one thing
// function findUsersByName(users: {name: string; active: boolean}[], wantedName: string) {
//     const result = users.find(({ name }) => wantedName === name )

//     return result
// }

function findUsersByName(users: {name: string; active: boolean}[], wantedName: string) {
    const result = users.find(({ name }) => wantedName === name)

    if (!result) return 'User not found'

    return result
}
// .some will return true as soon as the condition is met. no input needed
function hasActiveUsers(users: {name: string; active: boolean}[]): boolean {
    return users.some((user) => user.active)   
}

const users2 = [
  { name: 'Alice', score: 10 },
  { name: 'Bob', score: 20 },
  { name: 'Charlie', score: 5 }
]

// function getTotalScore(users2: {name: string; score: number}[]): number {
//     let totalScore = 0

//     for (const user of users2) {
//         totalScore += user.score 
//     }

//     return totalScore
// }

function getTotalScore(users2: { name: string; score: number }[]): number {

    return users2.reduce((totalScore, user) => {
        return totalScore + user.score
    }, 0) 
}

const users3 = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true }
]

function makeBobActive(users3: {name: string, active: boolean}[]) {
    users3.map((user) => {
        if (user.name === 'Bob') {
            return { ...user, active: true }
        }
        return user    
    })
}
