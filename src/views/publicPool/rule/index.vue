<template>
    <div>
        <Card>
            <div slot="title">规则说明</div>
            <div>
                <Row>
                    1、如果启用了【超过N天“未成交”的客户，由系统定时划入公海】，即便在N天内跟进了，只要客户的客户状态不是“成交客户”，仍然会被划入公海。
                </Row>
                <Row>2、超级管理员负责的客户，不会自动划入客户公海。</Row>
                <Row>3、渠道客户的惩罚默认为由有效成交线索转成有效线索</Row>
                <Row>4、市场部客户的惩罚默认为转入公海池</Row>
                <Row>5、划入期限为0时，惩罚实时生效；划入时间为N时，惩罚不生效</Row>
                <Row>6、客户状态、客户等级。行为、跟进评分不能都选择“全部”或者“无”</Row>
            </div>
        </Card>
        <Card>
            <Table
                highlight-row
                size="small"
                :columns="columns"
                :data="data"
                @on-current-change="selectRow"
                :loading = "customer_loading"
                @on-row-dblclick="isEditChange"
                @on-sort-change="sort"
            ></Table>
            <Page
                size="small"
                :total="pageTotal"
                :current.sync="currentPage"
                show-total
                show-sizer
                show-elevator
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"
                style="margin-top: 10px"></Page>
        </Card>
    </div>
</template>


