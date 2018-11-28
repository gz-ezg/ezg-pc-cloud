<!-- 用户操作 -->
<template>
    <div>
        <Row>
            <Col><ButtonBox :row="current_select_row"></ButtonBox></Col>
        </Row>
        <Row>
            <Col>
                <role-table @select_current="save_current"></role-table>
            </Col>
        </Row>
    </div>
</template>

<script>
import RoleTable from './roleTable'
import ButtonBox from './RoleButton'

export default {
    data(){
        return{
            current_select_row:'',
        }
    },
    components:{
        RoleTable,
        Button
    },
    methods:{
        save_current(e){
            console.log(e)
            this.current_select_row = e
        }
    }
}
</script>
