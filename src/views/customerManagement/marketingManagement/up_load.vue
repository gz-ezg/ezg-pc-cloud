<template>
    <div>
        <Form>
            <FormItem label="City" prop="city">
                <Select transfer v-model="formValidate.city" placeholder="Select your city">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="Desc" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem>
                <div>
                    <Upload
                        :before-upload="handleUpload"
                        
                        >
                        <!-- action="//jsonplaceholder.typicode.com/posts/" -->
                        <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
                    </Upload>
                    <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div>
                </div>
                <div v-if="warning">请上传附件</div>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                warning:true,
                file: null,
                loadingStatus: false
            }
        },
        methods: {
            handleUpload (file) {
                this.file = file;
                console.log(file)
                return false;
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500);
            }
        }
    }
</script>
