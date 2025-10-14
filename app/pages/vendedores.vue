<template>
  <v-dialog
    v-model="dialogo"
    persistent
    max-width="500"
  >
    <v-card
      title="Novo Vendedor"
    >
      <v-form
        @submit="cadastrarVendedor()"
      >
        <v-card-text>
          <v-text-field
            label="Nome"
            v-model="novo_vendedor.nome"
          />
          <v-text-field
            label="Telefone"
            v-model="novo_vendedor.telefone"
            maxlength="11"
          />
          <v-text-field
            label="Cidade"
            v-model="novo_vendedor.cidade"
          />
        </v-card-text>
        
        <v-card-actions>
          <v-spacer/>
          <v-btn
            text="Cancelar"
            @click="cancelarNovoVendedor()"
          />
          <v-btn
            text="Salvar"
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
      <div>Vendedores</div>
      <v-spacer/>
      <v-icon-btn
        icon="mdi-plus"
        @click="dialogo=true"
      />
    </v-card-title>
    <v-card-text>
      <v-data-table
        :items="dados"
        :headers="headers"
        :loading="carregando"
        hide-default-footer
      >
        <template v-slot:item.acoes="{ item }">
          <v-icon-btn icon="mdi-delete" @click="apagarVendedor(item['#'])" />
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
    key: 'nome',
    title: 'Nome'
  },
  {
    key: 'telefone',
    title: 'Telefone'
  },
  {
    key: 'cidade',
    title: 'Cidade'
  },
  {
    key: 'acoes',
  },
])
const dialogo = ref(false)

const novo_vendedor = reactive({
  nome: '',
  telefone: '',
  cidade: null
})

onMounted(() => {
  atualizar()
})

const atualizar = function() {
  carregando.value = true
  dados.value.length = 0
  $fetch('/api/vendedores').then(res => {
    res.forEach(vendedor => {
        dados.value.push({
            '#': vendedor.id,
            nome: vendedor.nome,
            telefone: vendedor.telefone,
            cidade: vendedor.cidade,
            acoes: ''
        })
    });
    carregando.value = false
  })
}

const apagarVendedor = function(id_venda) {
  $fetch(`/api/vendedores/${id_venda}`, {
  method: 'DELETE'
  }).then(res => atualizar())
}

const cancelarNovoVendedor = function() {
  dialogo.value = false
  novo_vendedor.nome = ''
  novo_vendedor.telefone = ''
  novo_vendedor.cidade = null
}

const cadastrarVendedor = function() {
  $fetch('api/vendedores', {
    method: 'POST',
    body: novo_vendedor
  })
}
</script>