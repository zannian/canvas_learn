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
            wx.reLaunch({
                url: '../pxOperation/pxOperation',
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
            res[0].node.width = width * dpr
            res[0].node.height = height * dpr
            let x = width * dpr / 2
            let y = height * dpr
            class Ball {
                constructor(x, y) {
                    this.positionX = x
                    this.positionY = y
                    this.r = Math.floor((Math.random() * 30 + 30) + 1)
                    this.speedX = Math.random() * 30 - 15
                    this.speedY = Math.random() * 20 - 40
                    this.fillColor = '#' + Math.floor(Math.random() * 0xffffff + 1).toString(16)
                }
                drawBall() {
                    drawArc(ctx, this.positionX, this.positionY, this.r, 0, 2 * Math.PI, true, this.fillColor, 0, 'inset', this.fillColor)
                }
                ballMove() {
                    this.drawBall()
                    this.positionX = this.positionX + this.speedX
                    this.positionY = this.positionY + this.speedY
                    // 边缘检测
                    // if (this.positionX + this.speedX + this.r > res[0].node.width || this.positionX + this.speedX < this.r) this.speedX = -this.speedX
                    // if (this.positionY + this.speedY + this.r > res[0].node.height || this.positionY + this.speedY < this.r) this.speedY = -this.speedY

                }
                reset() {
                    this.positionX = x
                    this.positionY = y
                    this.speedX = Math.random() * 15 * dpr - 15 * dpr / 2
                    this.speedY = Math.random() * 10 * dpr - 20 * dpr
                }
            }
            let balls = []
            for (let i = 0; i < 40; i++) {
                balls[i] = new Ball(x, y)
            }
            setInterval(() => {
                ctx.clearRect(0, 0, width * dpr, height * dpr)
                for (let i = 0; i < balls.length; i++) {
                    // 越界回收
                    if (balls[i].positionX + balls[i].speedX - balls[i].r > res[0].node.width || balls[i].positionX + balls[i].speedX < -balls[i].r) balls[i].reset()
                    if (balls[i].positionY + balls[i].speedY - balls[i].r > res[0].node.height || balls[i].positionY + balls[i].speedY < -balls[i].r) balls[i].reset()
                    balls[i].ballMove()
                    // 重力加速度
                    balls[i].speedY += 1
                }
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