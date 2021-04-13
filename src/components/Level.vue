<template>
    <div class="com-container">
        <div class="com-chart" ref="level_ref"></div>
    </div>
</template>

<script>
    export default {
        name: "Level" ,
        data(){
            return{
                chartInstance:null,
                allData:null
            }
        }    ,
     mounted(){
            this.initChart()
            this.getData()
            window.addEventListener('resize',this.screenAdapter)
           this.screenAdapter()
  
        }  ,
        destroyed() {
            window.removeEventListener('resize',this.screenAdapter)


        }            ,
        methods:{
            initChart(){
                this.chartInstance=this.$echarts.init(this.$refs.level_ref,'chalk')
                const initOption ={
                    title:{
                        text:'▎2020中国医美用户消费水平' ,
                        subtext: '所占百分比',
                        left:20,
                        top:20
                    },

                    grid:{
                        top:'40%',
                        left:'5%',
                        right:'5%',
                        bottom:'5%',
                        containLabel:true
                    }   ,
                    tooltip:{
                        show:true
                    }   ,
                    xAxis: {
                        type:'category'
                    }  ,
                    yAxis:{
                        type:'value'
                    }   ,
                    series:[
                        {
                            type:'bar'
                        }
                    ]
                }
                this.chartInstance.setOption(initOption)

            }   ,
            async getData() {
             this.updateChart()

            }        ,
            updateChart(){
                const mArr = ['5000及以下','5001-1万元','1万-2万元','2万-4万元','4万-6万元','6万-8万元','8万-10万元','10万元以上']
                const pArr =[3.9,6.9,19.6,34.3,16.7,9.9,5.4,3.4]
                const dataOption ={
                    xAxis:{
                        data:mArr
                    }   ,
                    series: [
                        {
                            data:pArr 

                        }
                    ]
                }
  

                this.chartInstance.setOption(dataOption)
                this.chartInstance.resize()
            }  ,
            screenAdapter(){
                const titleFontSize=this.$refs.level_ref.offsetWidth/100*2.8
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