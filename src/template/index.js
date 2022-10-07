import root from "./root";
import tplNode from "./node";
import tplSegment from "./segment";
import tlpComponent from "./component";

Eta.templates.define("node", Eta.compile(tplNode));
Eta.templates.define("segment", Eta.compile(tplSegment));
Eta.templates.define("component", Eta.compile(tlpComponent));

export default root;