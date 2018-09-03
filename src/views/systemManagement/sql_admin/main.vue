<template>
  <div style="min-width:900px">
    <Card>
      <row><ButtonList></ButtonList></row>
      <row><Tableshow></Tableshow></row>
      <AddSQL></AddSQL>
      <EditSQL></EditSQL>
      <Connect></Connect>
      <DShow></DShow>
      <CShow></CShow>
    </Card>
    </div>
</template>

<script>
import Tableshow from './table'
import ButtonList from './buttonlist'
import AddSQL from './modal/add_sql_modal'
import EditSQL from './modal/edit_sql_modal'
import Connect from './modal/connect_sql_user'
import DShow from './modal/detail_show'
import CShow from './modal/connect_show'

export default {
    name: "sqlRoot",
    components: {
        Tableshow,
        ButtonList,
        AddSQL,
        EditSQL,
        Connect,
        DShow,
        CShow
    },
    methods:{
    }
}
</script>
