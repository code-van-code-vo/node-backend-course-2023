<script>
    import axios from "axios"
    axios.defaults.withCredentials = true

    let username = ''
    let password = ''
    let errorMsg = ''

    async function handleLogin() {
        console.log(username, password)
        let res = await axios.post('http://localhost:3000/users/login', {
            username: username,
            password: password,
        })

        if (res.data.code === 200) {
            window.location.href = '/'
        }
    }
</script>

<h1>Login page</h1>

<form>
    <input bind:value={username} type="text" placeholder="Enter username">
    <input bind:value={password} type="text" placeholder="Enter password">
    <button on:click={handleLogin}>Login</button>
</form>
<p>Error: {errorMsg}</p>

<style>
    input {
        display: block;
        margin: 10px 0;
        padding: 5px;
    }
</style>