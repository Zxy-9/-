<template>
    <div class="com-container">
        <div class="com-chart" ref="hot_ref"></div>
           <span class="iconfont arr-left" @click="toLeft" :style="comStyle">&#xe6ef;</span>
           <span class="iconfont arr-right" @click="toRight" :style="comStyle">&#xe6ed;</span>
        <span class="cat-name" :style="comStyle">{{catName}}</span>
    </div>
</template>

<script>
    export default {
        name: "Hot",
        data(){
            return {
                chartInstance:null,
                allData:null ,
                currentIndex:0,
                titleFontSize:0
            }
        }                   ,
        computed:{
             catName(){
                 if(!this.allData){
                     return ''
                 }           else{
                     return this.allData[this.currentIndex].name
                 }
             }  ,
            comStyle(){
                 return {
                     fontSize: this.titleFontSize+'px'
                 }
            }
        }   ,
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
                this.chartInstance = this.$echarts.init(this.$refs.hor_ref,'chalk')
                    const initOption={
                    title:{
                        text:'▎热销商品占比',
                        left:20,
                        top:20
                    },
                        legend:{
                        top:'15%',
                            icon:'circle'
                        },
                        tooltip:{
                        show:true,
                            formatter:arg=>{
                            const thirdCategory=arg.data.children
                                let total =0
                                thirdCategory.forEach(item=>{
                                   total+= item.value
                                })
                                let retStr =''
                                thirdCategory.forEach(item=>{
                                    retStr +=`${item.name}:${parseInt(item.value/total*100)+'%'}<br>`
                                })
                                return retStr

                            }
                   /*         trigger:'axis'*/
                        },
                    series:[
                        {
                            type:'pie' ,
                            label:{
                                show:false
                            } ,
                            emphasis:{
                                label:{
                                    show:true
                                }            ,
                                labelLine:{
                                    show:false
                                }
                            }
                        }
                    ]
                    }
                this.chartInstance.setOption(initOption)

             }        ,
           async   getData(){
                   const {data:ret}=await this.$http.get('hotproduct')
               this.allData=ret
               console.log(ret)
                   this.updateChart()
              }    ,
            updateChart(){
                  const legendData=this.allData[this.currentIndex].children.map(item=>{
                            return item.name
                  })
                const seriesData=this.allData[this.currentIndex].children.map(item=>{
                    return {
                        name:item.name,
                        value:item.value  ,
                        children:item.children
                    }
                })
            const dataOption={
                      legend:{
                          data:legendData   
                      },
                    series:[
                        {
                          data:seriesData
                        }
                    ]
            }
            this.chartInstance.setOption(dataOption)
            },
            screenAdapter(){
                 this.titleFontSize=this.$refs.hot_ref.offsetWidth/100*3
                const adapterOption={
                     title:{
                         textStyle:{
                             fontSize:this.titleFontSize
                         }
                     }      ,
                    legend:{
                         itemWidth:this.titleFontSize /2,
                        itemHeight:this.titleFontSize/2,
                        itemGap:this.titleFontSize/2,
                        textStyle:{
                             fontSize: this.titleFontSize/2
                        }
                    }                           ,
                    series:[{
                         radius:this.titleFontSize*4.5,
                        center:['50%','60%']
                    }]
                }
                this.chartInstance.setOption(adapterOption)
                this.chartInstance.resize()
            }   ,
            toLeft(){
                     this.currentIndex--
                if(this.currentIndex<0){
                    this.currentIndex =this.allData.length-1;
                }
                this.updateChart()
            }   ,
            toRight(){
            this.currentIndex++
                if (this.currentIndex>this.allData.length-1){
                    this.currentIndex=0
                }
                this.updateChart()
            }


        }       ,

    }

</script>

<style scoped>
      .arr-left{
          position: absolute;
          left: 10%;
          top: 50%;
          transform: translate(-50%);
          cursor: pointer;
          color: white;
      }
    .arr-right{
        position: absolute;
        right: 10%;
        top: 50%;
        transform: translate(-50%);
        cursor: pointer;
        color: white;

    }
    .cat-name{
        position: absolute;
        left: 80%;
        bottom: 20px;
        color: white;

    }
</style>