<template>
  <v-card>
    <v-card-title
      class="d-flex"
    >
      <div>Vendas</div>
      <v-spacer/>
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
        hide-default-footer
      >
        <template v-slot:item.acoes="{ item }">
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

onMounted(() => {
  atualizar()
})

const atualizar = function() {
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
}

const apagarVenda = function(id_venda) {
  $fetch(`/api/vendas/${id_venda}`, {
    method: 'DELETE'
  }).then(res => atualizar())
}
</script>