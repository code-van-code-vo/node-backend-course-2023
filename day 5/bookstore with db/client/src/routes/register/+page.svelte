<script>
    import axios from "axios"
    axios.defaults.withCredentials = true

    let username = ''
    let password = ''
    let rePassword = ''
    let errorMsg = ''

    async function handleRegister() {
        if (!username || !password) {
            errorMsg = 'Username or Password cannot empty'
            return
        }
        if (password !== rePassword) {
            errorMsg = 'Re-enter password must match with password'
            return
        }

        let res = null
        try {
            res = await axios.post('http://localhost:3000/users/register', {
                username: username,
                password: password,
            })
        } catch(err) {
            res = err.response
        }

        if (res.data.code === 200) {
            window.location.href = '/'
        } else {
            errorMsg = res?.data?.message || 'There\'s some error'
        }
    }
</script>

<h1>Register page</h1>

<form>
    <input bind:value={username} type="text" placeholder="Enter username">
    <input bind:value={password} type="password" placeholder="Enter password">
    <input bind:value={rePassword} type="password" placeholder="Re-enter password">
    <button on:click={handleRegister}>Register</button>
    {#if errorMsg !== ''}
        <p class="error-msg">Error: {errorMsg}</p>
    {/if}
</form>

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