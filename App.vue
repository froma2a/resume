<script>
	
import options from './components/echarts/options.js';
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			options,
		}
	}
</script>

<style>
	/*每个页面公共css */

	*{
		-webkit-overflow-scrolling: touch;
		box-sizing: border-box;
	}
	html,body{
		width: 100%;
		height: 100%;
		-webkit-overflow-scrolling: touch;
	}
	uni-page-body{
		width: 100%;
		height: 100%;
		-webkit-overflow-scrolling: touch;
	}
		html,body,#app,.wx-pages{
	    padding: 0;
	      margin: 0;
	    -webkit-overflow-scrolling: touch;
		}
</style>
