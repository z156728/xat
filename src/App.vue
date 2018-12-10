<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /*初始化样式*/
  html,body,#app {height: 100%;overflow-y: auto;}
  body,textarea {
    font-size: 0.15rem;
    margin: 0;
    padding: 0;
    color: #474747;
    font-family: "微软雅黑", "arial", "verdana";
    overflow: hidden;
  }

  ul, li, p, h1, h2, h3, h4, h5, h6, dl, dt, dd {
    margin: 0;
    padding: 0;
    list-style: none;
  }
img{
  vertical-align: middle;
}
  .lf {
    float: left;
  }

  .rt {
    float: right;
  }

  a{
    text-decoration:none;
    color:#474747;
  }
  input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
    color:#999999;
  }
  input::-moz-placeholder,textarea::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#999999;
  }
  input:-moz-placeholder,textarea:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#999999;
  }
  input:-ms-input-placeholder,textarea:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#999999;
  }
  /*解决子元素浮动后父元素高度为0问题*/
  .clear:after{
    content:"";/*生成空内容*/
    display:block;/*变为块级*/
    clear:both;/*清楚浮动影响*/
  }
  /*解决上外边距溢出问题  对子元素设置上外边距 会作用到父元素上*/
  .margintop-overflow:before{
    content:"";/*生成空内容*/
    display:table;/*表现形式为table*/
  }
  .bgf7{
    height:100%;
    /*background: #F7F7F7;*/
  }
  .main{
    width: 3.45rem;
    margin: 0 auto;
  }
  .height10{
    height: 0.1rem;
    background: #F7F7F7;
  }
  .quesheng{
  	text-align: center;
  }
  .quesheng>div{
  	margin-top: 45%;
  }
  .quesheng img{
  	width: 50%;
  	height: 50%;
  }
  .quesheng p{
  	font-size: .15rem;
  	color: #999;
  }
  .show_msg {
		width: 5rem;
		height: 0.35rem;
		text-align: center;
		position: fixed;
		z-index: 999;
		bottom: 20%;
		left: -15%;
		display: none;
	}
	.show_span {
		width: 1.5rem;
		height: .35rem;
		display: inline-block;
		padding: 0 15px;
		line-height: .35rem;
		background: rgba(0, 0, 0, 0.7);
		border-radius: .1rem;
		color: #fff;
		font-size: .15rem;
	}
	*{
		-webkit-touch-callout:none; /*系统默认菜单被禁用*/
		-webkit-user-select:none; /*webkit浏览器*/
		-khtml-user-select:none; /*早期浏览器*/
		-moz-user-select:none;/*火狐*/
		-ms-user-select:none; /*IE10*/
		user-select:none;
	}
	input {
		-webkit-user-select:auto; /*webkit浏览器*/
	}
	textarea {                                                            
		-webkit-user-select:auto; /*webkit浏览器*/
	}
</style>
