<template>
    <div class="screen-container" >
        <header class="screen-header">
            <div class="title">
                <span class="s-title">医美2020大数据展示</span>

            </div>
            <div class="title-right">
                <span class="datafrom">(数据来源于新氧年度白皮书)</span>
            </div>
        </header>
        <div class="screen-body">
            <div class="screen-left">
                <div class="left-top"><Level></Level></div>
                <div class="left-center"><Plastic></Plastic></div>
                <div class="left-bottom"><Purchase></Purchase></div>
            </div>
            <div class="screen-center">
                <div class="center-top"><Map></Map></div>
                <div class="center-bottom"><Rank></Rank></div>
            </div>
            <div class="screen-right">
                <div class="right-top"><Doctor></Doctor></div>
                <div class="right-center"><Injection></Injection></div>
                <div class="right-bottom"><span>right-bottom</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ScreenPage"   ,
        components:{
            Hot,
            Doctor,
            Injection,
            Level,
            Map,
            Plastic,
            Rank,
            Seller,
            Stock,
            Trend ,
            Purchase
        }
    }

    import Doctor from "./DoctorPage";
    import Hot from "../components/Hot";
    import Injection from "../components/Injection";
    import Level from "../components/Level";
    import Map from "../components/Map";
    import Plastic from "../components/Plastic";
    import Rank from "../components/Rank";
    import Seller from "../components/Seller";
    import Stock from "../components/Stock";
    import Trend from "../components/Trend";
    import Purchase from "../components/purchase"
</script>

<style scoped>
      .screen-container{
          width: 100%;
          height: 100%;
          background-color: #0e192f;

      }
      .title {
          width: 100%;
          height: 28px;
          position: relative;
      }
      .s-title{
          position: absolute;
          left: 50%;
          top: 100%;
          transform: translate(-50%, -50%);
          font-size: 20px;
      }
    span{
        color: #e0e0e0;
    }
    .screen-body{
        display: flex;
    }
    .screen-left{
        flex: 2;
    }
    .screen-center{
        flex: 3;

    }
    .screen-right{
        flex: 2;
        }
    .left-top{
        width: 100%;
        height: 28%;
    }
    .left-center{
        width: 100%;
        height: 40%;
     
        margin-right: 10px;
    }
    .left-bottom{
        width: 100%;
        height: 35%;

        margin-right: 10px;
    }
    .center-top{
        width: 100%;
        height: 50%;
        margin-bottom: 10px;

    }
    .center-bottom{
        width: 100%;
        height: 53%;
    }
    .right-top{
        width: 100%;
        height: 150px;
    }
    .right-center{
        width: 100%;
        height: 150px;
    }
    .right-bottom{
        width: 100%;
        height: 300px;
    }
    .title-right .datafrom{
        color: #d0d0d0;
        font-size: 10px;
    }


</style>