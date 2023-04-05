<script>

</script>

<template>
    <v-row>
       <v-col cols="10" class="justify-start pl-14">
         <v-btn density="compact" icon="mdi-minus" class="bg-lime text-white" @click="handleChangeDecremento"></v-btn>
       </v-col>
       <v-col cols="2" class="justify-end">
         <v-btn density="compact" icon="mdi-plus" class="bg-lime text-white" @click="handleChangeIncremento"></v-btn>
       </v-col>
    </v-row>
</template>