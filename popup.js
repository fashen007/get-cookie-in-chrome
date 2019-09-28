var background = chrome.extension.getBackgroundPage()
var defaultOpt = localStorage.getItem('ruleForm')
chrome.cookies.getAll({}, function (cookies) {
  console.log(cookies)
})
// new Vue({
//   el: '#app',
//   data() {
//     return {
//       updateTime: '',
//       ruleForm: Object.assign({
//         url: '',
//         interval: 0,
//         times: '轮询',
//         rootSite: ''
//       }, defaultOpt ? JSON.parse(defaultOpt): {}),
//     };
//   },
//   mounted () {
//     let self = this
//     chrome.runtime.onMessage.addListener(function (data) {
//       console.log('data', data)
//       if (data.type === 'send') {
//         if (data.code === -1) {
//           self.$message({
//             type: 'error',
//             message: data.info.msg
//           })
//           return
//         }
//         self.timeDown()
//         self.$message({
//           type: 'success',
//           message: '设置成功了'
//         })
//       }
//     })
//   },
//   methods: {
//     timeDown (val) {
//       this.updateTime = ''
//       let minute = Number(val) - 1
//       let allSecond = minute * 60
//       let timer = setInterval(() => {
//         if (allSecond > 0) {
//           let minute = parseInt(allSecond / 60)
//           let seconde = allSecond % 60
//           this.updateTime = `将在${minute}分钟 ${seconde}秒后从新发起请求`
//           allSecond -- 
//         } else {
//           clearInterval(timer)
//           timer = null
//         }
//       }, 1000)
//     },
//     submitForm(formName) {
//       this.$refs[formName].validate((valid) => {
//         if (valid) {
//           localStorage.setItem('ruleForm', JSON.stringify(this.ruleForm))
//           background.start(this.ruleForm)
//           return false;
//         }
//       });
//     },
//     resetForm(formName) {
//       this.$refs[formName].resetFields();
//     }
//   }
// })