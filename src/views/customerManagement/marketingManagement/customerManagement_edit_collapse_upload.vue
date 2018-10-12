<template>
    <div>
        <Table border :columns="columns1" :data="data1" style="margin-top: 15px"></Table>
    </div>
</template>

<script>
    import Bus from '../../../components/bus'

    export default {
        props: ['customerid'],
        data () {
            return {
                columns1: [
                    {
                        title: '上传时间',
                        key: 'createdate',
                        minWidth: 180
                    },
                    {
                        title: '附件名称',
                        key: 'attachmenttitle',
                        minWidth: 150
                    },
                    {
                        title: '附件格式',
                        key: 'extend',
                        minWidth: 120
                    },
                    {
                        title: '备注',
                        key: 'content',
                        minWidth: 200
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        render: (h, params) => {
                            console.log(params)
                            if(params.row.extend == "jpg" || params.row.extend == "png"){
                                return h('div', [
                                    h('Poptip', {
                                    props: {
                                        placement: 'left',
                                        type: 'ghost',
                                    },
                                    },[
                                        h('Button',{ 
                                            props: {
                                                type: 'text',
                                                size: 'small',
                                                placement: 'left',
                                            }
                                        }, '预览'), [
                                        h('div',{
                                            slot: 'content'
                                        },[
                                            h('img',{
                                                domProps: {
                                                    height: 100,
                                                    src: '/api/assets/'+params.row.realpath,
                                                },
                                            })
                                        ])
                                            ]
                                        ]),
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click:  () => {
                                                this.fileDownload(params)
                                            }
                                        }
                                    }, '下载'),
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        }
                                    },[
                                        h('Poptip', {
                                            props: {
                                                confirm: true,
                                                title: '您确定要删除此附件吗！',
                                            },
                                            on: {
                                                'on-ok': ()=>{
                                                    this.filesDelete(params)
                                                },
                                                'on-cancel': function(){
                                                }
                                                /*click: () => {
                                                    this.filesDelete(params)
                                                }*/
                                            }
                                        }, '删除')
                                    ])
                                ]);
                            }else{
                                return h('div', [
                                    h('Button',{
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                            placement: 'left',
                                        },
                                        on:{
                                            click:()=>{
                                                let routeData = this.$router.resolve({
                                                    name:'previewFile',
                                                    params:{
                                                        id: params.row.id
                                                    }
                                                })
                                                window.open(routeData.href, '_blank');
                                                // console.log(params.row.id)
                                                // let url = "http://" + location.origin + "/#/previewFile/" + params.row.id
                                                // window.open(url)
                                            }
                                        }
                                    }, '预览'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click:  () => {
                                            this.fileDownload(params)
                                        }
                                    }
                                }, '下载'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                },[
                                    h('Poptip', {
                                        props: {
                                            confirm: true,
                                            title: '您确定要删除此附件吗！',
                                        },
                                        on: {
                                            'on-ok': ()=>{
                                                this.filesDelete(params)
                                            },
                                            'on-cancel': function(){
                                            }
                                            /*click: () => {
                                                this.filesDelete(params)
                                            }*/
                                        }
                                    }, '删除')
                                ])
                            ]);
                            }
                            
                        }
                    }
                ],
                data1: []
            }
        },
        methods: {
            getFileList () {
                var _self = this
                _self.data1 = []
                this.$http.get('/api/customer/findCustomerFilesById/' + _self.customerid)
                    .then(function (response) {
                        // console.log(response)
                        var _filesRes = response.data.data
                        for (var i = 0; i < _filesRes.length; i++) {
                            var _filesArray = {}
                            _filesArray.attachmenttitle = _filesRes[i].attachmenttitle
                            _filesArray.createdate = _filesRes[i].createdate
                            _filesArray.extend = _filesRes[i].extend
                            _filesArray.id = _filesRes[i].id
                            _filesArray.realpath = _filesRes[i].realpath
                            _filesArray.content = _filesRes[i].content
                            _self.data1.push(_filesArray)
                        }
                    })
            },
            filesDelete (e) {
                var _self = this;
                _self.$ButtonCollect("marketingManagement_index_uploadfile_delect");
                this.$http.get('/api/customer/customerFileRemove/' + e.row.id)
                    .then(function (response) {
                        if (response.data.msgCode == '40000') {
                            _self.getFileList()
                        }
                    })
            },
            fileDownload (e) {
                this.$ButtonCollect("marketingManagement_index_uploadfile_download");
                //  二进制想多了
//                this.getFileList()
            //    this.$http({
            //        method: 'get',
            //        async: false,
            //        responseType: 'arraybuffer',
            //        url: '/api/customer/fileDownload/' + e.row.id +'.do',
            //    })
                //    .then(function (response) {
                //         // let blob = new Blob([response.data], {type: "application/vnd.ms-excel"});
                //         let blob = ''
                //         if(e.row.extend == 'xlsx'||e.row.extend == 'xls'){
                //             blob = new Blob([response.data], {type: "application/vnd.ms-excel"});                            
                //         }else if(e.row.extend == 'jpg'||e.row.extend == 'jpeg'){
                //             blob = new Blob([response.data], {type: "image/png"});   
                //         }else if(e.row.extend == 'doc'||e.row.extend == 'docx'){
                //             blob = new Blob([response.data], {type: "application/msword"});                               
                //         }else if(e.row.extend == 'text'){
                //             blob = new Blob([response.data], {type: "text/plain"});                               
                //         }else if(e.row.extend == 'pdf'){
                //             blob = new Blob([response.data], {type: "application/pdf"});   
                //         }else{
                //             blob = new Blob([response.data], {type: "application/x-msdownload"});                               
                //         }

                //         let objectUrl = URL.createObjectURL(blob)

                //         // window.location.href = objectUrl;
                //         window.open(objectUrl)
                //    })
                window.open('/api/customer/fileDownload/' + e.row.id)
    },
            viewFiles () {

            }
        },
        created(){
            Bus.$on('upload_file',(e)=>{
                // this.getFileList()
            })
        },
        mounted () {
            this.getFileList()
        }
    }
</script>