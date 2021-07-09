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
        k: .1,
        g: 20,
        speed: 1,
        moveX: 0,
    },
    tap(e) {
        const screenWidth = wx.getSystemInfoSync().screenWidth
        if (e.detail.x < 200) {
            wx.navigateBack()
        } else if (e.detail.x > screenWidth - 200) {
            wx.navigateTo({
                url: '../index/index',
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
            this.moveY = 0
            this.moveX = 0
            let ropeLength = 200
            let k = .1
            let g = 20
            let nailPositionX = maxWidth / 2
            let nailPositionY = maxHeight / 2 - 200
            class Ball {
                constructor(x, y) {
                    this.positionX = x
                    this.positionY = y
                    this.r = 50
                    this.speedX = 0
                    this.speedY = 0
                    this.ax = k * (nailPositionX - this.positionX)
                    this.ay = k * (nailPositionY - this.positionY) + g
                    this.fillColor = '#' + Math.floor(Math.random() * 0xffffff + 1).toString(16)
                }
                drawBall() {
                    drawArc(ctx, this.positionX, this.positionY, this.r, 0, 2 * Math.PI, true, this.fillColor, 0, 'inset', this.fillColor)
                }
            }

            let ball = new Ball(nailPositionX, nailPositionY)
            // 画一个钉子
            setInterval(() => {
                g = this.data.g
                k = this.data.k
                ctx.clearRect(0, 0, maxWidth, maxHeight)
                ball.positionX += ball.speedX
                ball.positionY += ball.speedY
                if (this.moveY != 0 && this.moveX != 0) {
                    ball.positionX = this.moveX * dpr
                    ball.positionY = this.moveY * dpr
                }
                drawLine(ctx, nailPositionX, nailPositionY, ball.positionX, ball.positionY, 'red', 6)
                drawArc(ctx, nailPositionX, nailPositionY, 20, 0, Math.PI * 2, true, 'lightBlue', 30, 'inset', 'skyBlue')
                ball.drawBall()
                ball.ax = k * (nailPositionX - ball.positionX)
                ball.ay = k * (nailPositionY - ball.positionY) + g
                // 模拟空气阻力
                ball.speedX += ball.ax - ball.speedX / 50
                ball.speedY += ball.ay - ball.speedY / 50
                ball.speedX = ball.speedX * this.data.speed
                ball.speedY = ball.speedY * this.data.speed
            }, 20)
        })
    },
    touchStart(e) {
        this.moveX = e.touches[0].x
        this.moveY = e.touches[0].y
        this.setData({
            speed: 0,
            k: 0,
            g: 0
        })
    },
    touchMove(e) {
        this.moveX = e.touches[0].x
        this.moveY = e.touches[0].y
    },
    touchEnd(e) {
        this.moveX = 0
        this.moveY = 0
        this.setData({
            speed: 1,
            k: .1,
            g: 20
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