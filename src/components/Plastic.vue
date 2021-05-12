<template>
    <div class="com-container">
        <div class="com-chart" ref="plastic_ref"></div>
    </div>
</template>

<script>
    export default {
        name: "Plastic"  ,
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
                this.chartInstance = this.$echarts.init(this.$refs.plastic_ref,'chalk')
                const initOption={
                    title: {
                        text: '▎医美用户购买的面部整形数量',
                        left:20,
                        top:30
                    },
                    tooltip: {
                        trigger: 'item'
                    },
             
                        legend:{
                            show:false
                        },

                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '50%',
                            data: [
                                {value: 32.8, name: '1项'},
                                {value: 22.4, name: '2项'},
                                {value: 16.5, name: '3项'},
                                {value: 10.6, name: '4项'},
                                {value: 13.9, name: '6项及以上'},
                                {value: 3.8, name: '5项'}
                            ],
                            center:['50%','65 %'] ,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
                this.chartInstance.setOption(initOption)

            }        ,
            getData(){
                this.updateChart()

            }   ,

        updateChart(){

        }     ,
            screenAdapter(){
                const titleFontSize=this.$refs.plastic_ref.offsetWidth/100*2.8
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