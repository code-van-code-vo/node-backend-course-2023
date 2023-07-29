import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { getUsers, findUserById, addUser, updateUserById, deleteUserById } from './users.js'
import { getTournaments, addTournament, deleteTournamentById, addUserToTournament, deleteUserFromTournament, tournamentIsClose, finalizeTournament } from './tournaments.js'

import userRouter from './routes/users.js'
import tournamentRouter from './routes/tournaments.js'

const server = express()
const PORT = process.env.PORT || 3000

server.use(cors())
server.use(bodyParser.json())

server.use('/users', userRouter)
server.use('/tournaments', tournamentRouter)

server.listen(PORT, () => {
    console.log(`Server is listing on ${PORT}`)
})