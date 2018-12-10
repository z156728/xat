import Vue from 'vue'
import Router from 'vue-router'
import classcircle from '@/components/classcircle'//家长 教师 H5班级圈//////////////////////！！！！！！！！！！！！！
import attenddetail from '@/components/attenddetail'//家长 教师 H5在校考勤详情//////////////
import homework from '@/components/homework'//家长 H5查看作业
import applydetail from '@/components/applydetail'//家长 H5申请详情
import vote from '@/components/vote'//家长 H5投票
import schoolattend from '@/components/schoolattend'//教师 H5在校考勤（家长的被写了）
import newapply from '@/components/newapply'//家长 H5新申请
import applylist from '@/components/applylist'//家长 教师 H5申请列表///////////////////////////！！！！！！！！！！！！！！！
import tiedcard from '@/components/tiedcard'//家长  教师 H5绑卡详情/////////////////////////！！！！！！！！
import repcardrecord from '@/components/repcardrecord'//家长 H5补卡记录??????????????
import foodmenu from '@/components/foodmenu'//家长 H5菜谱
import resultquery from '@/components/resultquery'//家长 H5成绩查询
import resultdetail from '@/components/resultdetail'//家长 H5成绩详情
import discoverdetail from '@/components/discoverdetail'//家长 H5发现详情
import paymentrecord from '@/components/paymentrecord'//家长 H5缴费记录
import myapply from '@/components/myapply'//家长 H5我的申请
import studentinfo from '@/components/studentinfo'//家长 H5学生信息
import schoolintro from '@/components/schoolintro'//家长 H5学校介绍
import applysupplecard from '@/components/applysupplecard'//家长 H5申请补卡///////////！！！！！！！！
import applyrecord from '@/components/applyrecord'//家长 教师 H5申请记录///////////////////！！！！！！！！改成教师拉到把
import choiceapprover from '@/components/choiceapprover'//教师 H5  部门人员列表
import choicedepart from '@/components/choicedepart'//教师 H5 选择部门
import newslist from '@/components/newslist'//教师 H5 全部新闻
import newsdetail from '@/components/newsdetail'//教师 H5 校园驿站详情
import foodmenustate from '@/components/foodmenustate'//教师 H5菜谱状态
import schoolbusapply from '@/components/schoolbusapply'//教师 H5加入校车申请
import teachernewapply from '@/components/teachernewapply'//教师 H5新申请
import parentDownload from '@/components/parentDownload'//家长H5提示下载
import teacherDownload from '@/components/teacherDownload'//教师H5提示下载
import teacherApplyDetail from '@/components/teacherApplyDetail'//教师端申请的详情
import parentsApplys from '@/components/parentsApplys'//家长端申请的详情
///二次修改的页面
import classCircles from '@/components/classCircles'//班级圈~新
import teaclassCircleDetail from '@/components/teaclassCircleDetail'//教师班级圈详情~新
import parclassCircleDetail from '@/components/parclassCircleDetail'//家长班级圈详情~新
import submissionFeedback from '@/components/submissionFeedback' //家长提交反馈~新
import finishHomework from '@/components/finishHomework' //家长完成作业~新
import parStudentDetail from '@/components/parStudentDetail' //家长学生信息~新
import schoolNotice from '@/components/schoolNotice' //家长  学校通知~新
import parentReply from '@/components/parentReply' //教师  家长回复~新
import readed from '@/components/readed' //教师  家长已阅~新
import teaCardDetail from '@/components/teaCardDetail' //教师  考勤卡号详情~新
import xatPolicy from '@/components/xatPolicy' //校安通隐私政策~新
import resultdetailnew from '@/components/resultdetailnew' //成绩详情查询~新
import teaApplyRecord from '@/components/teaApplyRecord' //教师补卡申请记录~新


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/classcircle/:classcircles',
      name: 'classcircle',
      component: classcircle,
      meta: {
        title: '班级圈'
      }
    },
    {
      path: '/attenddetail/:attenddetails',
      name: 'attenddetail',
      component: attenddetail,
      meta: {
        title: '考勤详情'
      }
    },
    {
      path: '/homework/:homeworks',
      name: 'homework',
      component: homework,
      meta: {
        title: '作业'
      }
    },
    {
      path: '/applydetail/:applyDetails',
      name: 'applydetail',
      component: applydetail,
      meta: {
        title: '申请详情'
      }
    },
    {
      path: '/vote/:votes',
      name: 'vote',
      component: vote,
      meta: {
        title: '投票'
      }
    },
    {
      path: '/schoolattend/:attends',
      name: 'schoolattend',
      component: schoolattend,
      meta: {
        title: '在校考勤'
      }
    },
    {
      path: '/newapply/:newsApply',
      name: 'newapply',
      component: newapply,
      meta: {
        title: '新申请'
      }
    },
    {
      path: '/applylist/:applyParam',
      name: 'applylist',
      component: applylist,
      meta: {
        title: '申请'
      }
    },
    {
      path: '/tiedcard/:tiedCards',
      name: 'tiedcard',
      component: tiedcard,
      meta: {
        title: '绑卡详情'
      }
    },
    {
      path: '/repcardrecord/:repCardRecords',
      name: 'repcardrecord',
      component: repcardrecord,
      meta: {
        title: '补卡记录'
      }
    },
    {
      path: '/foodmenu/:foodMenus',
      name: 'foodmenu',
      component: foodmenu,
      meta: {
        title: '菜谱'
      }
    },
    {
      path: '/resultquery/:resultQuerys',
      name: 'resultquery',
      component: resultquery,
      meta: {
        title: '成绩查询'
      }
    },
    {
      path: '/resultdetail/:resultDetails',
      name: 'resultdetail',
      component: resultdetail,
      meta: {
        title: '成绩详情'
      }
    },
    {
      path: '/discoverdetail/:discoverDetails',
      name: 'discoverdetail',
      component: discoverdetail,
      meta: {
        title: '发现详情'
      }
    },
    {
      path: '/paymentrecord/:prama',
      name: 'paymentrecord',
      component: paymentrecord,
      meta: {
        title: '缴费记录'
      }
    },
    {
      path: '/myapply/:myApplys',
      name: 'myapply',
      component: myapply,
      meta: {
        title: '我的申请'
      }
    },
    {
      path: '/studentinfo/:studentInfos',
      name: 'studentinfo',
      component: studentinfo,
      meta: {
        title: '学生信息'
      }
    },
    {
      path: '/schoolintro/:schoolIntros',
      name: 'schoolintro',
      component: schoolintro,
      meta: {
        title: '学校介绍'
      }
    },
    {
      path: '/applysupplecard/:applySuppleCard',
      name: 'applysupplecard',
      component: applysupplecard,
      meta: {
        title: '申请补卡'
      }
    },
    {
      path: '/applyrecord/:appylRecords',
      name: 'applyrecord',
      component: applyrecord,
      meta: {
        title: '申请记录'
      }
    },
    {
      path: '/choiceapprover/:choiceApprovers',
      name: 'choiceapprover',
      component: choiceapprover,
      meta: {
        title: '部门人员列表'
      }
    },
    {
      path: '/choicedepart/:choiceDeparts',
      name: 'choicedepart',
      component: choicedepart,
      meta: {
        title: '选择部门'
      }
    },
    {
      path: '/newslist/:parame',
      name: 'newslist',
      component: newslist,
      meta: {
        title: '校园驿站'
      }
    },
    {
      path: '/newsdetail/:newsDetails',
      name: 'newsdetail',
      component: newsdetail,
      meta: {
        title: '校园驿站详情'
      }
    },
    {
      path: '/foodmenustate/:foodMenuStates',
      name: 'foodmenustate',
      component: foodmenustate,
      meta: {
        title: '菜谱状态'
      }
    },
    {
      path: '/schoolbusapply/:schoolBusApplys',
      name: 'schoolbusapply',
      component: schoolbusapply,
      meta: {
        title: '加入校车申请'
      }
    },
    {
      path: '/teachernewapply/:teacherNewApplys',
      name: 'teachernewapply',
      component: teachernewapply,
      meta: {
        title: '新申请'
      }
    },
    {
      path: '/parentDownload',
      name: 'parentDownload',
      component: parentDownload,
      meta: {
        title: '家长下载'
      }
    },
    {
      path: '/teacherDownload',
      name: 'teacherDownload',
      component: teacherDownload,
      meta: {
        title: '教师下载'
      }
    },
    {
      path: '/teacherApplyDetail/:teacherApplyDetails',
      name: 'teacherApplyDetail',
      component: teacherApplyDetail,
      meta: {
        title: '教师申请详情'
      }
    },
    {
      path: '/parentsApplys/:parentsApplyss',
      name: 'parentsApplys',
      component: parentsApplys,
      meta: {
        title: '我的申请'
      }
    },
    {
      path: '/classCircles/:classCircless',
      name: 'classCircles',
      component: classCircles,
      meta: {
        title: '班级圈'
      }
    },
    {
      path: '/teaclassCircleDetail/:teaClassCircleDetails',
      name: 'teaclassCircleDetail',
      component: teaclassCircleDetail,
      meta: {
        title: '班级圈详情'
      }
    },
    {
      path: '/parclassCircleDetail/:parClassCircleDetails',
      name: 'parclassCircleDetail',
      component: parclassCircleDetail,
      meta: {
        title: '班级圈详情'
      }
    },
    {
      path: '/submissionFeedback/:submissionFeedbacks',
      name: 'submissionFeedback',
      component: submissionFeedback,
      meta: {
        title: '提交反馈'
      }
    },
    {
      path: '/finishHomework/:finishHomeworks',
      name: 'finishHomework',
      component: finishHomework,
      meta: {
        title: '完成作业'
      }
    },
    {
      path: '/parStudentDetail/:studentDetails',
      name: 'parStudentDetail',
      component: parStudentDetail,
      meta: {
        title: '学生信息'
      }
    },
    {
      path: '/parentReply/:parentReplys',
      name: 'parentReply',
      component: parentReply,
      meta: {
        title: '家长回复'
      }
    },
    {
      path: '/readed/:reads',
      name: 'readed',
      component: readed,
      meta: {
        title: '家长已阅'
      }
    },
    {
      path: '/teaCardDetail/:teaCardDetails',
      name: 'teaCardDetail',
      component: teaCardDetail,
      meta: {
        title: '卡号详情'
      }
    },
    {
      path: '/schoolNotice/:notice',
      name: 'schoolNotice',
      component: schoolNotice,
      meta: {
        title: '学校通知'
      }
    },
    {
      path: '/xatPolicy',
      name: 'xatPolicy',
      component: xatPolicy,
      meta: {
        title: '校安通隐私政策'
      }
    },
    {
      path: '/resultdetailnew/:resultdetailnews',
      name: 'resultdetailnew',
      component: resultdetailnew,
      meta: {
        title: '新成绩详情'
      }
    },
    {
      path: '/teaApplyRecord/:teaApplyRecords',
      name: 'teaApplyRecord',
      component: teaApplyRecord,
      meta: {
        title: '申请记录'
      }
    }
    
  ]
})

