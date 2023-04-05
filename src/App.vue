<!-- Aquí se importan componentes, se ven en consolas. Setup refiere a que usa composition API, caso contrario usa option API -->
<script setup>
  import { ref, reactive, computed, watch } from 'vue'
  import Header from './components/Header.vue'
  import { calcularTotalPagar } from './helpers'

  const state = reactive({
    cantidad: 15000,
  });

  const meses = ref(6);
  const total = computed(() => {
  return calcularTotalPagar(state.cantidad, meses.value);
});
  const minimo = 5000;
  const maximo = 50000;
  const step = 150;



  const formatearDinero = (valor) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    return formatter.format(valor);
  };



  function handleChange(e) {
    state.cantidad = Number(e.target.value);
  }

  const handleChangeDecremento = () => {
    const valor = state.cantidad - step;
    if( valor < minimo ) {
      alert('Cantidad no válida');
      return;
    }

    state.cantidad = valor;
  }

  const handleChangeIncremento = () => {
    const valor = state.cantidad + step;
    if( valor > maximo ) {
      alert('Cantidad no válida');
      return;
    }

    state.cantidad = valor;
  }

  watch([state.cantidad, meses], () => {
    total.value = calcularTotalPagar(state.cantidad, meses.value)
  });

  const pagoMensual = computed(() => {
    return total.value / meses.value
  });


</script>



<!-- Se ve en pantalla -->
<template>
  <v-card
  elevation="5"
  class="mx-auto my-16 card"
  max-width="580"
  variant="outlined"
  >
     <Header/>
     <v-container>
      <v-row>
       <v-col cols="10" class="justify-start pl-14">
         <v-btn density="compact" icon="mdi-minus" class="bg-lime text-white" @click="handleChangeDecremento"></v-btn>
       </v-col>
       <v-col cols="2" class="justify-end">
         <v-btn density="compact" icon="mdi-plus" class="bg-lime text-white" @click="handleChangeIncremento"></v-btn>
       </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="px-16">
          <input
          type="range"
          class="w-100 custom-range range"
          :min="minimo"
          :max="maximo"
          :step="step"
          :value="state.cantidad"
          v-on:input="handleChange"
          />

          <!-- {{state.cantidad}} -->
          <p class="text-center mt-5 text-h4 font-weight-black text-deep-purple-darken-1"> 
            {{ formatearDinero(state.cantidad) }}
          </p>

          <h2 class="text-center mt-10 font-weight-black text-grey-darken-2 text-h5">
            Elige un <span class="text-deep-purple-darken-1">plazo</span> a pagar
          </h2>

          <select
            class="w-100 h-25 rounded-lg text-center  border-grey-lighten-1 text-h6 text-grey-darken-2 mt-5"
            :style="'border: 1px solid silver'"
            :value="meses"
            v-model.number="meses"
          >
            <option value="6">6 Meses</option>
            <option value="12">12 Meses</option>
            <option value="24">24 Meses</option>
          </select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="my-5">
          <div v-if="total > 5000 && state.cantidad!==15000" class="bg-grey-lighten-4 pa-3">
           <h2 class="text-center text-grey-darken-2">
            Resumen de pagos
           </h2>
           <p class="text-h6 text-grey-darken-2 text-center font-weight-bold">{{ meses }} Meses</p>
           <p class="text-h6 text-grey-darken-2 text-center font-weight-bold">Total a pagar: {{ formatearDinero(total) }}</p>
           <p class="text-h6 text-grey-darken-2 text-center font-weight-bold">En cuotas de: {{ formatearDinero(pagoMensual) }}</p>
          </div>

          <p v-else class="text-grey-darken-2 text-center font-weight-bold">Añade una <span class="text-deep-purple-darken-1">cantidad</span> y un <span class="text-deep-purple-darken-1">plazo</span> a pagar</p>
        </v-col>
      </v-row>
     </v-container>
  </v-card>
</template>

<style>

.custom-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #CDDC39;
  cursor: pointer;
}

.range {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: silver; /* color de fondo del control deslizante */
}

/* Agrega sombra al v-card */
.card {
  background-color: #fff;
}

  /* Estilos para el fondo de la página */
  body {
    background-color: #F5F5F5;
  }
</style>

