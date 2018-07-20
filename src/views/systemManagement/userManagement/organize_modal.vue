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
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            open_organize_modal:true,
            check_depart_id:"",
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
                // console.log(_self.allDepart)
                // for(let i = 0; i<_self.departTree.length;i++){
                //     _self.departTree[i].title = _self.departTree[i].departname
                //     if(_self.departTree[i].ID == _self.check_depart_id){
                //         _self.departTree[i].checked = true
                //     }
                //     if(_self.departTree[i].children){
                //         for(let j = 0;j<_self.departTree[i].children.length;j++){
                //             if(_self.departTree[i].children[j].ID == _self.check_depart_id){
                //                 _self.departTree[i].children[j].checked = true
                //             }
                //             _self.departTree[i].children[j].title = _self.departTree[i].children[j].departname
                //             if(_self.departTree[i].children[j].children){
                //                 for(let k = 0;k<_self.departTree[i].children[j].children.length;k++){
                //                     if(_self.departTree[i].children[j].ID == _self.check_depart_id){
                //                         _self.departTree[i].children[j].children[k].checked = true
                //                     }
                //                     _self.departTree[i].children[j].children[k].title = _self.departTree[i].children[j].children[k].departname
                //                 }
                //             }
                //         }
                //     }
                // }

                // console.log(_self.allDepart)
                for(let i = 0; i<_self.departTree.length;i++){
                    _self.departTree[i].title = _self.departTree[i].departname
                    if(_self.departTree[i].children){
                        for(let j = 0;j<_self.departTree[i].children.length;j++){
                            _self.departTree[i].children[j].title = _self.departTree[i].children[j].departname
                            if(_self.departTree[i].children[j].children){
                                for(let k = 0;k<_self.departTree[i].children[j].children.length;k++){
                                    _self.departTree[i].children[j].children[k].title = _self.departTree[i].children[j].children[k].departname
                                }
                            }
                        }
                    }
                }
                console.log(_self.departTree)
            }

            this.$Get(url,config, success)
        },
    },
    created(){
        this.getAllDepartTree()
        this.$bus.on('OPEN_ORGANIZE_MODAL',(e)=>{
            // console.log(_self.CUStype)
            _self.open_organize_modal = true
            this.getAllDepartTree()
        })
    }
}
</script>

