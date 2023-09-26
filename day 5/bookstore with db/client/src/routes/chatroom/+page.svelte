<script>
    import { io } from 'socket.io-client'
    import { onMount } from 'svelte'

    const SEND_MESSAGE_EVENT = 'send message'

    let roomName = ''
    let isConnected = false

    let inputMessageDom
    let messages = []
    let message = ''
    let socket

    function handleSubmit() {
        socket.emit(SEND_MESSAGE_EVENT, message)
        messages = [...messages, message]
        message = ''
        setTimeout(() => {
            inputMessageDom.focus()
        }, 10)
    }

    function connectWebSocket() {
        socket = io.connect('ws://localhost:3000', {
            query: {
                roomName: roomName,
            }
        })
        console.log(socket.connected)

        socket.on(SEND_MESSAGE_EVENT, msg => {
            messages = [...messages, msg]
        })
        
        isConnected = true
    }

    onMount(() => {
    })
</script>

<h1>Chatroom</h1>

{#if isConnected}
    <p>Room name: <b>{roomName}</b></p>
    <form>
        <input bind:value={message} bind:this={inputMessageDom} type="text" placeholder="Type message here">
        <input on:click={handleSubmit} type="submit">
    </form>
    {#each messages as msg}
        <div>
            <p>{msg}</p>
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