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
                url: '../round/round',
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

            let y
            let i = 0
            let gradient = ctx.createLinearGradient(0, 0, maxWidth, maxHeight);
            gradient.addColorStop(0, "#08b5ff");
            gradient.addColorStop(.5, "#b109ff");
            gradient.addColorStop(1, "#f44484");
            ctx.lineWidth = 6;
            ctx.strokeStyle = gradient
            let k = 0
            setInterval(() => {
                ctx.clearRect(0, 0, width * dpr, height * dpr);
                ctx.beginPath()
                ctx.moveTo(0, 0 * Math.sin(20 * i / 200) + height * dpr / 2)
                for (let x = 0; x < width * dpr; x++) {
                    k = x < maxWidth / 2 ? x / maxWidth * 2 : (maxWidth - x) / maxWidth * 2
                    y = k * 150 * Math.sin((2 * x - 30 * i) / 200) + height * dpr / 2
                    ctx.lineTo(x, y)
                }
                ctx.stroke()
                i++
            }, 20)

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