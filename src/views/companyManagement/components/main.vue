<template>
  <div style="min-width:900px;padding:20px;background:white;border-radius:5px">
    <row><Button></Button></row>
    <row><Tableshow></Tableshow></row>
  </div>
</template>

<script>
import Button from './buttonGroups'
import Tableshow from './table'

export default {
    name: "company",
    components: {
        Button,
        Tableshow
    },
    created: function(){

    },
    data(){
        return{}
    },
    methods:{
        show(){
        }
    }
}
</script>
