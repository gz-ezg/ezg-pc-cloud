<template>
    <Table :columns="columns10" :data="data9" highlight-row
        @on-current-change='test'
    ></Table>
</template>
<script>
    import expandRow from './t.vue';
    export default {
        components: { expandRow },
        data () {
            return {
                columns10: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            console.log(params)
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data9: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        detail:[
                            {
                                job: 'Data engineer',
                                interest: 'badminton',
                                birthday: '1991-05-14',
                                book: 'Steve Jobs',
                                movie: 'The Prestige',
                                music: 'I Cry'
                            }
                        ]
                    },
                    {
                        name: 'Jim Green',
                        age: 25,
                        address: 'London No. 1 Lake Park',
                        detail:[
                            {
                                job: 'Data Scientist',
                                interest: 'volleyball',
                                birthday: '1989-03-18',
                                book: 'My Struggle',
                                movie: 'Roman Holiday',
                                music: 'My Heart Will Go On'
                            }
                        ]
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        detail:[
                            {
                                job: 'Data Product Manager',
                                interest: 'tennis',
                                birthday: '1992-01-31',
                                book: 'Win',
                                movie: 'Jobs',
                                music: 'Don’t Cry'
                            }
                        ]
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        detail:[
                            {
                                job: 'Data Analyst',
                                interest: 'snooker',
                                birthday: '1988-7-25',
                                book: 'A Dream in Red Mansions',
                                movie: 'A Chinese Ghost Story',
                                music: 'actor'
                            },
                            {
                                job: 'TTT',
                                interest: 'twst',
                                birthday: '191511',
                                book: 'A Disdvog s',
                                movie: 'A wekmnkbhsdn',
                                music: 'listen'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            test(){
                console.log(this.data9)
            }
        }
    }
</script>