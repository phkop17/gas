<template>
  <v-dialog
    v-model="cadastro.dialog"
    max-width="500"
    persistent
  >
    <v-card
      :title="cadastro.id ? 'Editar Venda' : 'Nova Venda'"
    >
      <v-form
        @submit.prevent="salvarVenda()"
        validate-on="submit"
        ref="formCadastro"
      >
        <v-card-text>
          <v-date-input
            label="Data"
            v-model="cadastro.data_venda"
            prepend-icon=""
            :rules="[regras.requerido('Informe a data.')]"
          />
          <v-text-field
            label="Cidade"
            v-model="cadastro.cliente_cidade"
            :rules="[regras.requerido('Informe a cidade.')]"
          />
          <v-text-field
            label="Cliente"
            v-model="cadastro.cliente_nome"
            :rules="[regras.requerido('Identifique o cliente.')]"
          />
          <v-text-field
            label="Telefone"
            v-model="cadastro.cliente_telefone"
            :rules="[regras.requerido('Digite o telefone do cliente.')]"
          />
          <v-autocomplete
            label="Vendedor"
            v-model="cadastro.id_vendedor"
            :rules="[regras.requerido('Informe o vendedor.')]"
            :items="vendedores"
            item-title="nome"
            item-value="id"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            text="Cancelar"
            @click="limparCadastro()"
          />
          <v-btn
            text="Salvar"
            @click=""
            type="submit"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>

  <v-card>
    <v-card-title
      class="d-flex"
    >
      <div>Vendas</div>
      <v-spacer/>
      <v-icon-btn
        icon="mdi-plus"
        @click="cadastro.dialog=true"
      />
      <v-icon-btn
        icon="mdi-refresh"
        @click="atualizar()"
      />
    </v-card-title>
    <v-card-text>
      <v-data-table
        :items="dados"
        :headers="headers"
        :loading="carregando"
      >
        <template v-slot:item.acoes="{ item }">
          <v-icon-btn icon="mdi-pencil" @click="editarVenda(item['#'])" />
          <v-icon-btn icon="mdi-delete" @click="apagarVenda(item['#'])" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
const carregando = ref(false)
const dados = ref([])
const headers = ref([
  {
    key: 'data',
    title: 'Data'
  },
  {
    key: 'cidade',
    title: 'Cidade'
  },
  {
    key: 'cliente',
    title: 'Cliente'
  },
  {
    key: 'telefone',
    title: 'Telefone'
  },
  {
    key: 'vendedor',
    title: 'Vendedor'
  },
  {
    key: 'acoes',
  },
])

const vendedores = ref([])

const cadastro = reactive({
  dialog: false,
  id: null,
  data_venda: '',
  cliente_cidade: '',
  cliente_nome: '',
  cliente_telefone: '',
  id_vendedor: null
})

const formCadastro = ref(null)

onMounted(() => {
  atualizar()
})

const atualizar = async function() {
  carregando.value = true
  $fetch('/api/vendas').then(res => {
    dados.value.length = 0
    res.forEach(venda => {
      dados.value.push({
        '#': venda.id,
        data: new Date(venda.data).toLocaleDateString(),
        cidade: venda.cidade,
        cliente: venda.cliente,
        telefone: venda.telefone,
        vendedor: venda.vendedor,
        acoes :''
      })
    });
    carregando.value = false
  })

  $fetch('/api/vendedores').then(res => {
    vendedores.value.length = 0
    
    res.forEach(vendedor => vendedores.value.push(vendedor))
  })
}

const apagarVenda = function(id_venda) {
  $fetch(`/api/vendas/${id_venda}`, {
    method: 'DELETE'
  }).then(res => atualizar())
}

const salvarVenda = function() {
  formCadastro.value.validate().then(res => {
    if (res.valid) {
      if (cadastro.id) {
        // Edição
        $fetch(`api/vendas/${cadastro.id}`, {
          method: 'PUT',
          body: cadastro
        }).then(res => {
          atualizar()
          limparCadastro()
        })
      } else {
        $fetch('api/vendas', {
          method: 'POST',
          body: cadastro
        }).then(res => {
          atualizar()
          limparCadastro()
        })
      }
      

    }
  })
}
    
const limparCadastro = function() {
  cadastro.dialog = false
  cadastro.id = null
  cadastro.data_venda = ''
  cadastro.cliente_cidade = ''
  cadastro.cliente_nome = ''
  cadastro.cliente_telefone = ''
  cadastro.id_vendedor = null
}

const editarVenda = function(id_venda) {
  $fetch(`/api/vendas/${id_venda}`).then(res => {
    let venda = res[0]

    cadastro.id = venda.id
    cadastro.data_venda = venda.data_venda
    cadastro.cliente_cidade = venda.cliente_cidade
    cadastro.cliente_nome = venda.cliente_nome
    cadastro.cliente_telefone = venda.cliente_telefone
    cadastro.id_vendedor = venda.id_vendedor
    cadastro.dialog = true
  })
}

</script>