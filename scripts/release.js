const { spawnSync } = require('child_process');
const inquirer = require('inquirer');

const prompt = inquirer.createPromptModule();

function runCommand(cmd, args = [], options = {}) {
  const result = spawnSync(cmd, args, { stdio: 'inherit', ...options });
  return result.status === 0;
}

function checkUncommittedChanges() {
  const result = spawnSync('git', ['status', '--porcelain'], { encoding: 'utf-8' });
  return result.stdout.trim() !== '';
}

async function main() {
  console.log('\n🚀 开始发布流程...\n');

  if (checkUncommittedChanges()) {
    console.log('⚠️  检测到未提交的更改！');
    const { commitChanges } = await prompt({
      type: 'confirm',
      name: 'commitChanges',
      message: '是否先提交这些更改？',
      default: true
    });

    if (commitChanges) {
      const { commitMessage } = await prompt({
        type: 'input',
        name: 'commitMessage',
        message: '请输入提交信息：',
        default: 'chore: prepare release'
      });

      console.log('\n📝 执行 git add...');
      if (!runCommand('git', ['add', '.'])) {
        console.error('❌ git add 失败');
        process.exit(1);
      }

      console.log('📝 执行 git commit...');
      if (!runCommand('git', ['commit', '-m', commitMessage])) {
        console.error('❌ git commit 失败');
        process.exit(1);
      }
    } else {
      console.log('⚠️  用户选择跳过提交，继续发布流程...');
    }
  }

  const { releaseType } = await prompt({
    type: 'list',
    name: 'releaseType',
    message: '请选择版本升级类型：',
    choices: [
      { name: 'Major (1.x.x → 2.0.0) - 重大变更', value: 'major' },
      { name: 'Minor (1.0.x → 1.1.0) - 新增功能', value: 'minor' },
      { name: 'Patch (1.0.0 → 1.0.1) - 修复漏洞', value: 'patch' },
      { name: '自定义版本号', value: 'custom' }
    ],
    default: 'patch'
  });

  let versionArg = '';
  if (releaseType === 'custom') {
    const { customVersion } = await prompt({
      type: 'input',
      name: 'customVersion',
      message: '请输入自定义版本号（如 2.1.0）：',
      validate: (input) => {
        if (/^\d+\.\d+\.\d+$/.test(input)) return true;
        return '请输入有效的版本号格式（如 1.2.3）';
      }
    });
    versionArg = `--release-as ${customVersion}`;
  } else {
    versionArg = `--release-as ${releaseType}`;
  }

  console.log('\n📦 执行 standard-version...');
  if (!runCommand('npx', ['standard-version', versionArg])) {
    console.error('❌ standard-version 执行失败');
    process.exit(1);
  }

  console.log('\n📤 推送代码到远程仓库...');
  if (!runCommand('git', ['push', '--follow-tags', 'origin', 'main'])) {
    console.error('❌ git push 失败');
    process.exit(1);
  }

  console.log('\n🎉 发布成功！');
  console.log('✅ 版本已更新');
  console.log('✅ Changelog 已更新');
  console.log('✅ Tag 已创建并推送');
}

main().catch((err) => {
  console.error('❌ 发布过程中出现错误:', err);
  process.exit(1);
});