
import { Server as WSServer } from 'socket.io'
import jwt from 'jsonwebtoken'
    
const SEND_MESSAGE_EVENT = 'send message'
const INFORM_EVENT = 'inform'

const UNAUTHORIZED_ERROR = 'unauthorized'

export function initWebsocket(serverInstance) {

    const io = new WSServer(serverInstance, {
        cors: '*'
    })

    io
    .use((socket, next) => {
        const { roomName, token } = socket.handshake.query
    
        if (!token || token == 'undefined') {
            next(new Error(UNAUTHORIZED_ERROR))
        }

        try {
            const data = jwt.verify(token, process.env.SECRET)
            socket.data = { ...socket.data, ...data }
        } catch(err) {
            next(new Error(UNAUTHORIZED_ERROR))
        }
    
        if (roomName && token && token != 'undefined') {
            socket.join(roomName)
            socket.data.roomName = roomName
            next()
        }
    })
    .on('connection', socket => {
        const roomName = socket.data.roomName
    
        console.log(`${socket.id} connected`)
    
        socket.on(SEND_MESSAGE_EVENT, msg => {
            const message = {
                content: msg,
                sender: {
                    id: socket.data.id,
                    username: socket.data.username
                }
            }

            socket.to(roomName).emit(SEND_MESSAGE_EVENT, message)
            console.log('Message:', msg)
        })
    
        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`)
        })
    })
    
}