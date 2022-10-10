import rules from "./rules";
import { getReference, reset, separators } from "./globals";
import { Node } from "./Node";
import { parseRowAndCreateNode } from "./parseRowAndCreateNode";

export function parseEDIText(text) {
  reset();

  const textRows = text.split(separators.row);

  const result = Node.createNode("(ROOT)");
  const rootId = result.id;
  getReference(rootId).rule = {
    name: "(ROOT)",
    children: rules.base.slice(),
  };

  var parentNodeId = result.id;
  var row = 0;

  for (const textRow of textRows.filter((r) => !!r)) {
    row++;
    const node = parseRowAndCreateNode(textRow);

    // if the node is UNH (message header), find the corresponding message rule
    if (node.name === "UNH") appendMessageRule(node);

    const current = findCurrent(node, row, parentNodeId);

    const ref = getReference(node.id);
    ref.rule = current.rule;
    ref.parentId = current.parent.id;

    node.friendlyName = current.rule.friendlyName;

    current.parent.children.push(node);

    // current node becomes the new parent
    parentNodeId = node.id;
  }

  console.log(result);

  return result;

  function appendMessageRule(unhNode) {
    const ruleName = unhNode.segments[1].name.toLowerCase();
    const rulesToAdd = rules[ruleName];
    
    if (!rulesToAdd) {
      throw new Error(`No rule found for file of type "${ruleName}"`);
    }

    getReference(rootId).rule.children = [].concat(rules.base, rulesToAdd);
  }
}

function findCurrent(node, row, parentNodeId) {
  var parentRef = getReference(parentNodeId);
  var rule = getNodeRule(parentRef.rule, node);

  while (!rule) {
    if (!parentRef.parentId) {
      throw new Error(`Node "${node.name}" (row: ${row}) did not have any matching rule`);
    }

    parentRef = getReference(parentRef.parentId);
    rule = getNodeRule(parentRef.rule, node);
  }

  return { rule, parent: parentRef.node };
}

function getNodeRule(rule, node) {
  const children = rule.children || [];
  return children.find((c) => c.name === node.name);
}
