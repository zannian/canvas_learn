// pages/pxOperation/pxOperation.js
const {
    drawLine,
    drawArc
} = require('../../utils/canvasTool')
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    tap(e) {
        const screenWidth = wx.getSystemInfoSync().screenWidth
        if (e.detail.x < 200) {
            wx.navigateBack()
        } else if (e.detail.x > screenWidth - 200) {
            wx.navigateTo({
                url: '../physical/physical',
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.createSelectorQuery().select('#myCanvas').fields({
            node: true,
            size: true,
        }).exec((res) => {
            // 初始化全屏 canvas
            const ctx = res[0].node.getContext('2d')
            const width = res[0].width
            const height = res[0].height
            const dpr = wx.getSystemInfoSync().pixelRatio
            const maxWidth = width * dpr
            const maxHeight = height * dpr
            res[0].node.width = width * dpr
            res[0].node.height = height * dpr
            let x = 100
            let y = 100
            let r = 100
            let a = 500
            let b = 100
            let i = 0
            let gradient = ctx.createLinearGradient(0, 0, maxWidth, maxHeight);
            gradient.addColorStop((maxWidth / 2 - a - r) / maxWidth, "#2a3570");
            gradient.addColorStop((maxWidth / 2 - a / 2) / maxWidth, "#3e276a");
            gradient.addColorStop(.5, "#a03a78");
            gradient.addColorStop((maxWidth / 2 + a + r) / maxWidth, "#71dbff");
            ctx.fillStyle = gradient
            setInterval(() => {
                ctx.clearRect(0, 0, width * dpr, height * dpr);
                ctx.beginPath();
                x = width * dpr / 2 + a * Math.cos(i)
                y = height * dpr / 2 + b * Math.sin(i)
                ctx.moveTo(x, y)
                ctx.strokeStyle = '#999';
                ctx.lineWidth = 6
                for (let angle = 0; angle < 2 * Math.PI; angle += .1) {
                    x = width * dpr / 2 + a * Math.cos(angle + i)
                    y = height * dpr / 2 + b * Math.sin(angle + i)
                    ctx.lineTo(x, y)
                }
                ctx.closePath()
                ctx.stroke()
                // 模拟3d效果
                r = 100 + 30 * Math.sin(i)
                drawArc(ctx, x, y, r, 0, Math.PI * 2, true, 'skyblue', 4, "inset", gradient)
                i += .1
            }, 40)
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})