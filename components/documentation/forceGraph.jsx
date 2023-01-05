import React from "react";
import { forceGraph2 } from "./forceGraph2";
import { runForceGraph } from "./ForceGraphGenerator";
//import styles from "./forceGraph.module.css";

export function ForceGraph({ linksData, nodesData, nodeHoverTooltip }) {
    let containerRef = React.useRef(null);

    React.useEffect(() => {
        let destroyFn;
        //containerRef.current.removeChild(containerRef.current.children[0]);
        if (containerRef.current) {
            //const { destroy } = runForceGraph(containerRef.current, linksData, nodesData, nodeHoverTooltip);
            const { destroy } = forceGraph2();
            destroyFn = destroy;
        }
        
        return destroyFn;
    }, []);

    return <div ref={containerRef} className={""} />; //styles.container
}