
<script>
    import axios from 'axios'
    import { onMount } from 'svelte'

    axios.defaults.withCredentials = true
    let formDom = null

    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(formDom)
        
        axios.post('http://localhost:3000/upload', formData).then((res) => {
            console.log(res.data)
        })
    }

    onMount(() => {
        axios.post('http://localhost:3000/set-cookie').then(res => {
            console.log(res.data)
        })
    })
</script>

<form bind:this={formDom} enctype="multipart/form-data">
    <span>Filename: </span><input type="text" name="filename"><br>
    <input type="file" name="image" /><br>
    <button on:click={handleSubmit} type="submit">Upload</button>
</form>
