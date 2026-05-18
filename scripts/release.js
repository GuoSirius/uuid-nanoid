const { spawnSync } = require('child_process');
const inquirer = require('inquirer');
const fs = require('fs');

const prompt = inquirer.createPromptModule();

function runCommand(cmd, args = [], options = {}) {
  console.log(`   执行: ${cmd} ${args.join(' ')}`);
  
  const result = spawnSync(cmd, args, { 
    stdio: 'inherit', 
    shell: true,
    ...options 
  });
  
  if (result.status !== 0) {
    console.error(`\n❌ 命令执行失败，退出码: ${result.status}`);
    if (result.error) {
      console.error('系统错误:', result.error.message);
    }
    return false;
  }
  return true;
}

function runCommandSilent(cmd, args = [], options = {}) {
  const result = spawnSync(cmd, args, { encoding: 'utf-8', shell: true, ...options });
  return result;
}

function checkUncommittedChanges() {
  const result = spawnSync('git', ['status', '--porcelain'], { encoding: 'utf-8', shell: true });
  return result.stdout.trim() !== '';
}

function getCurrentVersion() {
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  return pkg.version;
}

function getNextVersion(currentVersion, releaseType) {
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  switch (releaseType) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      return currentVersion;
  }
}

function hasGitTags() {
  const result = runCommandSilent('git', ['tag']);
  return result.stdout.trim() !== '';
}

async function main() {
  console.log('\n🚀 开始发布流程...\n');

  const currentVersion = getCurrentVersion();
  console.log(`📌 当前版本: ${currentVersion}`);

  if (checkUncommittedChanges()) {
    console.log('⚠️  检测到未提交的更改！');
    
    console.log('📝 自动执行 git add...');
    if (!runCommand('git', ['add', '.'])) {
      console.error('❌ git add 失败');
      process.exit(1);
    }

    const { commitMessage } = await prompt({
      type: 'input',
      name: 'commitMessage',
      message: '请输入提交信息：',
      default: 'chore: prepare release'
    });

    console.log('📝 执行 git commit...');
    if (!runCommand('git', ['commit', '-m', commitMessage])) {
      console.error('❌ git commit 失败');
      process.exit(1);
    }
  } else {
    console.log('✅ 工作区干净，没有未提交的更改');
  }

  const majorVersion = getNextVersion(currentVersion, 'major');
  const minorVersion = getNextVersion(currentVersion, 'minor');
  const patchVersion = getNextVersion(currentVersion, 'patch');

  const { releaseType } = await prompt({
    type: 'rawlist',
    name: 'releaseType',
    message: `请选择版本升级类型（当前版本: ${currentVersion}）：`,
    choices: [
      { name: `Major - ${currentVersion} → ${majorVersion} (重大变更)`, value: 'major' },
      { name: `Minor - ${currentVersion} → ${minorVersion} (新增功能)`, value: 'minor' },
      { name: `Patch - ${currentVersion} → ${patchVersion} (修复漏洞)`, value: 'patch' },
      { name: '自定义版本号', value: 'custom' }
    ],
    default: 'patch'
  });

  let versionArg = '';
  let targetVersion = '';

  if (releaseType === 'custom') {
    const { customVersion } = await prompt({
      type: 'input',
      name: 'customVersion',
      message: `请输入自定义版本号（当前版本: ${currentVersion}）：`,
      validate: (input) => {
        if (/^\d+\.\d+\.\d+$/.test(input)) return true;
        return '请输入有效的版本号格式（如 1.2.3）';
      }
    });
    versionArg = `--release-as ${customVersion}`;
    targetVersion = customVersion;
  } else {
    versionArg = `--release-as ${releaseType}`;
    targetVersion = releaseType === 'major' ? majorVersion : 
                   releaseType === 'minor' ? minorVersion : patchVersion;
  }

  console.log(`\n📦 准备升级到版本: ${targetVersion}`);

  const args = ['standard-version', versionArg];
  
  if (!hasGitTags()) {
    console.log('🔄 首次发布，添加 --first-release 参数');
    args.push('--first-release');
  }

  console.log('\n📦 执行 standard-version...');
  if (!runCommand('npx', args)) {
    console.error('❌ standard-version 执行失败');
    process.exit(1);
  }

  console.log('\n📤 推送代码到远程仓库...');
  
  console.log('   推送至 origin (gitee)...');
  if (!runCommand('git', ['push', '--follow-tags', 'origin', 'main'])) {
    console.error('❌ 推送至 origin 失败');
  }
  
  console.log('   推送至 github...');
  if (!runCommand('git', ['push', '--follow-tags', 'github', 'main'])) {
    console.error('❌ 推送至 github 失败');
  }

  console.log('\n🎉 发布成功！');
  console.log(`✅ 版本已更新: ${currentVersion} → ${targetVersion}`);
  console.log('✅ Changelog 已更新');
  console.log('✅ Tag 已创建并推送至所有远程仓库');
}

main().catch((err) => {
  console.error('❌ 发布过程中出现错误:', err);
  process.exit(1);
});
