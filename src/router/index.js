import Vue from 'vue'
import VueRouter from 'vue-router'
import SellerPage from '../views/SellerPage'
import TrendPage from '../views/TrendPage'
import MapPage from '../views/MapPage'
import RankPage from '../views/RankPage'
import HotPage from '../views/HotPage'
import StockPage from '../views/StockPage'
import LevelPage from "../views/LevelPage";
import TestPage from "../views/TestPage";
import PlasticPage from "../views/PlasticPage";
import DoctorPage from "../views/DoctorPage";
import InjectionPage from "../views/InjectionPage";
import ScreenPage from "../views/ScreenPage";
import PurchasePage from "../views/PurchasePage";

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/sellerpage',
    component: SellerPage
  },
  {
    path: '/trendpage',
    component: TrendPage
  },
  {
    path: '/mappage',
    component: MapPage
  },
  {
    path: '/rankpage',
    component: RankPage
  },
  {
    path: '/hotpage',
    component: HotPage
  },
  {
    path: '/stockpage',
    component: StockPage
  }     ,
  {
    path: '/levelpage',
    component: LevelPage
  }     ,
  {
    path: '/testpage',
    component: TestPage
  }      ,
  {
    path: '/plasticpage',
    component: PlasticPage
  }       ,
  {
    path: '/doctorpage',
    component: DoctorPage
  }       ,
  {
    path: '/injectionpage',
    component:InjectionPage
  },
  {
    path: '/purchasepage',
    component:PurchasePage
  },

  {
    path: '/',
    redirect: '/screen'
  },
  {
    path: '/screen',
    component: ScreenPage
  }
]

const router = new VueRouter({
  routes
})

export default router
