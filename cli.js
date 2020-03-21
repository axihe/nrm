const { exit, printErr } = require('./exit');
const setCustomRegistry = require('./set-custom-registry/index')
const program = require('commander');
const PKG = require('./package.json');

// 命令行
program
  .version(PKG.version);

program
  .command('ls')
  .description('显示所有可选仓库源')
  .action(demo);

program
  .command('current')
  .option('-u, --show-url', 'Show the registry URL instead of the name')
  .description('显示当前的注册表名称或URL')
  .action(demo);

program
  .command('use <registry>')
  .description('选择一个仓库源')
  .action(demo);

program
  .command('add <registry> <url> [home]')
  .description('添加一个仓库源')
  .action(demo);

program
  .command('del <registry>')
  .description('删除一个仓库源')
  .action(demo);

program
  .command('test [registry]')
  .description('显示指定或所有仓库源的响应时间')
  .action(demo);

program
  .command('home <registry> [browser]')
  .description('浏览器打开指定仓库源的主页')
  .action(demo);

program
  .command('login <registryName> [value]')
  .option('-a, --always-auth', 'Set is always auth')
  .option('-u, --username <username>', 'Your user name for this registry')
  .option('-p, --password <password>', 'Your password for this registry')
  .option('-e, --email <email>', 'Your email for this registry')
  .description('使用base64编码的字符串或用户名和密码设置自定义注册表的授权信息')
  .action(demo);

program
  .command('set-hosted-repo <registry> <value>')
  .description('设置用于自定义仓库源的托管npm存储库以发布程序包')
  .action(demo);

program
  .command('set-scope <scopeName> <value>')
  .description('将私有域与仓库源关联')
  .action(demo);

program
  .command('del-scope <scopeName>')
  .description('移除私有域')
  .action(demo);

program
  .command('set <registryName>')
  .option('-a,--attr <attr>', 'set custorm registry attribute')
  .option('-v,--value <value>', 'set custorm registry value')
  .description('设置自定义仓库源属性')
  .action(demo);
program
  .command('rename <registryName> <newName>')
  .description('设置自定义仓库源名称')
  .action(demo);



program
  .command('publish [<tarball>|<folder>]')
  .option('-t, --tag [tag]', 'Add tag')
  .option('-a, --access <public|restricted>', 'Set access')
  .option('-o, --otp [otpcode]', 'Set otpcode')
  .option('-dr, --dry-run', 'Set is dry run')
  .description('如果当前注册表是自定义注册表，则将程序包发布到当前注册表。\n如果您不使用自定义注册表，则此命令将直接运行')
  .action(demo);

program
  .command('help', { isDefault: true })
  .description('如果要在卸载时清除NRM配置，可以执行 "npm uninstall nrm -g -C" ')
  .action(function () {
    program.outputHelp();
  });

program
  .parse(process.argv);


if (process.argv.length === 2) {
  program.outputHelp();
}

function demo (arg1, arg2, arg3) {
  console.log(`
  接收到的信息
    第1参数: ${arg1}
    第2参数: ${arg2}
    第3参数: ${arg3}
  `)
}

function cleanRegistry () {
  setCustomRegistry('', function (err) {
    if (err) {
      exit(err);
    }
    onUse('npm')
  })
}
module.exports = {
  cleanRegistry,
  errExit: exit
}