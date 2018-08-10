define([],()=>{

    return {
        runTplLoading: function () {
            $("#mytpl_tier").show();
            $(".tpl_loadingBox").show();
        },
        //关闭loading
        stopTplLoading: function () {
            $("#mytpl_tier").hide();
            $(".tpl_loadingBox").hide();
        },
        

    }

});