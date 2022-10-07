import { getId, setReference } from "./globals";
import { NodeReference } from "./NodeReference";

export class Node {
  constructor(name) {
    this.id = getId();
    this.name = name;
    this.segments = [];
    this.children = [];
    this.friendlyName = null;
  }

  static createNode(name) {
    const node = new Node(name);
    setReference(node.id, new NodeReference(node));
    return node;
  }
}
