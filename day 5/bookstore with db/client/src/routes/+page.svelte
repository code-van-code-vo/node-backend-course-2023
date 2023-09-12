
<script>
    import { onMount } from "svelte"
    import axios from 'axios'
    import jwtDecode from "jwt-decode";
    axios.defaults.withCredentials = true

    let books = []
    let token = ''
    let userData = {}

    let title = ''
    let author = ''
    let summary = ''
    let thumbnailImage = null

    function clearToken() {
        document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }

    async function fetchBooks() {
        let res = await axios.get('http://localhost:3000/books')
        books = res.data.data
    }

    async function handleSignout() {
        clearToken()
        userData = {}
    }

    async function handleAddBook() {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('author', author)
        formData.append('summary', summary)
        formData.append('thumbnail_image', thumbnailImage[0])

        try {
            let res = await axios.post(`http://localhost:3000/books`, formData)
            console.log(res.data)

            fetchBooks()
        } catch(err) {
            errorMsg = err.response.data.message
        }
        
    }

    onMount(() => {
        fetchBooks()
        let cookie = new Map(
            document.cookie
                .split(';')
                .map(each => each.trim().split('='))
        )
        token = cookie.get('token')
        userData = jwtDecode(token)
    })
</script>

{#if userData?.username}
    <p>
        You are login as {userData.username}.
        <button on:click={handleSignout}>Signout</button>
    </p>

    <h2>Create books</h2>
    <form>
        <input bind:value={title} type="text" placeholder="Enter title">
        <input bind:value={author} type="text" placeholder="Enter author">
        <input bind:value={summary} type="text" placeholder="Enter summary">
        <p>Thumbnail image: </p><input bind:files={thumbnailImage} type="file"><br><br>
        <button on:click|preventDefault={handleAddBook}>Add</button>
    </form>
{:else}
    <p>You haven't login. <a href="/login">Login</a> now.</p>
{/if}

<h2>List of books</h2>
<div class="book-container">
    {#each books as book}
    <div class='book-item'>
        <p>{book.title}</p> by <p class='book-author'>{book.author}</p><br>
        <img src="http://localhost:3000/{book.thumbnailImage}" alt="">
    </div>
    {/each}
</div>

<style>
    p {
        display: inline;
    }
    .book-container {
        display: flex;
    }
    .book-item {
        border: 1px solid black;
        margin: 10px;
        padding: 15px;
        width: 300px;
        border-radius: 10px;
    }
    .book-author {
        color: red;
    }
    .book-item img {
        display: block;
        width: 100px;
        height: auto;
        margin: 0 auto;
        margin-top: 10px;
    }
    input[type="text"] {
        display: block;
        margin: 10px 0;
        padding: 5px;
    }
</style>