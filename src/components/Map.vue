<template>
    <div class="com-container">

        <div class="com-chart" ref="map_ref"></div>

    </div>
</template>

<script>
    import axios from'axios'
    export default {
        name: "Map",
        data(){
            return {
                chartInstance:null,
                allData:null
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
            async initChart() {
                this.chartInstance = this.$echarts.init(this.$refs.map_ref,'chalk')

                const ret = await axios.get('http://localhost:8080/static/map/china.json')
                this.$echarts.registerMap('china', ret.data)

                const initOptions = {
                    title:{
                        text:'▎中国医美市场规模前十城市',
                        left:20,
                        top:20

                    },
                    geo: {
                        type: 'map',
                        map: 'china' ,
                        top:'5%',
                        bottom:'5%' ,
                        itemStyle:{
                            areaColor:'#2172bf',
                            borderColor:'#333'
                        }
                    }  ,
                    legend:{
                        left:'5%',
                        bottom:'5%' ,
                        orient:'vertical' ,
                        show:false
                    }
                }
                this.chartInstance.setOption(initOptions)
            },
            async getData(){
                const  {data:ret }=await this.$http.get('map')
                this.allData=ret
                console.log(ret)
                this.updateChart()

            },
            updateChart(){
                const legendArr=this.allData.map(item=>{
                    return item.name
                })
                const seriesArr=this.allData.map(item=>{
                    return {
                        rippleEffect: {
                            scale:5,
                            brushType:'stroke'
                        },
                        type:'effectScatter',
                        name:item.name ,
                        data:item.children   ,
                        coordinateSystem:'geo' ,


                    }
                })
                const dataOption = {
                    series:seriesArr ,
                    legend:{
                        data:legendArr
                    }
                }
                this.chartInstance.setOption(dataOption)
            } ,
            screenAdapter(){
                const titleFontSize=this.$refs.map_ref.offsetWidth/100*2.8

                const adapterOption={
                    title:{
                        textStyle:{
                            fontSize:titleFontSize
                        }
                    }  ,
                    legend:{
                        itemWidth:titleFontSize/2,
                        itemHeight:titleFontSize/2  ,
                        itemGap:titleFontSize/2,
                        textStyle: {
                            fontSize:titleFontSize/2
                        }
                    }
                }
                this.chartInstance.setOption(adapterOption)
                this.chartInstance.resize()

            }
        }                                                ,

    }
</script>

<style scoped>

</style>