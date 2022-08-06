/// <reference types="@figma/plugin-typings" />
import clone from './clone';
import { toSolidPaint, toHex, toRgb, solidPaintToWebRgb } from 'figx';
let totalColorChanges: Object[] = [];
import { hexToFigmaRGB } from "@figma-plugin/helpers";


figma.showUI(__html__);
figma.ui.onmessage = prop => {
  if (prop.type === 'apply-colors') {
      function traverse(node: any) {
        if ("children" in node) {
          if (node.type != "INSTANCE") {
            for (let child of node.children) {
              traverse(child)
              if (child.fills && child.fills.length > 0) {
                console.log('child', JSON.stringify((Math.trunc(child.fills[0].color.r * 255))))
                console.log('child', JSON.stringify((Math.trunc(child.fills[0].color.g * 255))))
                console.log('child', JSON.stringify((Math.trunc(child.fills[0].color.b * 255))))
                console.log('find', JSON.stringify(toSolidPaint(prop.colorFind).color.r * 255))
                console.log('find', JSON.stringify(toSolidPaint(prop.colorFind).color.g * 255))
                console.log('find', JSON.stringify(toSolidPaint(prop.colorFind).color.b * 255))
                // console.log(child.fills[0].color)
                let childRgbArray: any[] = [];
                childRgbArray.push((Math.trunc(child.fills[0].color.r * 255)));
                childRgbArray.push((Math.trunc(child.fills[0].color.g * 255)));
                childRgbArray.push((Math.trunc(child.fills[0].color.b * 255)));
                let colorFindRgbArray: any[] = [];
                colorFindRgbArray.push(toSolidPaint(prop.colorFind).color.r * 255);
                colorFindRgbArray.push(toSolidPaint(prop.colorFind).color.g * 255);
                colorFindRgbArray.push(toSolidPaint(prop.colorFind).color.b * 255);

                console.log('childRgbArray', childRgbArray)
                console.log('colorFindRgbArray', colorFindRgbArray)
                
                console.log('⭐️',JSON.stringify(childRgbArray))
                console.log('⭐️',JSON.stringify(colorFindRgbArray))
                if (JSON.stringify(childRgbArray) === JSON.stringify(colorFindRgbArray)) {
                  console.log(JSON.stringify(childRgbArray) === JSON.stringify(colorFindRgbArray))
                // if (JSON.stringify((child.fills[0].color)) === JSON.stringify(toSolidPaint(prop.colorFind).color)) {
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
                  console.log('🔥🔥🔥🔥🔥🔥🔥🔥')
                  console.log('find', JSON.stringify(toHex(prop.colorFind)))
                  console.log('replace', JSON.stringify(toHex(prop.colorReplace)))
                  console.log('------------')
                  console.log('find', JSON.stringify(toSolidPaint(prop.colorFind).color))
                  console.log('replace', JSON.stringify(toSolidPaint(prop.colorReplace).color))
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
