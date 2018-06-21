/*
* @Author: Marte
* @Date:   2018-06-16 15:20:36
* @Last Modified by:   Marte
* @Last Modified time: 2018-06-16 23:19:35
*/

/*'use strict';*/
var v = new Vue({
    el: '.commentArea',
    data: {
        comment: '',
        currentComments: [],
        comments: [{
            id: 123,
            publisher: "张三",
            content: 'hellow world',
            created_at: '2018年6月16日'
            }
        ],
        currentpage: 1,
        pageSize: 5,
        totalCount: 0,
    },
    methods: {
        publish: function() {
            if((this.comment.trim()) ==''){
                alert("评论不能为空");
                return;
            }
            var content = this.comment;
            var date = new Date();
            date = date.toLocaleString();
            var publisher = "LMH";

            var param = [];
            param.push({"id":456,"publisher":publisher,"content":content,"created_at":date});

            for(var i in this.comments){
                param.push(this.comments[i]);
            }
            this.comments = param;
            /*重新计算评论数*/
            this.totalCount++;

            this.getCurrentComments(this.currentpage);

            console.log(this.comments);
            console.log(this.totalCount);
        },
        commentsCount: function() {
            /*JSON长度*/
            var count = 0;
            for(var i in this.comments) {
                count++;
            }
            console.log(count);
            return count;
    },
        getCurrentComments: function(page) {
            this.currentComments = [];
            console.log("getCurrentComments");
            for(var i in this.comments) {
                console.log("traversal");
                if(i >= this.pageSize * (page - 1) && i < this.pageSize * page) {
                    this.currentComments.push(this.comments[i]);
                }
            }
        },
        /*if page is changed.*/
        handleCurrentChange: function(page) {
            /*如何实时更新*/
            this.currentpage = page;
            console.log(page);
            this.getCurrentComments(page);
        },
    },
    mounted: function() {
        /*实例加载完成后*/
        this.$nextTick(function(){
            /*this.commentsCount();*//*文档加载*/
            this.totalCount = this.commentsCount();
            this.getCurrentComments(1);
        });
    },
});