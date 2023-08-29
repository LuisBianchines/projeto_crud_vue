<template>
  <NavBar :logo="logo_src" :alt="app_name" />
  <router-view />
  <Rodape />
  
</template>

<script >  
  import NavBar from './components/NavBar.vue'; 
  import Rodape from './components/Rodape.vue'; 

export default {
    components: {
      NavBar,
      Rodape
    },
    data(){
      return{
      logo_src: "/img/logo_grv.png",
      app_name: "Cadastro de Produtos"
      }
    }
}
</script>

<style>
  .main-container{
    margin-top: 50px;
    min-height: 500px;    
  }

  h1 {
    text-align: center;
    font-size: 40px;
    margin-bottom: 30px;
    color: dimgray;
  }
</style>
