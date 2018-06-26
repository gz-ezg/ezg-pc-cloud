<template>
    <div>
        <Modal
                v-model="fuwux"
                title="服务项"
                width="50%">
            <Tree :data="data2" show-checkbox multiple ref="tree"></Tree>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        data() {
            return{
                fuwux: false,
                id: '',
                data2: [],
            }
        },
        methods: {
            getData(a) {
                let _self = this
                let url = '/system/serviceContract/template/queryTreegridByCode?templateCode=kjdafwxy&objectId=' + a

                function doSuccess(response) {
                    let _data = response.data.data
                    let _selectItems = []
                    _self.data2 = []

                    if (response.data.data.selectItems != null) {
                        _selectItems = response.data.data.selectItems.split(',')
                    }

                    for (let i = 0; i < _data.treeData.length; i++) {
                        let _children = []
                        for (let j = 0; j < _data.treeData[i].children.length; j++) {
                                _children.push({
                                    disableCheckbox: true,
                                    id: _data.treeData[i].children[j].id,
                                    expand: true,
                                    checked: false,
                                    title: _data.treeData[i].children[j].typeName
                                })
                        }

                        if (response.data.data.selectItems != null) {
                            for (let a = 0; a < _children.length; a++) {
                                for (let b = 0; b < _selectItems.length; b++) {
                                    if (_selectItems[b] == _children[a].id) {
                                        _children[a].checked = true
                                    }
                                }
                            }
                        }

                        _self.data2.push({
                                disableCheckbox: true,
                                title: _data.treeData[i].typeName,
                                expand: true,
                                children: _children
                            })
                    }

                }

                this.GetData(url, doSuccess)
            }
        },
        created(){
            var _self = this
            Bus.$on('fuwux',(e)=>{
                _self.fuwux = true
                _self.getData(e)
            })
        },
    }
</script>
