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
  <div id="botao-novo">
    <div>
      <v-btn
        id="botao"
        icon="mdi-plus"
        size="large"
        @click="exibirformNew = true"
      ></v-btn>
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
      <div class="linha" v-for="product in produtos" :key="product.id">
        <div class="order-number">{{ product.id }}</div>
        <div>{{ product.codigo_interno }}</div>
        <div>{{ product.nome }}</div>
        <div id="teste">{{ product.unidade }}</div>
        <div>{{ product.familia }}</div>
        <v-btn
          id="botao-editar"
          icon="mdi-triangle"
          size="small"
          @click="exibirFormEdit = true; BuscarProdutos(product.id); EditForm=true"
        ></v-btn>
        <v-btn
          id="botao-excluir"
          icon="mdi-minus"
          size="small"
          @click="DeleteProdutos(product.id)"
        ></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import message from "./Message.vue";
import Form from "./Form.vue";

export default {
  name: "dashboard",
  components: {
    message,
    Form,
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
      EditForm: false
    };
  },
  methods: {
    GetProdutos() {
      const config = {
        method: "GET",
        url: "http://localhost:9000/produtos",
      };

      axios(config)
        .then((res) => {
          this.produtos = res.data;
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
            if(res.status == 200){
               this.FormProduto = res.data[0]

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

#botao-novo {
  justify-content: flex-end;
  display: flex;
  margin-right: 50px;
}

#botao {
  background-color: #08c4bc;
  color: white;
  font-weight: bold;
}

#botao-excluir {
  background-color: red;
  color: white;
  font-weight: bold;
  display: flex;
  margin-left: 10px;
}
</style>