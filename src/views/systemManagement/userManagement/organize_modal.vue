<template>
    <div>
        <Modal
            title="选择所属部门"
            v-model="open_organize_modal"
            width="400"
        >
            <Row>
                <Tree :data="departTree" show-checkbox @on-check-change="getCheckedNodes" ></Tree>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="changeOrg">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            open_organize_modal:false,
            check_depart_id:"",
            check_depart_name:"",
            departTree:[]
        }
    },
    methods:{
        getAllDepartTree(){
            let _self = this
            let url = `api/system/depart/tree/list`
            let config = {

            }

            function success(res){
                _self.departTree = res.data.data
                for(let i = 0; i<_self.departTree.length;i++){
                    _self.departTree[i].title = _self.departTree[i].departname
                    _self.departTree[i].level = 1
                    if(_self.departTree[i].ID == _self.check_depart_id){
                        _self.departTree[i].checked = true
                    }
                    if(_self.departTree[i].children){
                        for(let j = 0;j<_self.departTree[i].children.length;j++){
                            if(_self.departTree[i].children[j].ID == _self.check_depart_id){
                                _self.departTree[i].children[j].checked = true
                            }
                            _self.departTree[i].children[j].title = _self.departTree[i].children[j].departname
                            _self.departTree[i].children[j].level = 2
                            if(_self.departTree[i].children[j].children){
                                for(let k = 0;k<_self.departTree[i].children[j].children.length;k++){
                                    if(_self.departTree[i].children[j].children[k].ID == _self.check_depart_id){
                                        _self.departTree[i].children[j].children[k].checked = true
                                    }
                                    _self.departTree[i].children[j].children[k].title = _self.departTree[i].children[j].children[k].departname
<<<<<<< HEAD
                                    _self.departTree[i].children[j].children[k].level = 3
                                    // console.log(_self.departTree[i].children[j].children[k].children)
=======
>>>>>>> 2ffb20f5692c391e14669c1494def2f2296c7f29
                                    if(_self.departTree[i].children[j].children[k].children){
                                        for(let t = 0;t<_self.departTree[i].children[j].children[k].children.length;t++){
                                            if(_self.departTree[i].children[j].children[k].children[t].ID == _self.check_depart_id){
                                                _self.departTree[i].children[j].children[k].children[t].checked = true
                                            }
<<<<<<< HEAD
                                            _self.departTree[i].children[j].children[k].children[t].level = 4
                                            // console.log(_self.departTree[i].children[j].children[k].children[t])
=======
>>>>>>> 2ffb20f5692c391e14669c1494def2f2296c7f29
                                            _self.departTree[i].children[j].children[k].children[t].title = _self.departTree[i].children[j].children[k].children[t].departname
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            this.$Get(url,config, success)
        },
        getCheckedNodes(e){
            console.log(e)
            let _self = this

            //  处理多选情况，同一层级的多选
            let temp = []
            if(e.length == 0){
                temp = []
            }else{
                // console.log(e[0].level)
                temp.push(e[0])
                for(let i = 1; i < e.length; i++){
                    if(e[0].level == e[i].level){
                        temp.push(e[i])
                    }
                }
                // console.log(temp)
            }

            if(e.length == 0){
                _self.check_depart_id = ""
                _self.check_depart_name = ""
            }else{
                _self.check_depart_id = e[0].ID
                _self.check_depart_name = e[0].departname
            }
        },
        changeOrg(){
            let _self = this
            this.$bus.emit("CREATE_USER_ORG_DATA",{id:_self.check_depart_id,departname:_self.check_depart_name})
            _self.open_organize_modal = false
        }
    },
    created(){
        let _self = this
        this.getAllDepartTree()
        this.$bus.on('OPEN_ORGANIZE_TABLE',(e)=>{
            // console.log(e)
            // console.log(_self.CUStype)
            _self.check_depart_id = e
            _self.open_organize_modal = true
            this.getAllDepartTree()
        })
    },
    // beforeUpdate(){
    //     this.getAllDepartTree()
    // }
}
</script>

