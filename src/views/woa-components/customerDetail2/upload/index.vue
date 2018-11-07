<template>
    <div>
        <!-- <Button type="primary" shape="circle" icon="plus" @click="uploadModal = true">上传附件</Button> -->
        <Table border :columns="header" :data="data" style="margin-top: 15px" :loading="loading"></Table>
        <!-- <Modal
            v-model="uploadModal"
            title="上传附件"
        >
            <Upload
                    ref="upload"
                    multiple
                    :before-upload="handleUpload"
                    action=""
                    >
                <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
            </Upload>
            <div v-for="(item,index) in file" :key=index>{{ item.name }}
                <Button type="text" @click="fileRemove(item)" size="small">移除</Button>
            </div> -->
            <!-- <Input v-model="value6" type="textarea" :rows="7" placeholder="请填写备注"></Input> -->
            <!-- <div slot="footer">
                <Button type="primary" @click="upload" :loading="upload_loading">上传</Button> -->
                <!-- <Button type="ghost" @click="cancel" style="margin-left: 8px">取消</Button> -->
            <!-- </div>
        </Modal> -->
    </div>
</template>

<script>
export default {
        props: {
            customer:{
                type: [Array, Object, String]
            }
        },
        data () {
            return {
                loading: false,
                uploadModal: false,
                header: [
                    {
                        title: "序号",
                        type: "index",
                        minWidth: 60,
                    },
                    {
                        title: '附件名称',
                        key: 'attachmenttitle',
                        minWidth: 150
                    },
                    {
                        title: '上传时间',
                        key: 'createdate',
                        minWidth: 180
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
                                        // h('Poptip', {
                                        //     props: {
                                        //         confirm: true,
                                        //         title: '您确定要删除此附件吗！',
                                        //     },
                                        //     on: {
                                        //         'on-ok': ()=>{
                                        //             this.files_delete(params)
                                        //         },
                                        //         'on-cancel': function(){
                                        //         }
                                        //     }
                                        // }, '删除')
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
                                    // h('Poptip', {
                                    //     props: {
                                    //         confirm: true,
                                    //         title: '您确定要删除此附件吗！',
                                    //     },
                                    //     on: {
                                    //         'on-ok': ()=>{
                                    //             this.files_delete(params)
                                    //         },
                                    //         'on-cancel': function(){
                                    //         }
                                    //     }
                                    // }, '删除')
                                ])
                            ]);
                            }
                            
                        }
                    }
                ],
                data: [],
                //  上传
                file: [],
                upload_loading: false,
            }
        },
        methods: {
            get_file_list () {
                var _self = this
                _self.loading = true
                let url = '/api/customer/findCustomerFilesById/' + _self.customer.ID
                let config = {}

                function success(res){
                    _self.data = res.data.data
                    _self.loading = false
                }

                this.$Get(url, config, success)
            },
            // files_delete (e) {
            //     var _self = this;
            //     _self.$ButtonCollect("marketingManagement_index_uploadfile_delect")

            //     let url = `/api/customer/customerFileRemove/` + e.row.id

            //     function success(res){
            //         _self.$Message.success("删除成功！")
            //         _self.get_file_list()
            //     }

            //     function fail(err){
            //         _self.$Message.error(err)
            //     }

            //     this.$Get(url, config, success, fail)
            // },
            fileDownload (e) {
                this.$ButtonCollect("marketingManagement_index_uploadfile_download");
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

            },
            //  上传
            // handleUpload(file) {
            //     this.file.push(file)
            //     return false;
            // },
            // fileRemove(e) {
            //     this.file.splice(this.file.indexOf(e), 1);
            // },
            // upload() {
            //     var _self = this;
            //     _self.$ButtonCollect("marketingManagement_index_uploadfile_upload");
            //     _self.upload_loading = true
            //     var formdata = new FormData()
            //     var url = 'api/zuul/customer/customerFilesUploadById/' + _self.customer.ID

            //     for (var i = 0; i < this.file.length; i++) {
            //         formdata.append('files', this.file[i])
            //     }
            //     formdata.append('customerId', _self.customer.ID)

            //     function success(res){
            //         _self.upload_loading = false
            //         _self.file = []
            //         setTimeout(()=>{
            //             _self.get_file_list()
            //         }, 300)
            //         _self.uploadModal = false
            //     }

            //     function fail(err){
            //         _self.upload_loading = false
            //     }

            //     this.$Post(url, formdata, success, fail)
            // },
        },
        created(){
            let _self = this
            this.$bus.on("FOLLOW_UP_UPDATE_FILE", (e)=>{
                _self.get_file_list()
            })
        },
        mounted () {
            this.get_file_list()
        }
    }
</script>