<template>
    <div class="com-container">
        <div class="com-chart" ref="rank_ref"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                chartInstance:null,
                allData:null,
                startValue: 0,
                endValue: 9   ,
                timerId:null
            }
        }         ,
        mounted() {
            this.initChart()
            this.getData()
            window.addEventListener('resize',this.screenAdapter)
            this.screenAdapter()
        }          ,
        destroyed() {
            window.removeEventListener('resize',this.screenAdapter)
            clearInterval(this.timerId)

        }            ,
        methods:{
             initChart(){
                 this.chartInstance=this.$echarts.init(this.$refs.rank_ref,'chalk')
                 const initOption ={
                     title:{
                         text:'▎2012-2023中国医美市场规模' ,
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
                 this.chartInstance.on('mouseover',()=>{
                     clearInterval(this.timerId)
                 })
                 this.chartInstance.on('mouseout',()=>{
                     this.startInterval()
                 })
             }                                           ,
            async getData(){
                const  {data:ret }=await this.$http.get('rank')
                this.allData=ret
                this.allData.sort((a ,b)=>{
              if (a<b){
                  return -1
              }            else if (a>b){
                  return 1
              }           else{
                  return 0
              }
                })

                 this.updateChart()
                this.startInterval()
            },
            updateChart(){
                const colorArr = [
                    ['#0BA82C', '#4FF778'],
                    ['#2E72BF', '#23E5E5'],
                    ['#5052EE', '#AB6EE5']
                ]
                 const provinceArr=this.allData.map(item=>{
                     return item.name
                 })
                const valueArr=this.allData.map(item=>{
                    return item.value
                    }

                )
                  const dataOption ={
                     xAxis:{
                         data:provinceArr
                     }   ,
                      dataZoom:{
                         show:false      ,
                          startValue:this.startValue,
                          endValue:this.endValue,
                      }           ,
                      series: [{
                         data:valueArr ,
                          itemStyle:{
                             color:arg=>{
                               let   targetColorArr=null
                                 if (arg.value>300){ targetColorArr=colorArr[0]}
                                 else if (arg.value>200){targetColorArr=colorArr[1]}
                                 else {     targetColorArr=colorArr[2]}
                                 return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                     // 百分之0状态之下的颜色值
                                     {
                                         offset: 0,
                                         color: targetColorArr[0]
                                     },
                                     // 百分之100状态之下的颜色值
                                     {
                                         offset: 1,
                                         color: targetColorArr[1]
                                     }
                                 ])
                             }
                          },
                      }]

                  }
                  this.chartInstance.setOption(dataOption)
                this.chartInstance.resize()
            }  ,


            
            screenAdapter(){
                 const titleFontSize=this.$refs.rank_ref.offsetWidth/100*2.8
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





            startInterval(){
                 if (this.timerId) {
                     clearInterval(this.timerId)
                 }
              this.timerId =  setInterval(()=>{
                     this.startValue++
                     this.endValue++
                     if(this.endValue>this.allData.length-1){
                         this.startValue=0
                         this.endValue=8
                     }
                     this.updateChart()
                 },2000)
            }

        }   ,

        name: "Rank"
    }
</script>

<style scoped>

</style>