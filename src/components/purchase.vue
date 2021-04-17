<template>
    <div class="com-container">
        <div class="com-chart" ref="purchase_ref"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                chartInstance:null,
                allData:null ,
                currentIndex:0,
                titleFontSize:0
            }
        }                   ,
        mounted() {
            this.initChart()
            this.getData()
            window.addEventListener('resize',this.screenAdapter)
            this.screenAdapter()

        }  ,
        destroyed() {
            window.removeEventListener('resize',this.screenAdapter)
        }   ,
        methods:{
            initChart() {
                this.chartInstance = this.$echarts.init(this.$refs.purchase_ref,'chalk')
                const initOption={
                    title: {
                        text: ''
                    },
                    tooltip: {},
                    legend: {
                        data: []
                    },
                    radar: {
                        //shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [
                            { name: '面部整形', max: 100},
                            { name: '皮肤美容', max: 100},
                            { name: '美体塑形', max:100},
                            { name:'牙齿美容', max: 100},
                            { name: '私密护理', max: 100},
                            { name: '植发/种发', max: 100}
                        ]
                    },
                    series: [{
                        name: '预算 vs 开销（Budget vs spending）',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data: [
                            {
                                value: [60.6, 69, 43.9, 39.7, 14.3, 4.3],
                                name: '预算分配（Allocated Budget）'
                            }
                        ]
                    }]
                }
                this.chartInstance.setOption(initOption)

            }        ,
            getData(){
                this.updateChart()

            }   ,

            updateChart(){

            }     ,
            screenAdapter(){
                const titleFontSize=this.$refs.purchase_ref.offsetWidth/100*2.8
                const adapterOption = {
                    title:{
                        textStyle:{
                            fontSize:titleFontSize
                        }
                    }                             ,
                    series:[
                        {
                            barWidth:titleFontSize,
                            itemStyle:{
                                barBorderRadius: [titleFontSize/2,titleFontSize/2,0,0]
                            }
                        }
                    ]

                }
                this.chartInstance.setOption(adapterOption)
                this.chartInstance.resize()
            }     ,
        }
    }
</script>

<style scoped>

</style>