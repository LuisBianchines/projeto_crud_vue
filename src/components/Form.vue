<template>
  <message :msg="msg" v-show="msg" />
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template> </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Novo Produto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Código Interno"
                  required
                  v-model="valores.cod_interno" 
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field
                  label="Descrição"
                  hint="Digite o nome do produto"
                  required
                  v-model="valores.nome"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  :items="['PÇ', 'KG', 'M', 'MM', 'CJ', 'PCT']"
                  label="UN"
                  required
                  v-model="valores.un"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field
                  label="Família"
                  hint="Digite a família do produto"
                  v-model="valores.familia"                 
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#08c4bc"
            variant="text"
            @click="
              dialog = false;
              this.$emit('closemodal')"
          >
            Fechar
          </v-btn>
          <v-btn v-if="Edit == true"
            color="#08c4bc"
            variant="text"
            @click="
              dialog = false;
              UpdateProduct(valores.id)
              this.$emit('closemodal')"
          >
            Salvar
          </v-btn>
          <v-btn v-else
            color="#08c4bc"
            variant="text"
            @click="
              dialog = false;
              NewProduct();
              this.$emit('closemodal')"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import message from "./Message.vue";

export default {
  name: "form",
  components: {
    message
  },
  props: {
    form: Boolean,
    Buscar: Object,
    Editar: Boolean
  },

  emits: ["closemodal", "GetProdutos"],

  watch: {
    form(newvalue) {
      this.dialog = newvalue;
    },

    Buscar(newvalue) {    
      this.valores.id =  newvalue.id
      this.valores.cod_empresa = newvalue.cod_empresa
      this.valores.cod_interno = newvalue.codigo_interno
      this.valores.nome = newvalue.nome
      this.valores.un = newvalue.unidade
      this.valores.familia = newvalue.familia     
    },
    
    Editar(newvalue){
      this.Edit = newvalue;
    }
  },

  data() {
    return {
      dialog: false,
      valores: {},
      Edit: false,
      msg: null
    };
  },

  methods: {
    NewProduct() {
      const config = {
        method: "POST",
        url: "http://localhost:9000/novo",
        data: {
          codigo_interno: this.valores.cod_interno,
          nome: this.valores.nome,
          familia: this.valores.familia,
          unidade: this.valores.un,
        },
      };
      axios(config)
        .then((res) => {       
          this.valores = res.data;
          this.$emit("GetProdutos");

          this.valores = {}
        })
        .catch((error) => {
          console.error(error);
          alert(error.response.data);
        });
    },

    UpdateProduct(id){
      const config = {
        method: "PUT",
        url: `http://localhost:9000/update/${id}`,
        data: {
          codigo_interno: this.valores.cod_interno,
          nome: this.valores.nome,
          familia: this.valores.familia,
          unidade: this.valores.un,
        },
      };
      axios(config)
        .then((res) => {
          this.valores = res.data;
          this.$emit("GetProdutos");

        })
        .catch((error) => {
          console.error(error);
          alert(error.response.data);
        });    
    }

  },
};
</script>