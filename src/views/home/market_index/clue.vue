<template>
    <Modal
        v-model="openClueTab"
        title="系统线索"
        width="900"
    >
        <div>
            <clue v-if="openClueTab"></clue>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>

<script>
import clue from '../../cluesLibrary/systemClue/index'
export default {
    components:{
        clue
    },
    data(){
        return{
            openClueTab:false
        }
    },
    created() {
        let _self = this
        this.$bus.off("OPEN_INDEX_CLUE")
        this.$bus.on("OPEN_INDEX_CLUE", (e)=>{
            _self.openClueTab = true
        })
    },
}
</script>

