<template>
    <div>
        <Modal
            v-model="openShowTemplate"
            width="80%"
            title="查看线索模板"
        >
            <Form 
                ref="clueTemplate"
                :model="clueTemplate"
                :label-width="120"
            >
                <FormItem label="模版名称" prop="name">
                    <Input v-model="clueTemplate.name" placeholder="" type="text" readonly></Input>
                </FormItem>
                <FormItem label="模板详情" prop="detail" >
                    <Input v-model="clueTemplate.detail" placeholder="" type="textarea" :rows=3 readonly></Input>
                </FormItem>
                <FormItem label="模板编码" prop="templateCode">
                    <Input v-model="clueTemplate.templateCode" placeholder="" type="textarea" :rows=3 readonly></Input>
                </FormItem>
                <FormItem label="模板代码块" prop="	templateContent">
                    <Input v-model="clueTemplate.templateContent" placeholder="" type="textarea" :rows=10 readonly></Input>
                </FormItem>
                <FormItem label="模板线索级别" prop="level">
                    <Input v-model="clueTemplate.level" placeholder="" readonly></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            openShowTemplate: false,
            loading: false,
            clueTemplate: {
                name: "",
                detail: "",
                templateCode: "",
                templateContent: "",
                level: "",
                id: ""
            }
        }
    },
    methods:{
    },
    created() {
        let _self = this
        this.$bus.on("OPEN_SHOW_CLUE_TEMPLATE",(e)=>{
            _self.clueTemplate = e
            _self.clueTemplate.templateCode = e.template_code
            _self.clueTemplate.templateContent = e.template_content
            _self.openShowTemplate = true
        })
    },
}
</script>

