<template>
    <div>
        <Card>
            <Tabs v-model="tabIndex">
                <TabPane label="税务局账号列表" name="1">
                    <account-list></account-list>
                </TabPane>
                <TabPane label="税务局企业列表" name="2">
                    <company-list></company-list>
                </TabPane>
                <TabPane label="税务局账号企业关联" name="3">
                    <relation></relation>
                </TabPane>
                <TabPane label="在服企业" name="4">
                    <cycle-company></cycle-company>
                </TabPane>
            </Tabs>
        </Card>
    </div>
</template>

<script>
import cycleCompany from './components/cycleCompany';
import companyList from './components/companyList';
import relation from './components/relation/relation';
import accountList from './components/account/accountList';


export default {
    name: "etaxAccount",
    components: {
        cycleCompany,
        companyList,
        relation,
        accountList
    },
    data(){
        return {
            tabIndex: "1"
        }
    }
}
</script>
