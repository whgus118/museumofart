const fs = require('fs');

const data = JSON.parse(fs.readFileSync('C:\\Users\\308\\.mcp-figma\\cache\\file_nodes_giv7zNQhUpbiHessc6bbFq_1778568935311.json', 'utf8'));

function traverse(node, depth = 0) {
    if (!node) return;
    const indent = '  '.repeat(depth);
    let info = `${indent}- ${node.name} (${node.type})`;
    if (node.type === 'TEXT') {
        info += ` => "${node.characters}"`;
    }
    if (node.absoluteBoundingBox) {
        const b = node.absoluteBoundingBox;
        info += ` [${b.width}x${b.height}]`;
    }
    // layout info
    if (node.layoutMode) {
        info += ` layout=${node.layoutMode}`;
    }
    if (node.paddingLeft || node.paddingTop || node.paddingRight || node.paddingBottom) {
        info += ` pad=[${node.paddingLeft||0},${node.paddingTop||0},${node.paddingRight||0},${node.paddingBottom||0}]`;
    }
    if (node.itemSpacing) {
        info += ` gap=${node.itemSpacing}`;
    }
    console.log(info);
    if (node.children && Array.isArray(node.children)) {
        node.children.forEach(child => traverse(child, depth + 1));
    }
}

Object.values(data.nodes).forEach(nodeData => {
    if (nodeData && nodeData.document) {
        traverse(nodeData.document);
    }
});
