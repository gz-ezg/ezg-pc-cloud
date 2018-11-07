<template>
    <div>
        <Modal
                v-model="modal8"
                title="工商信息"
                :mask-closable="false"                
            >
            <Form ref="formValidate3" :model="formValidate3" :label-width="100">
                <FormItem label="公司名称" prop="companyname">
                    <Input v-model="formValidate3.companyname" disabled></Input>
                </FormItem>
                <Row>
                    <Col span="12">
                    <FormItem label="信息机构代码" prop="creditcode">
                        <Input v-model="formValidate3.creditcode"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="机构代码" prop="orgcode">
                        <Input v-model="formValidate3.orgcode"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="主营项目" prop="mainproduct">
                        <Input v-model="formValidate3.mainproduct"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="所属行业" prop="industry">
                        <Input v-model="formValidate3.industry"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="公司性质" prop="companytype">
                        <Input v-model="formValidate3.companytype"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="注册地址" prop="eegaddress" >
                        <Input v-model="formValidate3.eegaddress"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="基本户开户行" prop="basicbank" >
                        <Input v-model="formValidate3.basicbank"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="基本户账号" prop="basicbankcode">
                        <Input v-model="formValidate3.basicbankcode"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="一般户开户行" prop="simplebank">
                        <Input v-model="formValidate3.simplebank"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="国税号码" prop="cnumber">
                        <Input v-model="formValidate3.cnumber"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="国税密码" prop="cpassword">
                        <Input v-model="formValidate3.cpassword"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="开户许可证" prop="bankcode">
                        <Input v-model="formValidate3.bankcode"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="地税号码" prop="pnumber">
                        <Input v-model="formValidate3.pnumber"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="地税密码" prop="ppassword">
                        <Input v-model="formValidate3.ppassword"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="工商注册号" prop="regnumber">
                        <Input v-model="formValidate3.regnumber"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="纳税等级" prop="financelevel">
                        <Select transfer v-model="formValidate3.financelevel">
                            <Option v-for="item in financelevelValue" :value="item.value" :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </div>
</template>
