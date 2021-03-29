const gate = require("./gate")
let req = {"pkgLen":50,"mainCmd":5,"paraCmd":4,"dataLen":46,"data":{"data":{"songId":80006,"mode":1,"difficulty":3,"playData":{"finishLevel":4,"score":976227,"combo":640,"isFullCombo":0,"maxPercent":9708,"miss":3,"just":36,"life":10000,"accuracy":9668,"isAllMax":0},"totalScore":976227,"total4KScore":976227}}}


gate.dispatch(req, "output", "now", 3);