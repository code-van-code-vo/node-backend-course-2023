<script>
    import { goto } from '$app/navigation'
    import { redirect } from '@sveltejs/kit'
    import { io } from 'socket.io-client'
    import { onMount } from 'svelte'
    import jwtDecode from "jwt-decode";
    import axios from 'axios'
    axios.defaults.withCredentials = true

    const SEND_MESSAGE_EVENT = 'send message'
    const INFORM_EVENT = 'inform'

    let roomName = ''
    let isConnected = false

    let token = ''
    let userData = {}

    let inputMessageDom
    let messages = []
    let messageContent = ''
    let socket

    function handleSubmit() {
        const message = {
            content: messageContent,
            sender: userData
        }

        socket.emit(SEND_MESSAGE_EVENT, messageContent)
        messages = [...messages, message]

        messageContent = ''
        setTimeout(() => {
            inputMessageDom.focus()
        }, 10)
    }

    function connectWebSocket() {
        socket = io.connect('ws://localhost:3000', {
            query: {
                roomName: roomName,
                token: token
            }
        })
        console.log(socket.connected)

        socket.on('connect', () => {
            console.log('connected')
            isConnected = true
            loadHistoryMessages()
        })

        socket.on('connect_error', error => {
            if (error.message === 'unauthorized') {
                window.location.href = '/login'
            }
        })

        socket.on('disconnect', () => {
            console.log('disconnected')
            isConnected = false
        })

        socket.on(SEND_MESSAGE_EVENT, msg => {
            messages = [...messages, msg]
        })
    }

    async function loadHistoryMessages() {
        const res = await axios.get(`http://localhost:3000/messages/${roomName}`)
        messages = res.data.data
    }

    onMount(() => {
        let cookie = new Map(
            document.cookie
                .split(';')
                .map(each => each.trim().split('='))
        )
        token = cookie.get('token')
        userData = jwtDecode(token)
    })
</script>

<h1>Chatroom</h1>

{#if isConnected}
    <p>Room name: <b>{roomName}</b></p>
    <form>
        <input bind:value={messageContent} bind:this={inputMessageDom} type="text" placeholder="Type message here">
        <input on:click={handleSubmit} type="submit">
    </form>
    {#each messages as msg}
        <div>
            <span class={"msg-sender " + (msg.sender.id === userData.id ? 'blue' : 'red')}>
                {msg.sender.username}: </span>
            <span class="msg-content">{msg.content}</span>
        </div>
    {:else}
        <p>There is no message</p>
    {/each}
{:else}
    <form>
        <input bind:value={roomName} type="text" placeholder="Enter room name">
        <button on:click={connectWebSocket}>Connect</button>
    </form>
{/if}

<style>
    .msg-sender {
        font-weight: bold;
    }
    .blue {
        color: blue;
    }
    .red {
        color: red;
    }
</style>