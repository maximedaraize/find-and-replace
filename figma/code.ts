/// <reference types="@figma/plugin-typings" />
import clone from './clone';
import figmaRGBToHex from './figmaRGBToHex';
import { toSolidPaint } from 'figx';
let totalColorChanges: Object[] = [];
figma.showUI(__html__);
figma.ui.resize(240, 180);
figma.ui.onmessage = prop => {
  if (prop.type === 'apply-colors') {
      function traverse(node: any) {
        if ("children" in node) {
          if (node.type != "INSTANCE") {
            for (let child of node.children) {
              traverse(child)
              console.log(child)
              if (child.fills && child.fills[0].type === 'SOLID' && child.fills.length > 0) {
                const nodeFillHex = figmaRGBToHex(child.fills[0].color).toUpperCase();
                if (nodeFillHex === prop.colorFind.toUpperCase()) {
                // clone the property (fills) of the child
                const fills = clone(child.fills);
                // Create an array that matches the fill structure (rgb represented as 0 to 1)
                const newColor = toSolidPaint(prop.colorReplace).color;
                // Only change the first fill
                fills[0].color = newColor;
                // Replace the fills on the node.
                child.fills = fills;
                // set the number of changes made
                totalColorChanges.push(child)
                }
              }
            }
          }
        }
      }
      traverse(figma.root) // start the traversal at the root
      figma.notify(totalColorChanges.length > 0 ? `${totalColorChanges.length} colors applied` : 'No changes applied');
  }

  figma.closePlugin();
};
