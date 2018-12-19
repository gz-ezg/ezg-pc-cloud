<template>
    <div>
        <Card
            title="文件签收表"
        >
            <Button @click="submit" type="primary">提交</Button>
            {{fileList}}
            <div style="width:800px">
                <Collapse v-model="openPage">
                    <Panel name="1">
                        工商
                        <p slot="content" style="display:flex">
                            <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="header"
                                :data="data.slice(0,10)"
                            >
                            </Table>
                            <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="header"
                                :data="data.slice(10,20)"
                            >
                            </Table>
                            <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="header"
                                :data="data.slice(20)"
                            >
                            </Table>
                        </p>
                    </Panel>
                    <Panel name="2">
                        个人信息
                        <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
                    </Panel>
                    <Panel name="3">
                        税务
                        <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
                    </Panel>
                    <Panel name="4">
                        银行
                        <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
                    </Panel>
                    <Panel name="5">
                        其他
                        <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
                    </Panel>
                </Collapse>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            fileList: [],
            openPage: [1],
            total: 0,
            data: [],
            header: [
                {
                    title: "资料名称",
                    key: "file_type_name",
                    width: 120
                },
                // {
                //     title: "",
                //     type: "selection",
                //     width: 90,
                // },
                {
                    //  自定义，1
                    title: "数量",
                    key: "plural_name",
                    width: 120,
                    render: (h, params) =>{
                        return h('InputNumber', {
                            props: {
                                min: 0,
                                value: params.row.num
                            },
                            on: {
                                "on-change": (e)=>{
                                    this.change_num(params.row.id, e)
                                }
                            }
                        })
                    }
                },
            ]
        }
    },
    methods: {
        get_data(){
            let _self = this
            let url = "api/customer/file/type/list"

            let config = {
                params:{
                    page: 1,
                    pageSize: 30,
                    sortField: 'id'
                } 
            }

            function success(res){
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
                _self.data.map((item)=>{
                    item.num = 0
                })
            }

            this.$Get(url, config, success)
        },
        change_num(id, num){
            this.data.find((item)=>{
                if(item.id == id){
                    item.num = num
                }
            })
        },
        submit(){
            this.fileList = []
            this.data.map((item)=>{
                if(item.num != 0){
                    this.fileList.push(item)
                }
            })
        }
    },
    created(){
        this.get_data()
    }
}
</script>

