import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { getUsers, findUserById, addUser, updateUserById, deleteUserById } from './users.js'
import { getTournaments, addTournament, deleteTournamentById, addUserToTournament, deleteUserFromTournament, tournamentIsClose, finalizeTournament } from './tournaments.js'

const server = express()
const PORT = 3000

server.use(cors())
server.use(bodyParser.json())

server.get('/users', (req, res) => {
    res.send(getUsers())
})

server.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const user = findUserById(userId)
    if (!user) {
        res.status(404).send('User not found')
    } else {
        res.send(user)
    }
})

server.post('/users', (req, res) => {
    const user = req.body

    if (user?.displayName && user?.age) {
        addUser(req.body)
        res.send('User Added')
    } else {
        res.status(400).send('Missing field')
    }
})

server.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)

    const isUpdate = updateUserById(userId, req.body)
    if (isUpdate) {
        res.send('User updated')
    } else {
        res.send('Cannot update non-exist user')
    }
})

server.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    let isDelete = deleteUserById(userId)

    if (isDelete) {
        res.send('User deleted')
    } else {
        res.send('Cannot delete non-exist user')
    }
})

server.get('/tournaments', (req, res) => {
    const tournaments = getTournaments().map(tournament => {
        return {
            id: tournament.id,
            name: tournament.name,
            winner: findUserById(tournament.winnerId),
            participants: Array.from(tournament.userIds).map(id => findUserById(id))
        }
    })
    res.send(tournaments)
})

server.post('/tournaments', (req, res) => {
    const tournament = req.body

    if (tournament?.name) {
        addTournament(tournament)
        res.send('Tournament added')
    } else {
        res.send('Missing field')
    }
})

server.delete('/tournaments/:id', (req, res) => {
    const tournamentId = parseInt(req.params.id)
    const isDelete = deleteTournamentById(tournamentId)
    
    if (isDelete) res.send('Tournament deleted')
    else res.send('Cannot delete non-exist tournament')
})

server.post('/tournaments/:tournamentId/users/:userId', (req, res) => {
    const tournamentId = parseInt(req.params.tournamentId)
    const userId = parseInt(req.params.userId)
    
    if (!tournamentIsClose(tournamentId)) {
        addUserToTournament(userId, tournamentId)
        res.send('User added')    
    } else {
        res.send('Tournament is closed')
    }
})

server.delete('/tournaments/:tournamentId/users/:userId', (req, res) => {
    const tournamentId = parseInt(req.params.tournamentId)
    const userId = parseInt(req.params.userId)
    
    if (!tournamentIsClose(tournamentId)) {
        deleteUserFromTournament(userId, tournamentId)
        res.send('User deleted')
    } else {
        res.send('Tournament is closed')
    }
})

server.post('/tournaments/:tournamentId/finalize', (req, res) => {
    const tournamentId = parseInt(req.params.tournamentId)

    if (!tournamentIsClose(tournamentId)) {
        const winnerId = finalizeTournament(tournamentId)
        res.send({ winner: findUserById(winnerId) })
    } else {
        res.send('Tournament is close')
    }
})

server.listen(PORT, () => {
    console.log(`Server is listing on ${PORT}`)
})