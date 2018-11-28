<template>
  <div>
    <Poptip
        style="float: right;margin-right:20px"
        placement="bottom-end"
        width="400"
        title="筛选" 
    >
        <Button type="text" size="small" icon="funnel">筛选</Button>
        <div slot="content">
            <Form ref="RoleInline" :model="RoleInline" :label-width="120">
                <Row>
                    <FormItem prop="company" label="角色名称：">
                        <Input type="text" v-model="RoleInline.roleName" placeholder="">
                        </Input>
                    </FormItem>
                </Row>
                <Row>
                    <FormItem>
                        <Button type="primary" @click="search">搜索</Button>
                        <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                    </FormItem>
                </Row>
            </Form>
        </div>
    </Poptip>
  </div>
</template>

<script>
export default {
    data(){
        return{
            RoleInline: {
                roleName
            }
        }
    },
    methods:{
        search(){},
        reset(){}
    }
}
</script>

