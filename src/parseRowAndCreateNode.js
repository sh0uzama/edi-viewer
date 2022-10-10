import { separators } from "./globals";
import { Node } from "./Node";
import { Segment } from "./Segment";

// matches all "?" NOT followed by "?" (aka, escape)
const escapeRE = /\?(?!\?)/g;

// matches all "?" FOLLOWED by "?"
const questionMarkRE = /\?\?/g;

export function parseRowAndCreateNode(row) {

  // handle UNA header better, it is intended as syntax definition
  if (row.startsWith("UNA")) {
    const una = Node.createNode("UNA");
    una.segments.push(new Segment(row.replace("UNA", "")));
    return una;
  }

  const textSegments = row.split(separators.segment);
  const node = Node.createNode(unescape(textSegments[0]));

  for (let i = 1; i < textSegments.length; i++) {
    const textSegment = textSegments[i];
    const components = textSegment.split(separators.component);
    const segment = new Segment(unescape(components[0]));

    segment.components = components.slice(1).map(c => unescape(c));
    node.segments.push(segment);
  }

  return node;
}

function unescape(text) {
  return text.replaceAll(escapeRE, '').replaceAll(questionMarkRE, "?");
}