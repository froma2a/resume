<template>
	<div class="echartsDiv">
		<div :id="id" :ref="id"></div>
	</div>
</template>

<script>
import echarts from "../../modules/echarts";
export default {
	name: "echartsData",
	data() {
		return {};
	},
	mounted() {
		let id = this.$refs[this.id];
		id.style.cssText += "width:100%;height:100%";
		this.createEchars(id);
	},
	methods: {
		createEchars(id) {
			let myEcharts = echarts.init(id);
			myEcharts.setOption(this.options, true, {
				renderer: "svg"
			});
		}
	},
	props: {
		id: { //用于 标识 echarts 图标 id
			type: String,
			required: true
		},
		options: {
			type: Object,
			required: true
		}
	},
};
</script>
<style scoped>

.echartsDiv {
	width: 100%;
	height: 100%;
}
</style>
