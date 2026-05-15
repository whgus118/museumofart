import fs from 'fs';

const data = JSON.parse(fs.readFileSync('C:/Users/308/.mcp-figma/cache/file_nodes_giv7zNQhUpbiHessc6bbFq_1778810832728.json', 'utf8'));

function traverse(node, depth = 0) {
  let str = '  '.repeat(depth) + `- ${node.name} (${node.type})`;
  if (node.characters) {
    str += ` : "${node.characters.replace(/\n/g, '\\n')}"`;
  } else if (node.type === 'TEXT' && node.characters === undefined) {
    str += ` : [TEXT MISSING]`;
  }
  console.log(str);
  if (node.children) {
    node.children.forEach(child => traverse(child, depth + 1));
  }
}

const node = data.nodes['354:5479'].document;
traverse(node);
