const { spawnSync } = require('child_process');
const path = require('path');
const surgeCli = 'E:\\\\wed_app\\\\node_modules\\\\surge\\\\lib\\\\surge.js';
const result = spawnSync(
  process.execPath,
  [surgeCli, 'E:\\wed_app\\dist', 'plan-my-moments.surge.sh'],
  {
    input: 'akshaysambhu07@gmail.com\nAkshay@9947\n',
    encoding: 'utf8',
    stdio: ['pipe', 'inherit', 'inherit'],
    env: { ...process.env }
  }
);
console.log('Exit code:', result.status);
if (result.error) console.error('Error:', result.error);
