<template>
  <div class="app-container">
    <div class="address-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="out-border">
            <div class="layout-title">后台项目</div>
            <div class="color-main address-content">
              <a href="">mall</a>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="out-border">
            <div class="layout-title">前端项目</div>
            <div class="color-main address-content">
              <a href="">mall-admin-web</a>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="out-border">
            <div class="layout-title">学习教程</div>
            <div class="color-main address-content">
              <a href="">mall-learning</a>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">今日订单总数</div>
            <div class="total-value">200</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon">
            <div class="total-title">今日销售总额</div>
            <div class="total-value">￥5000.00</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_yesterday_amount" class="total-icon">
            <div class="total-title">昨日销售总额</div>
            <div class="total-value">￥5000.00</div>
          </div>
        </el-col>

      </el-row>
    </div>
    <el-card class="mine-layout">
      <div style="text-align: center">
        <!--引入本地图片-->
        <img :src="weishushulogo" width="160" height="160" style="margin-top: 10px">

      </div>
      <div style="text-align: center">mall全套学习教程连载中！</div>
      <div style="text-align: center;margin-top: 5px"><span class="color-main">关注公号</span>，第一时间获取。</div>
    </el-card>
    <div class="un-handle-layout">
      <div class="layout-title">待处理事务</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待付款订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已完成订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待确认收货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待发货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">新缺货登记</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退款申请</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已发货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">广告位即将到期</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">商品总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">100</el-col>
                <el-col :span="6" class="color-danger overview-item-value">400</el-col>
                <el-col :span="6" class="color-danger overview-item-value">50</el-col>
                <el-col :span="6" class="color-danger overview-item-value">500</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">已下架</el-col>
                <el-col :span="6" class="overview-item-title">已上架</el-col>
                <el-col :span="6" class="overview-item-title">库存紧张</el-col>
                <el-col :span="6" class="overview-item-title">全部商品</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">用户总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">100</el-col>
                <el-col :span="6" class="color-danger overview-item-value">200</el-col>
                <el-col :span="6" class="color-danger overview-item-value">1000</el-col>
                <el-col :span="6" class="color-danger overview-item-value">5000</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                <el-col :span="6" class="overview-item-title">会员总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statistics-layout">
      <div class="layout-title">订单统计</div>
      <el-row>
        <el-col :span="5">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399;font-size: 14px">统计的操作选项</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">
                <template>
                  <el-select v-model="listQuery.type"  @change="tchange"
                             placeholder="请选择操作选项">
                    <el-option
                      v-for="item in options"
                      :key="item.logType"
                      :label="item.typeDesc"
                      :value="item.logType">
                    </el-option>

                  </el-select>
                </template>
              </div>
              <div>
                <span class="color-success" style="font-size: 14px">每(1-60)秒</span>
                <span style="color: #C0C4CC;font-size: 14px">取UV数据</span>
              </div>
            </div>
            <div style="margin-top: 10px;">
              <template>

                <el-tooltip class="item" effect="dark" content="每(1-60)秒取UV数据" placement="top">
                  <!--不能用this.listQuery 它是常量 this里面还没包含-->
                  <el-input-number v-model="listQuery.sec" size="small"
                                   :min="1" :max="60" label="描述文字"></el-input-number>
                </el-tooltip>
              </template>


            </div>
            <div style="margin-top: 20px;">


              <el-switch
                @change="schange"
                style="display: block"
                v-model="value2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="开始统计"
                inactive-text="结束统计">
              </el-switch>


            </div>
            <div style="margin-top: 80px;">


            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">50000</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div style="padding: 10px;border-left:1px solid #DCDFE6">
            <el-date-picker
              style="float: right;z-index: 1"
              size="small"
              v-model="rangeDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"

              :picker-options="pickerOptions">
            </el-date-picker>
            <div>
              <ve-histogram
                :data="chartData"
                :legend-visible="true"
                :loading="loading"
                :colors="chartColor"
                :data-empty="dataEmpty"
                :extend="chartExtend"
                :settings="chartSettings">

              </ve-histogram>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {
    uvList,uvTypeList,
  }from '@/api/uv'
  import {str2Date} from '@/utils/date';
  import img_home_order from '@/assets/images/home_order.png';
  import img_home_today_amount from '@/assets/images/home_today_amount.png';
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
  import weishushulogo from '@/assets/images/weishushu.jpg';
  const DATA_FROM_BACKEND = {
    columns: ['updateTime', 'count'],//字段
    rows: [//数据

    ]
  };
  const uvListQuery = {
    sec: 5,//频率 每秒扫描
    start: "",//开始日期
    end:"",//结束日期
    type: ""//查询类型
  };
  export default {
    name: 'home',
    data() {
      return {
        value2: false,
        listQuery: Object.assign({}, uvListQuery),
        options: [],
        rangeDate: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一月',
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        weishushulogo,
        orderCountDate: '',
        chartSettings: {
          xAxisType: 'time',
          area:true,
          axisSite: { right: ['updateTime']},
          labelMap: {'count': '访问次数'},

        },
        chartColor: ["#4f91f1"],
        chartExtend :{
          title: { text:  "", left: "center" },
          legend: {
            show: true,
            bottom: "bottom"
          },

        },
        chartData: {
          columns: [],
          rows: []
        },
        loading: false,
        dataEmpty: false,
        img_home_order,
        img_home_today_amount,
        img_home_yesterday_amount

      }
    },

    watch: {
      rangeDate: function (newVal, oldVal) {//监听日期选择变量
        if (newVal !== null) {
          this.listQuery.start =  newVal[0]
          this.listQuery.end =  newVal[1]
        } else {
          this.listQuery.start = null
          this.listQuery.end = null
        }
      }
    },

    created(){
      this.initOrderCountDate();
      this.getTypeList();
      //this.getUVData();
    },
    //销毁前清除定时器
    destroyed() {
      clearInterval(window.tongjiTimer);
      window.tongjiTimer=null;
    },
    methods:{
      ctongji(){
        clearTimeout(window.tongjiTimer)
      },
      schange(){
        if(this.listQuery.type.length==0){//判断是否为空
          this.$message.error('必须选择统计的操作类型');
          this.value2=false
          return;
        }
        if(this.value2){//开始统计
          this.tongji();
        }else{
          this.ctongji();
        }
      },
      tongji(){
        this.chartData = {
          columns: ['updateTime', 'count'],
          rows: []
        };
        console.log(this.listQuery)
        window.tongjiTimer = setInterval(() => {
          uvList(this.listQuery).then(response => {
            var list=response.data.list;
            console.log(list)
            this.chartData.rows=list;
          });
        }, this.listQuery.sec*1000);
      },
      tchange(value){
        console.log(value);
        this.chartExtend.title.text="["+this.options[value].typeDesc+"]UV数据统计";
      },
      getTypeList() {
        uvTypeList(this.listQuery).then(response => {
          this.options=response.data.list
          console.log( this.options);
          console.log(this.options[2].logType)
          this.logType = this.options[2].logType//默认选项
        });

      },
      initOrderCountDate(){
        let start = new Date();//当前日期
        start.setTime(start.getTime() - 1000 * 60 * 60 * 24 * 7);
        // start.setFullYear(2018);
        // start.setMonth(10);
        // start.setDate(1);
        const end = new Date();
        end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 7);
        this.rangeDate=[start,end];
      },

    }
  }
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }

  .address-layout {
  }

  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .mine-layout {
    position: absolute;
    right: 140px;
    top: 107px;
    width: 250px;
    height: 235px;
  }
  .address-content{
    padding: 20px;
    font-size: 18px
  }
</style>
