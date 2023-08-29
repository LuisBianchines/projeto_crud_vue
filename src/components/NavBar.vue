<template>
    <div id="nav">
        <router-link to="/" id="logo_url">
            <img :src="logo" :alt="alt" id="logo">
        </router-link>    
        <router-link to="/">Home</router-link>
        <router-link to="/Cadastro">Produtos</router-link>

    </div>  
</template>

<script>
export default {
    name: "NavBar",
    props: ["logo","alt"]
}
</script>

<style scoped>
    #nav{
        background-color: #fff;
        border-bottom: 4px solid #08c4bc;
        padding: 15px 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center; 
        font-size: 20px;
    }

    #nav a {
        color: dimgray;
        text-decoration: none;
        margin: 12px;
        transition: .5s;    
        font-weight: bold;    
    }

    #nav a:hover {
        color: #08c4bc;
    }

    #nav #logo_url {
        margin: auto;
        margin-left: 0;
    }


</style>