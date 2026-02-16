// import Link from "next/link";
// import {Pages, Item} from "../types/jsontypes";
// import trunk from "/images/trunk.png";

// export default function TreeGen({data} : {data: Pages}) {
//     const trunkImage = "images/trunk.png"
//     return (<div>
//       <h1>Blog</h1>
//         <div className="w-full h-screen flex items-center justify-center bg-gray-100">
//             <svg width="800" height="600" viewBox="0 0 800 600">
//             {Object.entries(data).map(([category, items]) => (
//                 <div key={category}>
//                 <h2>{category}</h2>
//                 <ul>
//                     {items.map((item) => (
//                     <li key={item.link}>
//                         {item.title ? (
//                         <>
//                             <Link href={`/projects/${item.link}`}>
//                             {item.title}
//                             </Link>
//                             {item.date && <p>{item.date}</p>}
//                         </>
//                         ) : (
//                         <a href={item.link} target="_blank" rel="noopener noreferrer">
//                             {item.link}
//                         </a>
//                         )}
//                     </li>
//                     ))}
//                 </ul>
//                 </div>
//                 ))}
//             </svg>
//         </div>
//     </div>);
// }

import Link from "next/link";
// import trunk from "/images/tree/trunk.png"
// import branch from "/images/tree/branch.png"
// import trunk from "../../public/images/tree/trunk.png"
// import branch from "../../public/images/tree/branch.png"

type Item = {
  link: string;
  title?: string;
  date?: string;
  content?: string;
};

type Pages = {
  [key: string]: Item[]
};

export default function TreeGen({ data, path }: { data: Pages, path: string }) {
  const trunk = "/images/tree/trunk.png";
  const branch = "/images/tree/branch.png";
  const top = "/images/tree/treetop.png"
  const roots = "/images/tree/roots.png"
  
  // Convert Pages object to array of categories
  const categories = Object.entries(data);
  const catLen = categories.length
  const trunkHeight = 100;
  const trunkWidth = 150;
  const branchHeight = 50
  const branchWidth = 100
  const rootHeight = 200
  const rootWidth = 1000
  const svgHeight = (1 + catLen) * trunkHeight + rootHeight
  const svgWidth = 1200;
  const trunkX = (svgWidth / 2) - (trunkWidth / 2);
  const rootX = (svgWidth / 2) - (rootWidth / 2);
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 p-8" style={{ display: "flex" , width: "100%", flexDirection: "column", alignItems: "center"}}>
      <h1 className="text-4xl font-bold mb-8">Projects Tree</h1>
      
      <svg width={"%100"} height={svgHeight} 
        viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
        className="border border-gray-300">
          <image
                href={top}
                x={trunkX}
                y={trunkHeight/2}
                width={trunkWidth}
                height={trunkHeight/2}
                preserveAspectRatio="none"
              />
        {categories.map(([category, items], layerIndex) => {
  
          const trunkY = trunkHeight * (layerIndex + 1);
          
          const leafs = items.filter(item => item.title);
          const side = layerIndex % 2 === 0 ? 1 : -1;
          const mirror = layerIndex % 2 === 0 ? 1 : -1;
          
          return (
            <g key={category}>
              <image
                href={trunk}
                x={trunkX}
                y={trunkY}
                width={trunkWidth}
                height={trunkHeight}
                preserveAspectRatio="none"
              />
              
            
              

              {leafs.map((item, leafIndex) => {
                // const totalLeafs = leafs.length;
                
                // const branchSpacing = 600 / (totalLeafs + 1);
                 // 1 for right, -1 for left
                // const branchOffset = Math.floor(leafIndex / 2) * 50; // Spacing between branches on same side
                
                // Attach branch to side of trunk
                const branchX = side === 1 
                  ? (leafIndex > 0 
                    ?trunkX + trunkWidth + (3*branchWidth/4) * (leafIndex)// - 1*branchWidth/4
                    :trunkX + trunkWidth + branchWidth * (leafIndex)
                  )
                  : (leafIndex > 0
                    ? trunkX - 20 - (3 * branchWidth/4) * (1 + leafIndex) //+ branchWidth/4
                    : trunkX - branchWidth * (1 + leafIndex)
                  ); 
                  
                const branchY = trunkY; // Start lower on trunk, space them out
                const textX = side ===1
                  ? branchX + branchWidth -20
                  : branchX + 20
                const textY = branchY - branchHeight/8
                
                return (
                  <g key={item.link}>
                    <image
                      href={branch}
                      x={branchX}
                      y={branchY}
                      width={branchWidth}
                      height={branchHeight}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      style={{
                        transform: mirror=== -1?"scaleX(1)": "scaleX(-1)",
                        transformOrigin: "center",
                        transformBox: "fill-box"
                      }}
                      // transform={`translate(${trunkWidth}, 0) scale(-1, 1)`}
                    />
                    <Link href={`${path}${item.link}`}>
                      <g className="cursor-pointer">
                       
                        <text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          fontSize="10"
                          fill="black"
                          fontWeight="bold"
                          className="pointer-events-none"
                        >
                          {item.link}
                        </text>
                        
                        
                      </g>
                    </Link>
                  </g>
                );
              })}
            </g>
          );
        })}
        <image
                href={roots}
                x={rootX}
                y={(catLen+1) * trunkHeight}
                width={rootWidth}
                height={rootHeight}
                preserveAspectRatio="none"
              />
      </svg>
    </div>
  );
}