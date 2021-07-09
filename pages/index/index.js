// pages/index/index.js
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
                url: '../handleArea/handleArea1',
            })
        }
    },
    r(max, int) {
        return int == 'int' ? Math.floor((Math.random() * max) + 1) : Math.random() * max
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
            class Ball {
                constructor(x, y) {
                    this.positionX = x
                    this.positionY = y
                    this.r = Math.floor((Math.random() * 50 + 30) + 1)
                    this.speedX = Math.random() * 20 + 10
                    this.speedY = Math.random() * 20 + 10
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
                    if (this.positionX + this.speedX + this.r > res[0].node.width || this.positionX + this.speedX < this.r) this.speedX = -this.speedX
                    if (this.positionY + this.speedY + this.r > res[0].node.height || this.positionY + this.speedY < this.r) this.speedY = -this.speedY
                }

            }
            // 小球运动
            let ballGroup = []
            for (let index = 0; index < 40; index++) {
                ballGroup[index] = new Ball(200, 200)
            }
            setInterval(() => {
                ctx.clearRect(0, 0, res[0].node.width, res[0].node.height);
                for (let index = 0; index < ballGroup.length; index++) {
                    ballGroup[index].ballMove()
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