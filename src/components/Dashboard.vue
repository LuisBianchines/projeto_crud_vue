<template>
  <message :msg="msg" v-show="msg" />
  <Form
    :form="exibirformNew"
    @closemodal="exibirformNew = false"
    @get-produtos="GetProdutos"
  />
  <Form
    :form="exibirFormEdit"
    @closemodal="exibirFormEdit = false"
    @get-produtos="GetProdutos"
    :Buscar="FormProduto"
    :Editar="EditForm"
  />

  <div id="botao-novo-area">
    <div>
      <div id="search-area">
        <Search id="search" />
      </div>
      <div>
        <v-btn
          id="botao-novo"
          icon="mdi-plus"
          size="large"
          @click="exibirformNew = true"
        >
        </v-btn>
      </div>
    </div>
  </div>

  <div id="tabela-produtos">
    <div>
      <div id="cabecalho-produtos">
        <div class="order-id">#:</div>
        <div>CÓDIGO INTERNO:</div>
        <div>DESCRIÇÃO:</div>
        <div>UN</div>
        <div>FAMÍLIA</div>
      </div>
    </div>
    <div id="linhas-produtos">
      <div class="linha" v-for="product in produtos" :key="product.id" >
        <div class="order-number">{{ product.id }}</div>
        <div>{{ product.codigo_interno }}</div>
        <div>{{ product.nome }}</div>
        <div id="teste">{{ product.unidade }}</div>
        <div>{{ product.familia }}</div>
        <v-btn
          id="botao-editar"
          icon="mdi-pencil"
          size="small"
          @click="
            exibirFormEdit = true;
            BuscarProdutos(product.id);
            EditForm = true;
          "
        ></v-btn>
        <v-btn
          id="botao-excluir"
          icon="mdi-delete"
          size="small"
          @click="DeleteProdutos(product.id)"
        ></v-btn>
    </div>
</div>
<div>
  <v-pagination v-model="Pagination.page" :length="PageCount"></v-pagination>
</div>    
</div>
  
</template>

<script>
import axios from "axios";
import message from "./Message.vue";
import Form from "./Form.vue";
import Search from "./Search.vue";
import { computed } from 'vue';

export default {
  name: "dashboard",
  components: {
    message,
    Form,
    Search,
  },
  data() {
    return {
      produtos: [],
      produto_id: null,
      msg: null,
      exibirformNew: false,
      exibirFormEdit: false,
      FormProduto: {
        id: null,
        cod_empresa: null,
        codigo_interno: null,
        nome: null,
        unidade: null,
        familia: null,
      },
      EditForm: false,
      Pagination: {
        page: 1,
        itemsperPage: 10,
        PageCount: null
      },
    };
  },
  methods: {
    GetProdutos() {
      const config = {
        method: "GET",
        url: "http://localhost:9000/produtos",
        data: {
            id: this.produtos.id,
            cod_empresa: this.produtos.cod_empresa,
            nome: this.produtos.nome,
            unidade: this.produtos.unidade,
            codigo_interno: this.produtos.codigo_interno,
            familia: this.produtos.familia
        }
      };

      axios(config)
        .then((res) => {
          this.produtos = res.data;
          
          this.PageCount = (res.data.length / this.Pagination.itemsperPage)
              
        })
        .catch((error) => {
          console.error(error);
          alert(error.response.data);
        });
    },

    DeleteProdutos(id) {
      const config = {
        method: "DELETE",
        url: `http://localhost:9000/delete/${id}`,
      };

      axios(config)
        .then((res) => {
          if (res.status == 200) {
            this.msg = `Registro nº ${id} excluído com sucesso!`;
            setTimeout(() => {
              this.msg = "";
            }, 3000);
            this.GetProdutos();
          }
        })
        .catch((error) => {
          alert("Erro ao tentar deletar registro");
          console.log(error);
        });
    },

    BuscarProdutos(id) {
      const config = {
        method: "GET",
        url: `http://localhost:9000/buscar/${id}`,
      };
      axios(config)
        .then((res) => {
          if (res.status == 200) {
            this.FormProduto = res.data[0];
          }
        })
        .catch((error) => {
          alert("Erro ao tentar recuperar os registros");
          console.log(error);
        });
    },
  },
  mounted() {
    this.GetProdutos();
  },
};
</script>

<style scoped>
#tabela-produtos {
  max-width: 1200px;
  margin: 0 auto;
}

#cabecalho-produtos,
#linhas-produtos,
.linha {
  display: flex;
  flex-wrap: wrap;
  min-height: 100%;
}

#cabecalho-produtos div,
.linha div {
  width: 20%;
}

#cabecalho-produtos {
  color: dimgray;
}

.linha {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}

#cabecalho-produtos .order-id,
.linha .order-number {
  width: 10%;
}

#cabecalho-produtos {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #08c4bc;
}

#botao-novo-area {
  justify-content: flex-end;
  display: flex;
  margin-right: 50px;
}

#botao-novo-area div {
  display: flex;
}

#botao-novo {
  background-color: #08c4bc;
  color: white;
  font-weight: bold;
}

#botao-excluir {
  background-color: white;
  color: red;
  font-weight: bold;
  display: flex;
  margin-left: 10px;
}

#botao-editar {
  color: dimgray;
}

#search {
  padding: 0;
  height: 55px;
  margin-right: 10px;
  min-width: 300px;
}
</style>