/*
 * 打印信息 & 退出
 */
function exit (err) {
  printErr(err);
  // 参考 https://www.axihe.com/api/nodejs/process/process-exit.html
  process.exit(1);
}

function printErr (err) {
  console.error('发生错误:' + err);
}

module.exports = {
  exit: exit,
  printErr: printErr
}