<script>
    import axios from "axios"
    axios.defaults.withCredentials = true

    let username = ''
    let password = ''
    let errorMsg = ''

    async function handleLogin() {
        if (username === '' || password === '') {
            errorMsg = 'Username or Password cannot be empty'
            return
        }

        try {
            let res = await axios.post('http://localhost:3000/users/login', {
                username: username,
                password: password,
            })
            if (res.data.code === 200) {
                window.location.href = '/'
            }
        } catch(err) {
            let res = err.response
            errorMsg = res.data.message
            console.log(res.data)
        }
    }
</script>

<h1>Login page</h1>

<form>
    <input bind:value={username} type="text" placeholder="Enter username">
    <input bind:value={password} type="password" placeholder="Enter password">
    <button on:click={handleLogin}>Login</button><br>
    <a href="http://localhost:3000/auth/google">Login with Google</a>
</form>
{#if errorMsg !== ''}
    <p class="error-msg">Error: {errorMsg}</p>
{/if}

<style>
    input {
        display: block;
        margin: 10px 0;
        padding: 5px;
    }
    .error-msg {
        color: red;
    }
</style>