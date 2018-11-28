<template>
    <Card>
        <Tabs value="name1">
            <TabPane label="企业异常" name="name1">
                <company-suspect></company-suspect>
            </TabPane>
            <TabPane label="会计疑点" name="name2">
                <account-suspect></account-suspect>
            </TabPane>
        </Tabs>
        <add-rule></add-rule>
        <edit-rule></edit-rule>
        <open-rule></open-rule>
    </Card>
</template>

<script>
import CompanySuspect from './rulecomponent/companysuspectpane'
import AccountSuspect from './rulecomponent/accountsuspectpane'
import AddRule from './rulecomponent/addrule'
import EditRule from './rulecomponent/editrule'
import OpenRule from './rulecomponent/openrule'

export default {
    name:'auditaccount_rule',
    components: {
        CompanySuspect,
        AccountSuspect,
        AddRule,
        EditRule,
        OpenRule
    },
    methods: {

    }
}
</script>
