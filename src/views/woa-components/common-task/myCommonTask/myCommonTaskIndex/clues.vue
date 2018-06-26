<template>
    <Modal
        v-model="clues"
        title="发现线索"
        width="600"
        ok-text="保存"
    >
        <Form ref="formInline" :model="formInline" :label-width="100">
             <Row :gutter="16">
                <Col span="12">
                    <FormItem prop="companyName" label="客户名称：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem prop="companyName" label="企业名称：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="线索：">
                <Input type="textarea" v-model="formInline.companyName" placeholder="">
                </Input>
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import Bus from '../../../../components/bus'

export default {
    data(){
        return{
            clues:false,
            formInline:{

            }
        }
    },
    created(){
        var _self = this
        Bus.$on('workOrderClues',(e)=>{
            _self.clues = true
        })
    }
}
</script>
