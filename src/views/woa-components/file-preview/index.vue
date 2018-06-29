<template>
    <div style="position: absolute; left: 5px; top: 5px;width: 100%">
        <!-- 11111111111111111 -->
        <a id="viewerPlaceHolder" style="width: auto; height: 700px; display: block;"></a>
    </div>
</template>


<script>
import * as flexpaper from './js/flexpaper_flash';
// import * as swf from './js/swfobject';
import 'jquery'

export default {
    data(){
        return{

        }
    },
    methods:{
        preview(res){
			var swfVersionStr = "10.0.0";
			var xiSwfUrlStr = "playerProductInstall.swf";
			var flashvars = new FlexPaperViewer(
			'plug-in/Flexpaper/FlexPaperViewer', 'viewerPlaceHolder', {
				config : {
					//SwfFile : escape('${swfpath}'),//编码设置  
					// SwfFile : escape('/context/tt.swf'),//编码设置  
					SwfFile: escape(res),
					Scale : 0.6,
					ZoomTransition : 'easeOut',//变焦过渡  
					ZoomTime : 0.5,
					ZoomInterval : 0.2,//缩放滑块-移动的缩放基础[工具栏]  
					FitPageOnLoad : true,//自适应页面  
					FitWidthOnLoad : true,//自适应宽度  
					FullScreenAsMaxWindow : false,//全屏按钮-新页面全屏[工具栏]  
					ProgressiveLoading : true,//分割加载  
					MinZoomSize : 0.2,//最小缩放  
					MaxZoomSize : 3,//最大缩放  
					SearchMatchAll : true,
					InitViewMode : 'Portrait',//初始显示模式(SinglePage,TwoPage,Portrait)  
					ViewModeToolsVisible : true,//显示模式工具栏是否显示  
					ZoomToolsVisible : true,//缩放工具栏是否显示  
					NavToolsVisible : true,//跳页工具栏  
					CursorToolsVisible : false,
					SearchToolsVisible : true,
					PrintPaperAsBitmap : false,
					localeChain : 'zh_CN'
				}
        })
        // this.init()
    },
    init(){
            var params = {}
			params.quality = "high";
			params.bgcolor = "#ffffff";
			params.allowscriptaccess = "sameDomain";
			params.allowfullscreen = "true";
			var attributes = {};
			attributes.id = "FlexPaperViewer";
			attributes.name = "FlexPaperViewer";
			swfobject.embedSWF("FlexPaperViewer.swf", "flashContent", "650","500", swfVersionStr, xiSwfUrlStr, flashvars, params,attributes);
			swfobject.createCSS("#flashContent","display:block;text-align:left;");
        }
    },
    mounted(){
        this.preview()
    }
}
</script>
